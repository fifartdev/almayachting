<?php
/**
 * Enquiries from the website's forms (Contact page and vessel pages), recorded before the
 * notification email is sent so none are ever lost.
 *
 * The frontend posts to /alma/v1/enquiries with header `x-alma-secret` (ALMA_REVALIDATE_SECRET).
 * Enquiries are private: never exposed through the public REST API or the website.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

const ENQUIRY_STATUSES = array(
	'new'       => 'New',
	'contacted' => 'Contacted',
	'booked'    => 'Booked',
	'closed'    => 'Closed',
);

const ENQUIRY_FIELDS = array(
	'name'     => 'Name',
	'email'    => 'Email',
	'phone'    => 'Phone',
	'yacht'    => 'Vessel',
	'checkIn'  => 'Check-in',
	'checkOut' => 'Check-out',
	'guests'   => 'Guests',
	'message'  => 'Message',
	'source'   => 'Sent from',
);

add_action(
	'init',
	function () {
		register_post_type(
			'alma_enquiry',
			array(
				'labels'          => array(
					'name'          => 'Enquiries',
					'singular_name' => 'Enquiry',
					'edit_item'     => 'Enquiry',
					'all_items'     => 'All enquiries',
					'search_items'  => 'Search enquiries',
					'not_found'     => 'No enquiries yet',
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_rest'    => false,
				'menu_icon'       => 'dashicons-email-alt',
				'menu_position'   => 4,
				'supports'        => array( 'title' ),
				'capability_type' => 'post',
				'map_meta_cap'    => true,
				'capabilities'    => array( 'create_posts' => 'do_not_allow' ), // Only the website creates them.
			)
		);
	}
);

function enquiry_data( int $post_id ): array {
	$data = get_post_meta( $post_id, '_alma_enquiry', true );
	return is_array( $data ) ? $data : array();
}

function enquiry_status( int $post_id ): string {
	$status = get_post_meta( $post_id, '_alma_enquiry_status', true );
	return isset( ENQUIRY_STATUSES[ $status ] ) ? $status : 'new';
}

/* -------------------------------------------------------------------------
 * REST (website → WordPress)
 * ---------------------------------------------------------------------- */

function enquiry_request_authorized( \WP_REST_Request $request ): bool {
	$given = (string) $request->get_header( 'x-alma-secret' );
	return defined( 'ALMA_REVALIDATE_SECRET' ) && '' !== $given && hash_equals( ALMA_REVALIDATE_SECRET, $given );
}

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'alma/v1',
			'/enquiries',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => __NAMESPACE__ . '\enquiry_request_authorized',
				'callback'            => function ( \WP_REST_Request $request ) {
					$body = (array) $request->get_json_params();
					$data = array();
					foreach ( array_keys( ENQUIRY_FIELDS ) as $key ) {
						$value        = isset( $body[ $key ] ) && is_scalar( $body[ $key ] ) ? (string) $body[ $key ] : '';
						$data[ $key ] = 'message' === $key ? sanitize_textarea_field( $value ) : sanitize_text_field( $value );
					}
					$data['email'] = sanitize_email( $data['email'] );
					if ( '' === $data['name'] || ! is_email( $data['email'] ) ) {
						return new \WP_Error( 'alma_invalid', 'Name and a valid email are required.', array( 'status' => 400 ) );
					}

					$post_id = wp_insert_post(
						array(
							'post_type'   => 'alma_enquiry',
							'post_status' => 'private',
							'post_title'  => $data['name'] . ( $data['yacht'] ? ' — ' . $data['yacht'] : '' ),
						),
						true
					);
					if ( is_wp_error( $post_id ) ) {
						return $post_id;
					}
					update_post_meta( $post_id, '_alma_enquiry', $data );
					update_post_meta( $post_id, '_alma_enquiry_status', 'new' );
					update_post_meta( $post_id, '_alma_enquiry_email', 'pending' );

					return array( 'id' => $post_id );
				},
			)
		);

		register_rest_route(
			'alma/v1',
			'/enquiries/(?P<id>\d+)/delivery',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => __NAMESPACE__ . '\enquiry_request_authorized',
				'callback'            => function ( \WP_REST_Request $request ) {
					$post_id = (int) $request['id'];
					$status  = $request->get_param( 'emailStatus' );
					if ( 'alma_enquiry' !== get_post_type( $post_id ) || ! in_array( $status, array( 'sent', 'failed' ), true ) ) {
						return new \WP_Error( 'alma_invalid', 'Unknown enquiry or status.', array( 'status' => 400 ) );
					}
					update_post_meta( $post_id, '_alma_enquiry_email', $status );
					return array( 'ok' => true );
				},
			)
		);
	}
);

/* -------------------------------------------------------------------------
 * Admin: list
 * ---------------------------------------------------------------------- */

add_filter(
	'manage_alma_enquiry_posts_columns',
	function () {
		return array(
			'cb'       => '<input type="checkbox">',
			'title'    => 'Name',
			'email'    => 'Email',
			'yacht'    => 'Vessel',
			'dates'    => 'Dates',
			'guests'   => 'Guests',
			'status'   => 'Status',
			'delivery' => 'Email',
			'received' => 'Received',
		);
	}
);

add_action(
	'manage_alma_enquiry_posts_custom_column',
	function ( $column, $post_id ) {
		$data = enquiry_data( (int) $post_id );
		switch ( $column ) {
			case 'email':
				echo '<a href="mailto:' . esc_attr( $data['email'] ?? '' ) . '">' . esc_html( $data['email'] ?? '' ) . '</a>';
				break;
			case 'yacht':
				echo esc_html( ( $data['yacht'] ?? '' ) ?: '—' );
				break;
			case 'dates':
				echo esc_html( trim( ( $data['checkIn'] ?? '' ) . ' → ' . ( $data['checkOut'] ?? '' ), ' →' ) ?: '—' );
				break;
			case 'guests':
				echo esc_html( ( $data['guests'] ?? '' ) ?: '—' );
				break;
			case 'status':
				$status = enquiry_status( (int) $post_id );
				echo '<span class="alma-enquiry-status alma-enquiry-status--' . esc_attr( $status ) . '">' . esc_html( ENQUIRY_STATUSES[ $status ] ) . '</span>';
				break;
			case 'delivery':
				$delivery = get_post_meta( $post_id, '_alma_enquiry_email', true );
				echo 'failed' === $delivery ? '<span style="color:#b32d2e">Not sent</span>' : ( 'sent' === $delivery ? 'Sent' : '—' );
				break;
			case 'received':
				echo esc_html( get_the_date( 'j M Y, H:i', $post_id ) );
				break;
		}
	},
	10,
	2
);

// Filter the list by status.
add_action(
	'restrict_manage_posts',
	function ( $post_type ) {
		if ( 'alma_enquiry' !== $post_type ) {
			return;
		}
		$current = isset( $_GET['alma_status'] ) ? sanitize_key( $_GET['alma_status'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		echo '<select name="alma_status"><option value="">All statuses</option>';
		foreach ( ENQUIRY_STATUSES as $value => $label ) {
			printf( '<option value="%s"%s>%s</option>', esc_attr( $value ), selected( $current, $value, false ), esc_html( $label ) );
		}
		echo '</select>';
	}
);

add_action(
	'pre_get_posts',
	function ( \WP_Query $query ) {
		if ( ! is_admin() || ! $query->is_main_query() || 'alma_enquiry' !== $query->get( 'post_type' ) ) {
			return;
		}
		$status = isset( $_GET['alma_status'] ) ? sanitize_key( $_GET['alma_status'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( isset( ENQUIRY_STATUSES[ $status ] ) ) {
			$query->set(
				'meta_query',
				array(
					array(
						'key'   => '_alma_enquiry_status',
						'value' => $status,
					),
				)
			);
		}
	}
);

// Count of new enquiries next to the menu item.
add_action(
	'admin_menu',
	function () {
		global $menu;
		$new = new \WP_Query(
			array(
				'post_type'      => 'alma_enquiry',
				'post_status'    => 'private',
				'meta_key'       => '_alma_enquiry_status', // phpcs:ignore WordPress.DB.SlowDBQuery
				'meta_value'     => 'new', // phpcs:ignore WordPress.DB.SlowDBQuery
				'fields'         => 'ids',
				'posts_per_page' => 1,
				'no_found_rows'  => false,
			)
		);
		if ( ! $new->found_posts ) {
			return;
		}
		foreach ( $menu as $i => $item ) {
			if ( 'edit.php?post_type=alma_enquiry' === $item[2] ) {
				$menu[ $i ][0] .= ' <span class="awaiting-mod">' . (int) $new->found_posts . '</span>'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
			}
		}
	},
	99
);

/* -------------------------------------------------------------------------
 * Admin: single enquiry
 * ---------------------------------------------------------------------- */

add_action(
	'add_meta_boxes_alma_enquiry',
	function () {
		remove_meta_box( 'submitdiv', 'alma_enquiry', 'side' );
		add_meta_box( 'alma_enquiry_details', 'Enquiry', __NAMESPACE__ . '\render_enquiry_details', 'alma_enquiry', 'normal', 'high' );
		add_meta_box( 'alma_enquiry_status', 'Follow-up', __NAMESPACE__ . '\render_enquiry_status', 'alma_enquiry', 'side', 'high' );
	}
);

function render_enquiry_details( \WP_Post $post ): void {
	$data = enquiry_data( $post->ID );
	echo '<table class="form-table" role="presentation"><tbody>';
	foreach ( ENQUIRY_FIELDS as $key => $label ) {
		$value = (string) ( $data[ $key ] ?? '' );
		if ( '' === $value ) {
			continue;
		}
		if ( 'email' === $key ) {
			$value = '<a href="mailto:' . esc_attr( $value ) . '">' . esc_html( $value ) . '</a>';
		} elseif ( 'phone' === $key ) {
			$value = '<a href="tel:' . esc_attr( preg_replace( '/\s+/', '', $value ) ) . '">' . esc_html( $value ) . '</a>';
		} else {
			$value = nl2br( esc_html( $value ) );
		}
		echo '<tr><th scope="row">' . esc_html( $label ) . '</th><td>' . $value . '</td></tr>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
	}
	echo '<tr><th scope="row">Received</th><td>' . esc_html( get_the_date( 'j F Y, H:i', $post ) ) . '</td></tr>';
	$delivery = get_post_meta( $post->ID, '_alma_enquiry_email', true );
	echo '<tr><th scope="row">Notification email</th><td>' . esc_html( 'failed' === $delivery ? 'Not sent — this enquiry is only here.' : ( 'sent' === $delivery ? 'Sent to the office inbox' : 'Unknown' ) ) . '</td></tr>';
	echo '</tbody></table>';

	if ( ! empty( $data['email'] ) ) {
		$subject = rawurlencode( 'Your charter enquiry' . ( ! empty( $data['yacht'] ) ? ' — ' . $data['yacht'] : '' ) );
		echo '<p><a class="button button-primary" href="mailto:' . esc_attr( $data['email'] ) . '?subject=' . esc_attr( $subject ) . '">Reply by email</a></p>';
	}
}

function render_enquiry_status( \WP_Post $post ): void {
	wp_nonce_field( 'alma_enquiry_status', 'alma_enquiry_nonce' );
	$current = enquiry_status( $post->ID );
	echo '<p><label for="alma_enquiry_status_field"><strong>Status</strong></label><br><select id="alma_enquiry_status_field" name="alma_enquiry_status" style="width:100%">';
	foreach ( ENQUIRY_STATUSES as $value => $label ) {
		printf( '<option value="%s"%s>%s</option>', esc_attr( $value ), selected( $current, $value, false ), esc_html( $label ) );
	}
	echo '</select></p>';
	echo '<p><label for="alma_enquiry_notes"><strong>Internal notes</strong></label><textarea id="alma_enquiry_notes" name="alma_enquiry_notes" rows="6" style="width:100%">' . esc_textarea( (string) get_post_meta( $post->ID, '_alma_enquiry_notes', true ) ) . '</textarea></p>';
	submit_button( 'Save', 'primary', 'save', false );
	echo ' <a class="submitdelete" style="margin-left:8px" href="' . esc_url( get_delete_post_link( $post->ID ) ) . '">Move to trash</a>';
}

add_action(
	'save_post_alma_enquiry',
	function ( $post_id ) {
		if ( ! isset( $_POST['alma_enquiry_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['alma_enquiry_nonce'] ), 'alma_enquiry_status' ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		$status = isset( $_POST['alma_enquiry_status'] ) ? sanitize_key( $_POST['alma_enquiry_status'] ) : 'new';
		update_post_meta( $post_id, '_alma_enquiry_status', isset( ENQUIRY_STATUSES[ $status ] ) ? $status : 'new' );
		update_post_meta( $post_id, '_alma_enquiry_notes', isset( $_POST['alma_enquiry_notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['alma_enquiry_notes'] ) ) : '' );
	}
);

// Saving the follow-up form must keep the enquiry private (the publish box is removed).
add_filter(
	'wp_insert_post_data',
	function ( $data ) {
		if ( 'alma_enquiry' === $data['post_type'] && ! in_array( $data['post_status'], array( 'trash', 'auto-draft' ), true ) ) {
			$data['post_status'] = 'private';
		}
		return $data;
	}
);

add_action(
	'admin_head',
	function () {
		$screen = get_current_screen();
		if ( ! $screen || 'alma_enquiry' !== $screen->post_type ) {
			return;
		}
		echo '<style>
			.post-type-alma_enquiry #titlediv #title { pointer-events: none; background: #f6f7f7; }
			.post-type-alma_enquiry .page-title-action { display: none; }
			.alma-enquiry-status { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 12px; background: #f0f0f1; }
			.alma-enquiry-status--new { background: #fcf0e3; color: #8a4b00; font-weight: 600; }
			.alma-enquiry-status--contacted { background: #e5f1fa; color: #0a4b78; }
			.alma-enquiry-status--booked { background: #e6f4ea; color: #1e6b34; }
		</style>';
	}
);

/* -------------------------------------------------------------------------
 * Privacy (GDPR): Tools → Export / Erase Personal Data
 * ---------------------------------------------------------------------- */

function enquiries_for_email( string $email ): array {
	$query = new \WP_Query(
		array(
			'post_type'      => 'alma_enquiry',
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'fields'         => 'ids',
		)
	);
	return array_values(
		array_filter(
			$query->posts,
			function ( $id ) use ( $email ) {
				return strtolower( enquiry_data( (int) $id )['email'] ?? '' ) === strtolower( $email );
			}
		)
	);
}

add_filter(
	'wp_privacy_personal_data_exporters',
	function ( $exporters ) {
		$exporters['alma-enquiries'] = array(
			'exporter_friendly_name' => 'Website enquiries',
			'callback'               => function ( $email ) {
				$items = array();
				foreach ( enquiries_for_email( $email ) as $id ) {
					$data = array();
					foreach ( ENQUIRY_FIELDS as $key => $label ) {
						$data[] = array(
							'name'  => $label,
							'value' => (string) ( enquiry_data( $id )[ $key ] ?? '' ),
						);
					}
					$items[] = array(
						'group_id'    => 'alma-enquiries',
						'group_label' => 'Website enquiries',
						'item_id'     => 'enquiry-' . $id,
						'data'        => $data,
					);
				}
				return array(
					'data' => $items,
					'done' => true,
				);
			},
		);
		return $exporters;
	}
);

add_filter(
	'wp_privacy_personal_data_erasers',
	function ( $erasers ) {
		$erasers['alma-enquiries'] = array(
			'eraser_friendly_name' => 'Website enquiries',
			'callback'             => function ( $email ) {
				$ids = enquiries_for_email( $email );
				foreach ( $ids as $id ) {
					wp_delete_post( $id, true );
				}
				return array(
					'items_removed'  => count( $ids ) > 0,
					'items_retained' => false,
					'messages'       => array(),
					'done'           => true,
				);
			},
		);
		return $erasers;
	}
);
