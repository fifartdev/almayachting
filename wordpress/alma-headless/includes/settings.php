<?php
/**
 * "ALMA Site" admin screens for singleton content (site settings + one screen per
 * built-in page). Each screen is stored as one option `alma_{key}`.
 *
 * Saved through admin-post.php rather than options.php so Editors (not only
 * Administrators) can update page content.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

function settings_option_name( string $key ): string {
	return 'alma_' . str_replace( '-', '_', $key );
}

function get_settings_values( string $key ): array {
	$value = get_option( settings_option_name( $key ) );
	return is_array( $value ) ? $value : array();
}

function save_settings_values( string $key, $raw ): array {
	$clean = sanitize_fields( settings_pages()[ $key ]['fields'], $raw );
	update_option( settings_option_name( $key ), $clean, false );
	return $clean;
}

function settings_to_rest( string $key ): array {
	return fields_to_rest( settings_pages()[ $key ]['fields'], get_settings_values( $key ) );
}

add_action(
	'admin_menu',
	function () {
		$pages = settings_pages();
		$first = 'alma-' . array_key_first( $pages );

		add_menu_page( 'ALMA Site', 'ALMA Site', ALMA_HEADLESS_CAP, $first, __NAMESPACE__ . '\render_settings_page', 'dashicons-admin-site-alt3', 3 );
		foreach ( $pages as $key => $page ) {
			add_submenu_page( $first, $page['title'], $page['title'], ALMA_HEADLESS_CAP, 'alma-' . $key, __NAMESPACE__ . '\render_settings_page' );
		}
	}
);

function current_settings_key(): ?string {
	$page = isset( $_GET['page'] ) ? sanitize_key( $_GET['page'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$key  = preg_replace( '/^alma-/', '', $page );
	return isset( settings_pages()[ $key ] ) ? $key : null;
}

function render_settings_page(): void {
	$key = current_settings_key();
	if ( ! $key || ! current_user_can( ALMA_HEADLESS_CAP ) ) {
		return;
	}
	$page   = settings_pages()[ $key ];
	$values = get_settings_values( $key );

	echo '<div class="wrap alma-settings">';
	echo '<h1>' . esc_html( $page['title'] ) . '</h1>';

	if ( isset( $_GET['updated'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		echo '<div class="notice notice-success is-dismissible"><p>Saved. The website updates within a few seconds.</p></div>';
	}
	if ( 'homepage' === $key && 'video' === ( $values['hero']['mode'] ?? '' ) && empty( $values['hero']['video'] ) ) {
		echo '<div class="notice notice-warning"><p>The hero is set to video but no video is chosen, so the website shows its default image.</p></div>';
	}

	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	echo '<input type="hidden" name="action" value="alma_save_settings">';
	echo '<input type="hidden" name="alma_key" value="' . esc_attr( $key ) . '">';
	wp_nonce_field( 'alma_settings_' . $key );
	render_fields( $page['fields'], 'alma', $values );
	submit_button( 'Save changes' );
	echo '</form></div>';
}

add_action(
	'admin_post_alma_save_settings',
	function () {
		$key = isset( $_POST['alma_key'] ) ? sanitize_key( $_POST['alma_key'] ) : '';
		if ( ! isset( settings_pages()[ $key ] ) || ! current_user_can( ALMA_HEADLESS_CAP ) ) {
			wp_die( 'You are not allowed to edit these settings.', 403 );
		}
		check_admin_referer( 'alma_settings_' . $key );

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized per field.
		save_settings_values( $key, isset( $_POST['alma'] ) ? wp_unslash( $_POST['alma'] ) : array() );

		wp_safe_redirect(
			add_query_arg(
				array(
					'page'    => 'alma-' . $key,
					'updated' => 1,
				),
				admin_url( 'admin.php' )
			)
		);
		exit;
	}
);
