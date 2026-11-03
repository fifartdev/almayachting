<?php
/**
 * Plugin Name: ALMA Headless
 * Description: Content model and REST API for the ALMA Yachting Next.js frontend — custom post types, page settings, menus, enquiries and on-demand revalidation. Uses WordPress core only (no third-party plugins).
 * Version:     0.3.0
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * Author:      ALMA Yachting
 * Text Domain: alma-headless
 */

defined( 'ABSPATH' ) || exit;

define( 'ALMA_HEADLESS_VERSION', '0.3.0' );
define( 'ALMA_HEADLESS_DIR', plugin_dir_path( __FILE__ ) );
define( 'ALMA_HEADLESS_URL', plugin_dir_url( __FILE__ ) );

/** Capability required to edit site content (Editors and Administrators have it). */
define( 'ALMA_HEADLESS_CAP', 'edit_others_posts' );

require_once ALMA_HEADLESS_DIR . 'includes/config.php';
require_once ALMA_HEADLESS_DIR . 'includes/fields.php';
require_once ALMA_HEADLESS_DIR . 'includes/post-types.php';
require_once ALMA_HEADLESS_DIR . 'includes/settings.php';
require_once ALMA_HEADLESS_DIR . 'includes/menus.php';
require_once ALMA_HEADLESS_DIR . 'includes/rest.php';
require_once ALMA_HEADLESS_DIR . 'includes/revalidate.php';
require_once ALMA_HEADLESS_DIR . 'includes/enquiries.php';
require_once ALMA_HEADLESS_DIR . 'includes/headless.php';

register_activation_hook(
	__FILE__,
	function () {
		\Alma\register_post_types();
		flush_rewrite_rules();
	}
);

register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
