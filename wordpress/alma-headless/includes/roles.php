<?php
/**
 * "Site Manager" role for the client: edits everything the website shows (fleet,
 * destinations, services, team, pages, media, menus, ALMA Site settings, enquiries)
 * and nothing else (no plugins, themes, settings, users, blog posts or comments).
 *
 * Media and the custom post types use WordPress's standard "post" capabilities, so
 * the role has them; the blog Posts / Comments screens are hidden and blocked instead.
 * Menus need `edit_theme_options`; every other Appearance screen is blocked.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

const SITE_MANAGER_ROLE = 'alma_site_manager';

function site_manager_caps(): array {
	$caps = array(
		'read',
		'upload_files',
		'edit_theme_options',             // Appearance → Menus only (see block list below).
		ALMA_HEADLESS_CAP,                // ALMA Site screens.
		'export_others_personal_requests', // GDPR export/erase of enquiries.
		'erase_others_personal_data',
	);
	foreach ( array( 'posts', 'pages' ) as $type ) {
		foreach ( array( 'edit', 'edit_others', 'edit_published', 'edit_private', 'publish', 'read_private', 'delete', 'delete_others', 'delete_published', 'delete_private' ) as $action ) {
			$caps[] = "{$action}_{$type}";
		}
	}
	return array_fill_keys( $caps, true );
}

/** Creates/updates the role. Runs on activation and whenever the plugin version changes. */
function sync_roles(): void {
	remove_role( SITE_MANAGER_ROLE );
	add_role( SITE_MANAGER_ROLE, 'Site Manager', site_manager_caps() );
	update_option( 'alma_headless_roles_version', ALMA_HEADLESS_VERSION );
}

// Replacing the plugin by upload does not re-run activation, so also sync on version change.
add_action(
	'init',
	function () {
		if ( get_option( 'alma_headless_roles_version' ) !== ALMA_HEADLESS_VERSION ) {
			sync_roles();
		}
	},
	1
);

// Administrators and Editors get the ALMA Site screens without storing anything on their roles.
add_filter(
	'user_has_cap',
	function ( $allcaps ) {
		if ( ! empty( $allcaps['manage_options'] ) || ! empty( $allcaps['edit_others_pages'] ) ) {
			$allcaps[ ALMA_HEADLESS_CAP ] = true;
		}
		return $allcaps;
	}
);

function is_site_manager(): bool {
	$user = wp_get_current_user();
	return in_array( SITE_MANAGER_ROLE, (array) $user->roles, true ) && ! in_array( 'administrator', (array) $user->roles, true );
}

/** Admin screens a Site Manager may not open, even though a capability would allow it. */
function site_manager_blocked_screen(): bool {
	global $pagenow;

	// phpcs:disable WordPress.Security.NonceVerification.Recommended
	$post_type = isset( $_GET['post_type'] ) ? sanitize_key( $_GET['post_type'] ) : '';
	$taxonomy  = isset( $_GET['taxonomy'] ) ? sanitize_key( $_GET['taxonomy'] ) : '';
	$post_id   = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;
	// phpcs:enable

	$always = array( 'themes.php', 'theme-install.php', 'theme-editor.php', 'customize.php', 'widgets.php', 'site-editor.php', 'edit-comments.php', 'comment.php', 'tools.php', 'import.php', 'export.php' );
	if ( in_array( $pagenow, $always, true ) ) {
		return true;
	}
	if ( in_array( $pagenow, array( 'edit.php', 'post-new.php' ), true ) && in_array( $post_type, array( '', 'post' ), true ) ) {
		return true; // Blog posts.
	}
	if ( 'post.php' === $pagenow && $post_id && 'post' === get_post_type( $post_id ) ) {
		return true;
	}
	if ( in_array( $pagenow, array( 'edit-tags.php', 'term.php' ), true ) && in_array( $taxonomy, array( 'category', 'post_tag', '' ), true ) ) {
		return true;
	}
	return false;
}

add_action(
	'admin_init',
	function () {
		if ( is_site_manager() && ! wp_doing_ajax() && site_manager_blocked_screen() ) {
			wp_safe_redirect( admin_url() );
			exit;
		}
	}
);

add_action(
	'admin_menu',
	function () {
		if ( ! is_site_manager() ) {
			return;
		}
		remove_menu_page( 'edit.php' );          // Posts.
		remove_menu_page( 'edit-comments.php' ); // Comments.
		remove_menu_page( 'tools.php' );
		remove_submenu_page( 'themes.php', 'themes.php' );
		remove_submenu_page( 'themes.php', 'widgets.php' );
		remove_submenu_page( 'themes.php', 'site-editor.php' );
		global $submenu;
		foreach ( $submenu['themes.php'] ?? array() as $item ) {
			if ( isset( $item[2] ) && false !== strpos( $item[2], 'customize.php' ) ) {
				remove_submenu_page( 'themes.php', $item[2] );
			}
		}
		// GDPR tools for enquiries, without the rest of Tools.
		add_submenu_page( 'edit.php?post_type=alma_enquiry', 'Export personal data', 'Export personal data', 'export_others_personal_requests', 'export-personal-data.php' );
		add_submenu_page( 'edit.php?post_type=alma_enquiry', 'Erase personal data', 'Erase personal data', 'erase_others_personal_data', 'erase-personal-data.php' );
	},
	999
);

add_action(
	'admin_bar_menu',
	function ( \WP_Admin_Bar $bar ) {
		if ( ! is_site_manager() ) {
			return;
		}
		foreach ( array( 'new-post', 'comments', 'customize', 'themes', 'widgets', 'site-editor', 'new-alma_enquiry' ) as $node ) {
			$bar->remove_node( $node );
		}
	},
	999
);

add_action(
	'wp_dashboard_setup',
	function () {
		if ( ! is_site_manager() ) {
			return;
		}
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );

		wp_add_dashboard_widget(
			'alma_shortcuts',
			'ALMA Yachting website',
			function () {
				$links = array(
					'edit.php?post_type=alma_enquiry'  => 'Enquiries',
					'edit.php?post_type=alma_vessel'   => 'Fleet',
					'edit.php?post_type=page'          => 'Pages',
					'admin.php?page=alma-homepage'     => 'Homepage',
					'admin.php?page=alma-site-settings' => 'Site Settings & built-in pages',
					'admin.php?page=alma-seo'          => 'SEO & GEO',
					'nav-menus.php'                    => 'Menus',
					'upload.php'                       => 'Media',
				);
				echo '<ul>';
				foreach ( $links as $path => $label ) {
					echo '<li><a href="' . esc_url( admin_url( $path ) ) . '">' . esc_html( $label ) . '</a></li>';
				}
				echo '</ul>';
				if ( defined( 'ALMA_FRONTEND_URL' ) ) {
					echo '<p><a class="button" href="' . esc_url( ALMA_FRONTEND_URL ) . '" target="_blank" rel="noopener">View website</a></p>';
				}
			}
		);
	}
);
