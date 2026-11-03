<?php
/**
 * Tells the Next.js frontend to refresh its cache whenever content changes.
 *
 * Configure in wp-config.php:
 *   define( 'ALMA_REVALIDATE_URL', 'https://www.almayachting.com/api/revalidate' );
 *   define( 'ALMA_REVALIDATE_SECRET', 'long-random-string' );   // same value as REVALIDATE_SECRET on Vercel
 *
 * Payload: { "type": "vessel|destination|service|team|page|settings|menu", "slug"?, "previousSlug"?, "key"? }
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

/**
 * Queues a webhook; all queued webhooks are sent once WordPress has finished
 * responding to the editor (see send_queued_notifications), so saving stays fast.
 */
function notify_frontend( array $payload ): void {
	static $hooked = false;

	if ( ! defined( 'ALMA_REVALIDATE_URL' ) || ! defined( 'ALMA_REVALIDATE_SECRET' ) ) {
		return;
	}
	$GLOBALS['alma_revalidate_queue'][ wp_json_encode( $payload ) ] = true;

	if ( ! $hooked ) {
		$hooked = true;
		add_action( 'shutdown', __NAMESPACE__ . '\send_queued_notifications' );
	}
}

/**
 * Sends queued webhooks as normal (blocking) requests. Non-blocking HTTPS requests are
 * often dropped by PHP before they leave the server, so the response to the browser is
 * flushed first where PHP-FPM allows it.
 */
function send_queued_notifications(): void {
	$queue = array_keys( $GLOBALS['alma_revalidate_queue'] ?? array() );
	if ( ! $queue ) {
		return;
	}
	if ( function_exists( 'fastcgi_finish_request' ) ) {
		fastcgi_finish_request();
	}
	foreach ( $queue as $body ) {
		$response = wp_remote_post(
			ALMA_REVALIDATE_URL,
			array(
				'timeout' => 10,
				'headers' => array(
					'Content-Type'  => 'application/json',
					'x-alma-secret' => ALMA_REVALIDATE_SECRET,
				),
				'body'    => $body,
			)
		);
		$code = is_wp_error( $response ) ? $response->get_error_message() : wp_remote_retrieve_response_code( $response );
		if ( 200 !== $code ) {
			error_log( 'ALMA Headless: revalidation webhook failed (' . $code . ') for ' . $body ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		}
	}
}

function revalidate_type( string $post_type ): ?string {
	$map = array(
		'alma_vessel'      => 'vessel',
		'alma_destination' => 'destination',
		'alma_service'     => 'service',
		'alma_team_member' => 'team',
		'page'             => 'page',
	);
	return $map[ $post_type ] ?? null;
}

// Fires after the post *and its meta* are saved (classic form, block editor and REST).
add_action(
	'wp_after_insert_post',
	function ( $post_id, $post, $update, $post_before ) {
		$type = revalidate_type( $post->post_type );
		if ( ! $type || wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}
		$was_published = $post_before && 'publish' === $post_before->post_status;
		if ( 'publish' !== $post->post_status && ! $was_published ) {
			return; // Drafts never reached the website.
		}
		notify_frontend(
			array(
				'type'         => $type,
				'slug'         => $post->post_name,
				'previousSlug' => $post_before ? $post_before->post_name : null,
			)
		);
	},
	10,
	4
);

add_action(
	'before_delete_post',
	function ( $post_id, $post ) {
		$type = revalidate_type( $post->post_type );
		if ( $type && 'publish' === $post->post_status ) {
			notify_frontend( array( 'type' => $type, 'slug' => $post->post_name ) );
		}
	},
	10,
	2
);

add_action(
	'updated_option',
	function ( $option ) {
		foreach ( array_keys( settings_pages() ) as $key ) {
			if ( settings_option_name( $key ) === $option ) {
				notify_frontend( array( 'type' => 'settings', 'key' => $key ) );
			}
		}
	}
);

add_action(
	'added_option',
	function ( $option ) {
		foreach ( array_keys( settings_pages() ) as $key ) {
			if ( settings_option_name( $key ) === $option ) {
				notify_frontend( array( 'type' => 'settings', 'key' => $key ) );
			}
		}
	}
);

add_action(
	'wp_update_nav_menu',
	function () {
		notify_frontend( array( 'type' => 'menu' ) );
	}
);

// Alt text / file changes on media used anywhere: refresh everything.
add_action(
	'edit_attachment',
	function () {
		notify_frontend( array( 'type' => 'all' ) );
	}
);
