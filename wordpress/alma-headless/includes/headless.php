<?php
/**
 * Headless behaviour: send public visitors to the Next.js site, keep page slugs
 * clear of built-in routes, limit page blocks to ones the template styles, and
 * load the admin assets.
 *
 * Optional in wp-config.php:
 *   define( 'ALMA_FRONTEND_URL', 'https://www.almayachting.com' );
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

add_action(
	'template_redirect',
	function () {
		if ( ! defined( 'ALMA_FRONTEND_URL' ) || is_preview() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return;
		}
		$path = isset( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '/';
		wp_redirect( untrailingslashit( ALMA_FRONTEND_URL ) . '/' . ltrim( $path, '/' ), 301 ); // phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect -- external frontend.
		exit;
	}
);

/** Pages may not take a slug that a built-in frontend route already uses. */
add_filter(
	'wp_unique_post_slug',
	function ( $slug, $post_id, $post_status, $post_type, $post_parent ) {
		if ( 'page' === $post_type && ! $post_parent && in_array( $slug, RESERVED_PAGE_SLUGS, true ) ) {
			return $slug . '-page';
		}
		return $slug;
	},
	10,
	5
);

/** Blocks the frontend's standard page template is styled for. */
add_filter(
	'allowed_block_types_all',
	function ( $allowed, $context ) {
		if ( empty( $context->post ) || 'page' !== $context->post->post_type ) {
			return $allowed;
		}
		return array(
			'core/paragraph',
			'core/heading',
			'core/list',
			'core/list-item',
			'core/quote',
			'core/image',
			'core/gallery',
			'core/media-text',
			'core/columns',
			'core/column',
			'core/group',
			'core/buttons',
			'core/button',
			'core/separator',
			'core/table',
			'core/embed',
		);
	},
	10,
	2
);

add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		$screen      = get_current_screen();
		$is_settings = (bool) current_settings_key();
		$is_editor   = $screen && 'post' === $screen->base && isset( content_types()[ $screen->post_type ] );
		if ( ! $is_settings && ! $is_editor ) {
			return;
		}
		wp_enqueue_media();
		wp_enqueue_style( 'alma-admin', ALMA_HEADLESS_URL . 'assets/admin.css', array(), ALMA_HEADLESS_VERSION );
		wp_enqueue_script( 'alma-admin', ALMA_HEADLESS_URL . 'assets/admin.js', array( 'jquery', 'jquery-ui-sortable' ), ALMA_HEADLESS_VERSION, true );
	}
);
