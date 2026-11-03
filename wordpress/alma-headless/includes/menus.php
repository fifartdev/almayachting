<?php
/**
 * Navigation menus managed under Appearance → Menus and exposed to the frontend.
 * Links are returned as site-relative paths so the frontend can use them directly.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		register_nav_menus(
			array(
				'primary' => 'Main navigation',
				'footer'  => 'Footer navigation',
			)
		);
	}
);

/** Turns links to this WordPress site (or the frontend) into paths like `/about`. */
function frontend_link( string $url ): string {
	$parts = wp_parse_url( $url );
	if ( empty( $parts['host'] ) ) {
		return $url;
	}
	$hosts = array( wp_parse_url( home_url(), PHP_URL_HOST ) );
	if ( defined( 'ALMA_FRONTEND_URL' ) ) {
		$hosts[] = wp_parse_url( ALMA_FRONTEND_URL, PHP_URL_HOST );
	}
	if ( ! in_array( $parts['host'], $hosts, true ) ) {
		return $url;
	}
	$path = '/' . ltrim( untrailingslashit( $parts['path'] ?? '' ), '/' );
	return $path
		. ( isset( $parts['query'] ) ? '?' . $parts['query'] : '' )
		. ( isset( $parts['fragment'] ) ? '#' . $parts['fragment'] : '' );
}

function menu_tree( string $location ): array {
	$locations = get_nav_menu_locations();
	if ( empty( $locations[ $location ] ) ) {
		return array();
	}
	$items = wp_get_nav_menu_items( $locations[ $location ] );
	if ( ! $items ) {
		return array();
	}

	$nodes = array();
	foreach ( $items as $item ) {
		$nodes[ $item->ID ] = array(
			'id'       => (int) $item->ID,
			'parent'   => (int) $item->menu_item_parent,
			'label'    => $item->title,
			'url'      => frontend_link( (string) $item->url ),
			'target'   => $item->target ? $item->target : null,
			'children' => array(),
		);
	}

	$tree = array();
	foreach ( array_reverse( array_keys( $nodes ) ) as $id ) {
		$parent = $nodes[ $id ]['parent'];
		if ( $parent && isset( $nodes[ $parent ] ) ) {
			array_unshift( $nodes[ $parent ]['children'], $nodes[ $id ] );
		}
	}
	foreach ( $nodes as $node ) {
		if ( ! $node['parent'] || ! isset( $nodes[ $node['parent'] ] ) ) {
			$tree[] = $nodes[ $node['id'] ];
		}
	}
	return $tree;
}
