<?php
/**
 * Content model: every post type, page-settings screen and field lives here.
 *
 * Field keys are camelCase on purpose — they are returned as-is by the REST
 * API and match the shapes the Next.js data layer (src/lib/*) already uses.
 *
 * Field types: text, textarea, wysiwyg, number, email, url, radio, checkbox,
 * lines (one item per line → string[]), image, video, gallery, group, repeater.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

/** Slugs owned by built-in frontend routes; pages cannot use them. */
const RESERVED_PAGE_SLUGS = array( 'fleet', 'destinations', 'services', 'about', 'contact', 'privacy', 'terms', 'api', 'admin' );

function seo_group(): array {
	return array(
		'name'   => 'seo',
		'type'   => 'group',
		'label'  => 'SEO',
		'fields' => array(
			array( 'name' => 'title', 'type' => 'text', 'label' => 'Meta title', 'description' => 'Leave blank to use the default title.' ),
			array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Meta description' ),
			array( 'name' => 'image', 'type' => 'image', 'label' => 'Social share image' ),
			array( 'name' => 'focusKeyphrase', 'type' => 'text', 'label' => 'Focus key phrase' ),
			array( 'name' => 'contentSummary', 'type' => 'textarea', 'label' => 'Content summary (AI search)', 'description' => '2–3 factual sentences that summarise this page.' ),
			array( 'name' => 'canonicalUrl', 'type' => 'url', 'label' => 'Canonical URL', 'description' => 'Leave blank to use the default URL.' ),
		),
	);
}

function stats_repeater( string $name, string $label, int $max ): array {
	return array(
		'name'   => $name,
		'type'   => 'repeater',
		'label'  => $label,
		'max'    => $max,
		'button' => 'Add stat',
		'fields' => array(
			array( 'name' => 'value', 'type' => 'text', 'label' => 'Value' ),
			array( 'name' => 'label', 'type' => 'text', 'label' => 'Label' ),
		),
	);
}

function section_group( string $name, string $label ): array {
	return array(
		'name'   => $name,
		'type'   => 'group',
		'label'  => $label,
		'fields' => array(
			array( 'name' => 'label', 'type' => 'text', 'label' => 'Small label' ),
			array( 'name' => 'heading', 'type' => 'text', 'label' => 'Heading' ),
			array( 'name' => 'subtitle', 'type' => 'text', 'label' => 'Subtitle' ),
		),
	);
}

/**
 * Custom post types. `editor` is the main description, `thumbnail` the main image,
 * `page-attributes` the display order.
 */
function post_types(): array {
	return array(
		'alma_vessel'      => array(
			'singular'  => 'Vessel',
			'plural'    => 'Fleet',
			'rest_base' => 'vessels',
			'rewrite'   => 'fleet',
			'icon'      => 'dashicons-sos',
			'supports'  => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'image'     => 'Hero image',
			'fields'    => array(
				array( 'name' => 'type', 'type' => 'text', 'label' => 'Type', 'description' => 'e.g. Luxury Catamaran' ),
				array( 'name' => 'year', 'type' => 'number', 'label' => 'Year' ),
				array( 'name' => 'length', 'type' => 'text', 'label' => 'Length', 'description' => 'e.g. 55ft' ),
				array( 'name' => 'beam', 'type' => 'text', 'label' => 'Beam' ),
				array( 'name' => 'draft', 'type' => 'text', 'label' => 'Draft' ),
				array( 'name' => 'guests', 'type' => 'number', 'label' => 'Guests' ),
				array( 'name' => 'cabins', 'type' => 'number', 'label' => 'Cabins' ),
				array( 'name' => 'bathrooms', 'type' => 'number', 'label' => 'Bathrooms' ),
				array( 'name' => 'crew', 'type' => 'number', 'label' => 'Crew', 'default' => 2 ),
				array( 'name' => 'startingPrice', 'type' => 'number', 'label' => 'Starting price (€ / week)' ),
				array( 'name' => 'location', 'type' => 'text', 'label' => 'Location', 'default' => 'Greece' ),
				array( 'name' => 'basePort', 'type' => 'text', 'label' => 'Base port', 'default' => 'Athens, Greece' ),
				array( 'name' => 'highlights', 'type' => 'lines', 'label' => 'Highlights', 'description' => 'One highlight per line.' ),
				array(
					'name'   => 'specifications',
					'type'   => 'group',
					'label'  => 'Technical specifications',
					'fields' => array(
						array( 'name' => 'loa', 'type' => 'text', 'label' => 'LOA (length overall)' ),
						array( 'name' => 'beam', 'type' => 'text', 'label' => 'Beam' ),
						array( 'name' => 'draft', 'type' => 'text', 'label' => 'Draft' ),
						array( 'name' => 'displacement', 'type' => 'text', 'label' => 'Displacement' ),
						array( 'name' => 'sailArea', 'type' => 'text', 'label' => 'Sail area' ),
						array( 'name' => 'engines', 'type' => 'text', 'label' => 'Engines' ),
						array( 'name' => 'fuelCapacity', 'type' => 'text', 'label' => 'Fuel capacity' ),
						array( 'name' => 'waterCapacity', 'type' => 'text', 'label' => 'Water capacity' ),
						array( 'name' => 'maxSpeed', 'type' => 'text', 'label' => 'Max speed' ),
						array( 'name' => 'cruisingSpeed', 'type' => 'text', 'label' => 'Cruising speed' ),
					),
				),
				array( 'name' => 'images', 'type' => 'gallery', 'label' => 'Gallery images', 'max' => 40, 'description' => 'Drag to reorder.' ),
			),
		),
		'alma_destination' => array(
			'singular'  => 'Destination',
			'plural'    => 'Destinations',
			'rest_base' => 'destinations',
			'rewrite'   => 'destinations',
			'icon'      => 'dashicons-location-alt',
			'supports'  => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'image'     => 'Destination image',
			'fields'    => array(
				array( 'name' => 'region', 'type' => 'text', 'label' => 'Region', 'description' => 'e.g. Ionian Islands, Saronic Gulf, Cyclades' ),
				array( 'name' => 'shortDescription', 'type' => 'text', 'label' => 'Short description', 'description' => 'One sentence shown in preview cards.' ),
				array( 'name' => 'highlights', 'type' => 'lines', 'label' => 'Highlights', 'max' => 6, 'description' => 'One per line, up to 6.' ),
				array( 'name' => 'bestSeason', 'type' => 'text', 'label' => 'Best season', 'description' => 'e.g. May – October' ),
				array( 'name' => 'distance', 'type' => 'text', 'label' => 'Distance', 'description' => 'e.g. 55 nautical miles from Athens' ),
			),
		),
		'alma_service'     => array(
			'singular'  => 'Service',
			'plural'    => 'Services',
			'rest_base' => 'services',
			'rewrite'   => 'services',
			'icon'      => 'dashicons-star-filled',
			'supports'  => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'image'     => 'Service image',
			'fields'    => array(
				array( 'name' => 'subtitle', 'type' => 'text', 'label' => 'Subtitle', 'description' => 'Short tagline shown below the title.' ),
				array( 'name' => 'shortDescription', 'type' => 'text', 'label' => 'Short description', 'description' => 'One sentence used on the homepage services grid.' ),
				array( 'name' => 'longDescription', 'type' => 'wysiwyg', 'label' => 'Long description' ),
				array( 'name' => 'features', 'type' => 'lines', 'label' => 'Features', 'description' => 'One feature per line.' ),
			),
		),
		'alma_team_member' => array(
			'singular'  => 'Team member',
			'plural'    => 'Team',
			'rest_base' => 'team-members',
			'rewrite'   => 'team',
			'icon'      => 'dashicons-groups',
			'supports'  => array( 'title', 'thumbnail', 'page-attributes' ),
			'image'     => 'Photo',
			'fields'    => array(
				array( 'name' => 'role', 'type' => 'text', 'label' => 'Role', 'description' => 'e.g. Founder & Managing Director' ),
				array( 'name' => 'bio', 'type' => 'textarea', 'label' => 'Bio' ),
			),
		),
	);
}

/**
 * Extra fields for client-managed pages (native WordPress Pages), rendered by the
 * frontend's standard page template: hero (featured image + title + these), block
 * editor content, optional call-to-action band.
 */
function page_fields(): array {
	return array(
		array( 'name' => 'heroLabel', 'type' => 'text', 'label' => 'Hero label', 'description' => 'Small label above the title (optional).' ),
		array( 'name' => 'heroSubtitle', 'type' => 'textarea', 'label' => 'Hero subtitle' ),
		array(
			'name'   => 'cta',
			'type'   => 'group',
			'label'  => 'Call-to-action band',
			'fields' => array(
				array( 'name' => 'enabled', 'type' => 'checkbox', 'label' => 'Show call-to-action band' ),
				array( 'name' => 'heading', 'type' => 'text', 'label' => 'Heading' ),
				array( 'name' => 'bodyText', 'type' => 'textarea', 'label' => 'Text' ),
				array( 'name' => 'buttonText', 'type' => 'text', 'label' => 'Button text' ),
				array( 'name' => 'buttonUrl', 'type' => 'url', 'label' => 'Button link', 'description' => 'e.g. /contact' ),
			),
		),
	);
}

/** Every post type with custom fields → its fields (SEO excluded). */
function content_types(): array {
	$types = array();
	foreach ( post_types() as $post_type => $config ) {
		$types[ $post_type ] = $config['fields'];
	}
	$types['page'] = page_fields();
	return $types;
}

/** Homepage hero: a slider of up to 6 images OR one video — never both. */
function sanitize_hero( array $hero ): array {
	if ( 'video' === $hero['mode'] ) {
		$hero['slides'] = array();
	} else {
		$hero['video']       = 0;
		$hero['videoPoster'] = 0;
	}
	return $hero;
}

/** Singleton settings screens (replace the Payload globals). */
function settings_pages(): array {
	return array(
		'site-settings'     => array(
			'title'  => 'Site Settings',
			'fields' => array(
				array( 'name' => 'companyName', 'type' => 'text', 'label' => 'Company name' ),
				array( 'name' => 'tagline', 'type' => 'textarea', 'label' => 'Tagline' ),
				array( 'name' => 'phone', 'type' => 'text', 'label' => 'Phone' ),
				array( 'name' => 'email', 'type' => 'email', 'label' => 'Email' ),
				array( 'name' => 'address', 'type' => 'textarea', 'label' => 'Address' ),
				array( 'name' => 'officeHours', 'type' => 'textarea', 'label' => 'Office hours' ),
				array( 'name' => 'basePort', 'type' => 'text', 'label' => 'Base port' ),
				array( 'name' => 'instagramUrl', 'type' => 'url', 'label' => 'Instagram URL' ),
				array( 'name' => 'facebookUrl', 'type' => 'url', 'label' => 'Facebook URL' ),
			),
		),
		'homepage'          => array(
			'title'  => 'Homepage',
			'fields' => array(
				array(
					'name'     => 'hero',
					'type'     => 'group',
					'label'    => 'Hero',
					'sanitize' => __NAMESPACE__ . '\sanitize_hero',
					'fields'   => array(
						array(
							'name'    => 'mode',
							'type'    => 'radio',
							'label'   => 'Background',
							'default' => 'slider',
							'options' => array(
								'slider' => 'Image slider (up to 6 images)',
								'video'  => 'Single video (no slider)',
							),
							'confirm' => array( 'video' => 'Switching to video removes the slider images when you save. Continue?' ),
						),
						array( 'name' => 'slides', 'type' => 'gallery', 'label' => 'Slider images', 'max' => 6, 'condition' => array( 'field' => 'mode', 'value' => 'slider' ), 'description' => 'Up to 6 images, drag to reorder. With a single image the hero is static.' ),
						array( 'name' => 'video', 'type' => 'video', 'label' => 'Video', 'condition' => array( 'field' => 'mode', 'value' => 'video' ), 'description' => 'MP4 (H.264), ideally 10–30 seconds and under 15 MB. Plays muted on a loop.' ),
						array( 'name' => 'videoPoster', 'type' => 'image', 'label' => 'Video placeholder', 'condition' => array( 'field' => 'mode', 'value' => 'video' ), 'description' => 'Optional still frame shown while the video loads and for visitors with reduced motion enabled.' ),
						array( 'name' => 'label', 'type' => 'text', 'label' => 'Small label' ),
						array( 'name' => 'headline', 'type' => 'text', 'label' => 'Headline' ),
						array( 'name' => 'subheadline', 'type' => 'textarea', 'label' => 'Subheadline' ),
						array( 'name' => 'ctaPrimaryText', 'type' => 'text', 'label' => 'Primary button text' ),
						array( 'name' => 'ctaSecondaryText', 'type' => 'text', 'label' => 'Secondary button text' ),
						stats_repeater( 'stats', 'Stats row', 4 ),
					),
				),
				array(
					'name'   => 'aboutIntro',
					'type'   => 'group',
					'label'  => 'About intro',
					'fields' => array(
						array( 'name' => 'quoteText', 'type' => 'text', 'label' => 'Quote' ),
						array( 'name' => 'quoteAttribution', 'type' => 'text', 'label' => 'Quote attribution' ),
						array( 'name' => 'sectionLabel', 'type' => 'text', 'label' => 'Small label' ),
						array( 'name' => 'sectionHeading', 'type' => 'text', 'label' => 'Heading' ),
						array( 'name' => 'bodyText', 'type' => 'wysiwyg', 'label' => 'Text' ),
					),
				),
				section_group( 'fleetPreview', 'Fleet preview' ),
				section_group( 'servicesSection', 'Services section' ),
				section_group( 'destinationsSection', 'Destinations section' ),
				array(
					'name'   => 'ctaSection',
					'type'   => 'group',
					'label'  => 'Call-to-action section',
					'fields' => array(
						array( 'name' => 'label', 'type' => 'text', 'label' => 'Small label' ),
						array( 'name' => 'heading', 'type' => 'text', 'label' => 'Heading' ),
						array( 'name' => 'bodyText', 'type' => 'textarea', 'label' => 'Text' ),
						array( 'name' => 'ctaPrimaryText', 'type' => 'text', 'label' => 'Primary button text' ),
						array( 'name' => 'ctaSecondaryText', 'type' => 'text', 'label' => 'Secondary button text' ),
						array( 'name' => 'backgroundImage', 'type' => 'image', 'label' => 'Background image' ),
					),
				),
				seo_group(),
			),
		),
		'about-page'        => array(
			'title'  => 'About Page',
			'fields' => array(
				array( 'name' => 'pageLabel', 'type' => 'text', 'label' => 'Small label' ),
				array( 'name' => 'pageHeading', 'type' => 'text', 'label' => 'Page heading' ),
				array( 'name' => 'storyHeading', 'type' => 'text', 'label' => 'Story heading' ),
				array( 'name' => 'storyText', 'type' => 'wysiwyg', 'label' => 'Story text' ),
				stats_repeater( 'stats', 'Stats overlay', 4 ),
				array(
					'name'   => 'values',
					'type'   => 'repeater',
					'label'  => 'Company values',
					'button' => 'Add value',
					'fields' => array(
						array( 'name' => 'title', 'type' => 'text', 'label' => 'Title' ),
						array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Description' ),
					),
				),
				array( 'name' => 'ctaHeading', 'type' => 'text', 'label' => 'CTA heading' ),
				array( 'name' => 'ctaBodyText', 'type' => 'text', 'label' => 'CTA text' ),
				seo_group(),
			),
		),
		'fleet-page'        => array(
			'title'  => 'Fleet Page',
			'fields' => array(
				array( 'name' => 'pageLabel', 'type' => 'text', 'label' => 'Small label' ),
				array( 'name' => 'pageHeading', 'type' => 'text', 'label' => 'Page heading' ),
				array( 'name' => 'introText', 'type' => 'text', 'label' => 'Intro text' ),
				stats_repeater( 'stats', 'Stats strip', 3 ),
				array(
					'name'   => 'bespokeSection',
					'type'   => 'group',
					'label'  => 'Bespoke charters section',
					'fields' => array(
						array( 'name' => 'heading', 'type' => 'text', 'label' => 'Heading' ),
						array( 'name' => 'subtitle', 'type' => 'text', 'label' => 'Subtitle' ),
						array(
							'name'   => 'details',
							'type'   => 'repeater',
							'label'  => 'Details',
							'max'    => 4,
							'button' => 'Add detail',
							'fields' => array(
								array( 'name' => 'label', 'type' => 'text', 'label' => 'Label' ),
								array( 'name' => 'value', 'type' => 'text', 'label' => 'Value' ),
							),
						),
					),
				),
				seo_group(),
			),
		),
		'destinations-page' => array(
			'title'  => 'Destinations Page',
			'fields' => array(
				array( 'name' => 'pageLabel', 'type' => 'text', 'label' => 'Small label' ),
				array( 'name' => 'pageHeading', 'type' => 'text', 'label' => 'Page heading' ),
				array( 'name' => 'pageSubheading', 'type' => 'text', 'label' => 'Page subheading' ),
				array(
					'name'   => 'seas',
					'type'   => 'repeater',
					'label'  => 'Sea regions',
					'max'    => 3,
					'button' => 'Add region',
					'fields' => array(
						array( 'name' => 'name', 'type' => 'text', 'label' => 'Name' ),
						array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Description' ),
						array( 'name' => 'islands', 'type' => 'text', 'label' => 'Islands', 'description' => 'Comma-separated.' ),
					),
				),
				array( 'name' => 'destinationsGridHeading', 'type' => 'text', 'label' => 'Destinations grid heading' ),
				array(
					'name'   => 'customRouteCta',
					'type'   => 'group',
					'label'  => 'Custom route CTA',
					'fields' => array(
						array( 'name' => 'heading', 'type' => 'text', 'label' => 'Heading' ),
						array( 'name' => 'bodyText', 'type' => 'text', 'label' => 'Text' ),
					),
				),
				seo_group(),
			),
		),
		'services-page'     => array(
			'title'  => 'Services Page',
			'fields' => array(
				array( 'name' => 'pageLabel', 'type' => 'text', 'label' => 'Small label' ),
				array( 'name' => 'pageHeading', 'type' => 'text', 'label' => 'Page heading' ),
				array( 'name' => 'pageSubheading', 'type' => 'text', 'label' => 'Page subheading' ),
				array( 'name' => 'whyAlmaLabel', 'type' => 'text', 'label' => '"Why ALMA" label' ),
				array( 'name' => 'whyAlmaHeading', 'type' => 'text', 'label' => '"Why ALMA" heading' ),
				array( 'name' => 'whyAlmaSubtitle', 'type' => 'text', 'label' => '"Why ALMA" subtitle' ),
				array(
					'name'   => 'whyAlmaStats',
					'type'   => 'repeater',
					'label'  => '"Why ALMA" stats',
					'max'    => 4,
					'button' => 'Add stat',
					'fields' => array(
						array( 'name' => 'stat', 'type' => 'text', 'label' => 'Stat' ),
						array( 'name' => 'label', 'type' => 'text', 'label' => 'Label' ),
						array( 'name' => 'description', 'type' => 'text', 'label' => 'Description' ),
					),
				),
				seo_group(),
			),
		),
		'contact-page'      => array(
			'title'  => 'Contact Page',
			'fields' => array(
				array( 'name' => 'pageLabel', 'type' => 'text', 'label' => 'Small label' ),
				array( 'name' => 'pageHeading', 'type' => 'text', 'label' => 'Page heading' ),
				array( 'name' => 'subheading', 'type' => 'text', 'label' => 'Subheading' ),
				array( 'name' => 'introText', 'type' => 'textarea', 'label' => 'Intro text' ),
				array( 'name' => 'mapLabel', 'type' => 'text', 'label' => 'Map label' ),
				array( 'name' => 'responseGuarantee', 'type' => 'text', 'label' => 'Response guarantee' ),
				seo_group(),
			),
		),
	);
}
