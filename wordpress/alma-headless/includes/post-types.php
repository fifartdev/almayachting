<?php
/**
 * Custom post types, their meta boxes and the `fields` / `featuredImage` REST fields.
 *
 * Each top-level field is stored as its own post meta key `_alma_{name}`
 * (underscore-prefixed so it stays out of the generic Custom Fields box).
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

add_action( 'init', __NAMESPACE__ . '\register_post_types' );

function register_post_types(): void {
	foreach ( post_types() as $post_type => $config ) {
		$singular = $config['singular'];
		$plural   = $config['plural'];

		register_post_type(
			$post_type,
			array(
				'labels'       => array(
					'name'                  => $plural,
					'singular_name'         => $singular,
					'add_new_item'          => "Add new {$singular}",
					'edit_item'             => "Edit {$singular}",
					'new_item'              => "New {$singular}",
					'view_item'             => "View {$singular}",
					'search_items'          => "Search {$plural}",
					'not_found'             => 'Nothing found',
					'all_items'             => "All {$plural}",
					'featured_image'        => $config['image'],
					'set_featured_image'    => 'Set ' . strtolower( $config['image'] ),
					'remove_featured_image' => 'Remove ' . strtolower( $config['image'] ),
				),
				'public'       => true,
				'has_archive'  => false,
				'show_in_rest' => true,
				'rest_base'    => $config['rest_base'],
				'menu_icon'    => $config['icon'],
				'menu_position' => 20,
				'supports'     => $config['supports'],
				'rewrite'      => array(
					'slug'       => $config['rewrite'],
					'with_front' => false,
				),
			)
		);
	}
}

/** Custom post types use the classic editor so the description and fields share one form. */
add_filter(
	'use_block_editor_for_post_type',
	function ( $use, $post_type ) {
		return isset( post_types()[ $post_type ] ) ? false : $use;
	},
	10,
	2
);

/** All fields stored for a post type, including SEO. */
function all_post_fields( string $post_type ): array {
	$types = content_types();
	return isset( $types[ $post_type ] ) ? array_merge( $types[ $post_type ], array( seo_group() ) ) : array();
}

function load_post_values( int $post_id, array $fields ): array {
	$values = array();
	foreach ( $fields as $field ) {
		$key = '_alma_' . $field['name'];
		if ( metadata_exists( 'post', $post_id, $key ) ) {
			$values[ $field['name'] ] = get_post_meta( $post_id, $key, true );
		}
	}
	return $values;
}

function save_post_values( int $post_id, array $values ): void {
	foreach ( $values as $name => $value ) {
		update_post_meta( $post_id, '_alma_' . $name, $value );
	}
}

/* -------------------------------------------------------------------------
 * Meta boxes
 * ---------------------------------------------------------------------- */

add_action(
	'add_meta_boxes',
	function ( $post_type ) {
		$types = content_types();
		if ( ! isset( $types[ $post_type ] ) ) {
			return;
		}
		$title = 'page' === $post_type ? 'Page template options' : post_types()[ $post_type ]['singular'] . ' details';
		add_meta_box( 'alma_fields', $title, __NAMESPACE__ . '\render_fields_meta_box', $post_type, 'normal', 'high' );
		if ( false !== seo_scope( $post_type ) ) {
			add_meta_box( 'alma_seo', 'SEO & GEO', __NAMESPACE__ . '\render_seo_meta_box', $post_type, 'normal', 'low' );
		}
	}
);

function render_fields_meta_box( \WP_Post $post ): void {
	wp_nonce_field( 'alma_save_post', 'alma_post_nonce' );
	$fields = content_types()[ $post->post_type ];
	render_fields( $fields, 'alma', load_post_values( $post->ID, $fields ) );
}

/**
 * Which parts of the SEO & GEO panel apply: 'full' for anything with its own page, a list of
 * sub-groups for content shown inside another page, false for content that is never public.
 */
function seo_scope( string $post_type ) {
	return 'page' === $post_type ? 'full' : ( post_types()[ $post_type ]['seo'] ?? 'full' );
}

function render_seo_meta_box( \WP_Post $post ): void {
	$seo    = seo_group();
	$scope  = seo_scope( $post->post_type );
	$fields = 'full' === $scope
		? $seo['fields']
		: array_values(
			array_filter(
				$seo['fields'],
				function ( $field ) use ( $scope ) {
					return in_array( $field['name'], (array) $scope, true );
				}
			)
		);
	if ( 'full' !== $scope ) {
		echo '<p class="description">This entry appears inside another page, so only these settings apply to it.</p>';
	}
	$values = load_post_values( $post->ID, array( $seo ) );
	render_fields( $fields, 'alma[seo]', is_array( $values['seo'] ?? null ) ? $values['seo'] : array() );
}

add_action(
	'save_post',
	function ( $post_id, $post ) {
		if ( ! isset( content_types()[ $post->post_type ] ) || wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}
		if ( ! isset( $_POST['alma_post_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['alma_post_nonce'] ), 'alma_save_post' ) ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized per field below.
		$raw = isset( $_POST['alma'] ) ? wp_unslash( $_POST['alma'] ) : array();
		save_post_values( $post_id, sanitize_fields( all_post_fields( $post->post_type ), $raw ) );
	},
	10,
	2
);

/* -------------------------------------------------------------------------
 * REST
 * ---------------------------------------------------------------------- */

add_action(
	'rest_api_init',
	function () {
		foreach ( array_keys( content_types() ) as $post_type ) {
			register_rest_field(
				$post_type,
				'fields',
				array(
					'get_callback'    => function ( $post ) use ( $post_type ) {
						$fields = all_post_fields( $post_type );
						return fields_to_rest( $fields, load_post_values( (int) $post['id'], $fields ) );
					},
					// Partial updates: only the keys sent are changed (used by the migration script).
					'update_callback' => function ( $value, $post ) use ( $post_type ) {
						$fields  = all_post_fields( $post_type );
						$current = load_post_values( $post->ID, $fields );
						$merged  = array_merge( $current, is_array( $value ) ? $value : array() );
						save_post_values( $post->ID, sanitize_fields( $fields, $merged ) );
						return true;
					},
					'schema'          => array(
						'description' => 'ALMA custom fields.',
						'type'        => 'object',
						'context'     => array( 'view', 'edit' ),
					),
				)
			);

			register_rest_field(
				$post_type,
				'featuredImage',
				array(
					'get_callback' => function ( $post ) {
						return image_data( (int) get_post_thumbnail_id( (int) $post['id'] ) );
					},
					'schema'       => array(
						'type'     => array( 'object', 'null' ),
						'context'  => array( 'view', 'edit' ),
						'readonly' => true,
					),
				)
			);
		}
	}
);
