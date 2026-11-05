<?php
/**
 * Custom REST routes (namespace alma/v1):
 *
 *   GET            /alma/v1/settings              all settings screens, keyed by slug
 *   GET            /alma/v1/settings/{key}        one screen (e.g. homepage)
 *   POST|PUT|PATCH /alma/v1/settings/{key}        partial update (Editors+, application password)
 *   GET            /alma/v1/menus/{location}      menu tree (primary, footer)
 *
 * Post types use the core routes (/wp/v2/vessels, /wp/v2/pages, …) with the extra
 * `fields` and `featuredImage` properties registered in post-types.php.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'alma/v1',
			'/settings',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => '__return_true',
				'callback'            => function () {
					$out = array();
					foreach ( array_keys( settings_pages() ) as $key ) {
						$out[ $key ] = settings_to_rest( $key );
					}
					return $out;
				},
			)
		);

		register_rest_route(
			'alma/v1',
			'/settings/(?P<key>[a-z-]+)',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'permission_callback' => '__return_true',
					'callback'            => function ( \WP_REST_Request $request ) {
						$key = $request['key'];
						if ( ! isset( settings_pages()[ $key ] ) ) {
							return new \WP_Error( 'alma_not_found', 'Unknown settings key.', array( 'status' => 404 ) );
						}
						return settings_to_rest( $key );
					},
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'permission_callback' => function () {
						return current_user_can( ALMA_HEADLESS_CAP );
					},
					'callback'            => function ( \WP_REST_Request $request ) {
						$key = $request['key'];
						if ( ! isset( settings_pages()[ $key ] ) ) {
							return new \WP_Error( 'alma_not_found', 'Unknown settings key.', array( 'status' => 404 ) );
						}
						$body = $request->get_json_params();
						save_settings_values( $key, array_merge( get_settings_values( $key ), is_array( $body ) ? $body : array() ) );
						return settings_to_rest( $key );
					},
				),
			)
		);

		register_rest_route(
			'alma/v1',
			'/menus/(?P<location>[a-z0-9_-]+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => '__return_true',
				'callback'            => function ( \WP_REST_Request $request ) {
					$location = $request['location'];
					if ( ! array_key_exists( $location, get_registered_nav_menus() ) ) {
						return new \WP_Error( 'alma_not_found', 'Unknown menu location.', array( 'status' => 404 ) );
					}
					return menu_tree( $location );
				},
			)
		);
	}
);
