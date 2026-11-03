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

/**
 * Per-entry SEO & GEO panel, attached to every post type, page and page-settings screen.
 * "GEO" covers both Generative Engine Optimization (AI search) and geographic targeting.
 */
function seo_group(): array {
	return array(
		'name'   => 'seo',
		'type'   => 'group',
		'label'  => 'SEO & GEO',
		'fields' => array(
			array( 'name' => 'title', 'type' => 'text', 'label' => 'Meta title', 'description' => 'Leave blank to use the default title. Aim for 50–60 characters.' ),
			array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Meta description', 'description' => 'Aim for 120–160 characters.' ),
			array( 'name' => 'focusKeyphrase', 'type' => 'text', 'label' => 'Focus key phrase', 'description' => "e.g. 'Lagoon 55 charter Greece'." ),
			array( 'name' => 'secondaryKeyphrases', 'type' => 'lines', 'label' => 'Secondary key phrases', 'description' => 'One per line. Output as meta keywords.' ),
			array( 'name' => 'canonicalUrl', 'type' => 'url', 'label' => 'Canonical URL', 'description' => 'Leave blank to use this page’s own URL.' ),
			array(
				'name'   => 'robots',
				'type'   => 'group',
				'label'  => 'Indexing',
				'fields' => array(
					array( 'name' => 'noindex', 'type' => 'checkbox', 'label' => 'Hide from search engines (noindex)' ),
					array( 'name' => 'nofollow', 'type' => 'checkbox', 'label' => 'Do not follow links (nofollow)' ),
					array( 'name' => 'noarchive', 'type' => 'checkbox', 'label' => 'No cached copy (noarchive)' ),
					array( 'name' => 'nosnippet', 'type' => 'checkbox', 'label' => 'No text snippet (nosnippet)' ),
					array( 'name' => 'noimageindex', 'type' => 'checkbox', 'label' => 'Do not index images (noimageindex)' ),
					array(
						'name'    => 'maxImagePreview',
						'type'    => 'select',
						'label'   => 'Max image preview',
						'default' => 'large',
						'options' => array( 'large' => 'Large', 'standard' => 'Standard', 'none' => 'None' ),
					),
					array( 'name' => 'maxSnippet', 'type' => 'number', 'label' => 'Max snippet length', 'description' => 'Characters. Leave blank for no limit.' ),
					array( 'name' => 'excludeFromSitemap', 'type' => 'checkbox', 'label' => 'Exclude from sitemap.xml' ),
					array(
						'name'    => 'sitemapPriority',
						'type'    => 'select',
						'label'   => 'Sitemap priority',
						'options' => array( '' => 'Automatic', '1.0' => '1.0', '0.9' => '0.9', '0.8' => '0.8', '0.7' => '0.7', '0.6' => '0.6', '0.5' => '0.5', '0.4' => '0.4', '0.3' => '0.3', '0.2' => '0.2', '0.1' => '0.1' ),
					),
					array(
						'name'    => 'sitemapChangeFrequency',
						'type'    => 'select',
						'label'   => 'Sitemap change frequency',
						'options' => array( '' => 'Automatic', 'always' => 'Always', 'hourly' => 'Hourly', 'daily' => 'Daily', 'weekly' => 'Weekly', 'monthly' => 'Monthly', 'yearly' => 'Yearly', 'never' => 'Never' ),
					),
				),
			),
			array(
				'name'   => 'openGraph',
				'type'   => 'group',
				'label'  => 'Social sharing (Facebook, LinkedIn, WhatsApp)',
				'fields' => array(
					array( 'name' => 'title', 'type' => 'text', 'label' => 'Title', 'description' => 'Defaults to the meta title.' ),
					array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Description', 'description' => 'Defaults to the meta description.' ),
					array( 'name' => 'image', 'type' => 'image', 'label' => 'Image', 'description' => '1200 × 630 px recommended. Defaults to the main image, then the site default.' ),
					array(
						'name'    => 'type',
						'type'    => 'select',
						'label'   => 'Type',
						'default' => 'website',
						'options' => array( 'website' => 'Website', 'article' => 'Article' ),
					),
				),
			),
			array(
				'name'   => 'twitter',
				'type'   => 'group',
				'label'  => 'X / Twitter',
				'fields' => array(
					array( 'name' => 'title', 'type' => 'text', 'label' => 'Title', 'description' => 'Defaults to the social sharing title.' ),
					array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Description' ),
					array( 'name' => 'image', 'type' => 'image', 'label' => 'Image' ),
					array(
						'name'    => 'card',
						'type'    => 'select',
						'label'   => 'Card type',
						'default' => 'summary_large_image',
						'options' => array( 'summary_large_image' => 'Large image', 'summary' => 'Summary' ),
					),
				),
			),
			array(
				'name'   => 'ai',
				'type'   => 'group',
				'label'  => 'AI search (GEO)',
				'fields' => array(
					array( 'name' => 'contentSummary', 'type' => 'textarea', 'label' => 'Content summary', 'description' => '2–3 factual sentences answering “what is this page about?”. Used in structured data and llms.txt for ChatGPT, Perplexity, Gemini and Google AI Overviews.' ),
					array( 'name' => 'keyFacts', 'type' => 'lines', 'label' => 'Key facts', 'description' => 'One short, citable fact per line (e.g. “Based in Marina Zea, Piraeus”).' ),
					array(
						'name'   => 'faq',
						'type'   => 'repeater',
						'label'  => 'FAQ',
						'button' => 'Add question',
						'fields' => array(
							array( 'name' => 'question', 'type' => 'text', 'label' => 'Question' ),
							array( 'name' => 'answer', 'type' => 'textarea', 'label' => 'Answer' ),
						),
					),
					array( 'name' => 'showFaq', 'type' => 'checkbox', 'label' => 'Also show the FAQ on the page', 'description' => 'Google only uses FAQ structured data for questions visible on the page.' ),
					array(
						'name'    => 'schemaType',
						'type'    => 'select',
						'label'   => 'Page type (structured data)',
						'options' => array(
							''                   => 'Automatic',
							'WebPage'            => 'Web page',
							'AboutPage'          => 'About page',
							'ContactPage'        => 'Contact page',
							'CollectionPage'     => 'Collection / listing page',
							'FAQPage'            => 'FAQ page',
							'Article'            => 'Article',
							'Service'            => 'Service',
							'Product'            => 'Product',
							'TouristDestination' => 'Tourist destination',
							'TouristTrip'        => 'Tourist trip / itinerary',
						),
					),
					array( 'name' => 'breadcrumbTitle', 'type' => 'text', 'label' => 'Breadcrumb title', 'description' => 'Short name for breadcrumbs. Defaults to the title.' ),
				),
			),
			array(
				'name'   => 'location',
				'type'   => 'group',
				'label'  => 'Geographic targeting',
				'fields' => array(
					array( 'name' => 'placeName', 'type' => 'text', 'label' => 'Place name', 'description' => 'e.g. Hydra, Saronic Gulf. Leave blank to use the site default.' ),
					array( 'name' => 'region', 'type' => 'text', 'label' => 'Region code', 'description' => 'ISO 3166-2, e.g. GR-I (Attica), GR-J (Peloponnese), GR-L (South Aegean).' ),
					array( 'name' => 'latitude', 'type' => 'number', 'label' => 'Latitude' ),
					array( 'name' => 'longitude', 'type' => 'number', 'label' => 'Longitude' ),
				),
			),
		),
	);
}

/** Site-wide SEO & GEO defaults, verification, structured data and crawler rules. */
function seo_settings_fields(): array {
	return array(
		array(
			'name'   => 'general',
			'type'   => 'group',
			'label'  => 'Defaults',
			'fields' => array(
				array( 'name' => 'siteUrl', 'type' => 'url', 'label' => 'Website URL', 'description' => 'Canonical base, e.g. https://www.almayachting.com' ),
				array( 'name' => 'siteName', 'type' => 'text', 'label' => 'Site name' ),
				array( 'name' => 'titleTemplate', 'type' => 'text', 'label' => 'Title template', 'description' => '%s is replaced by the page title, e.g. “%s | ALMA Yachting”.' ),
				array( 'name' => 'defaultTitle', 'type' => 'text', 'label' => 'Default title', 'description' => 'Homepage and pages without their own title.' ),
				array( 'name' => 'defaultDescription', 'type' => 'textarea', 'label' => 'Default meta description' ),
				array( 'name' => 'defaultKeywords', 'type' => 'lines', 'label' => 'Default keywords', 'description' => 'One per line.' ),
				array( 'name' => 'defaultShareImage', 'type' => 'image', 'label' => 'Default social share image', 'description' => '1200 × 630 px.' ),
				array( 'name' => 'locale', 'type' => 'text', 'label' => 'Locale', 'description' => 'e.g. en_US' ),
				array(
					'name'   => 'alternateLanguages',
					'type'   => 'repeater',
					'label'  => 'Alternate language sites (hreflang)',
					'button' => 'Add language',
					'fields' => array(
						array( 'name' => 'hreflang', 'type' => 'text', 'label' => 'Language code', 'description' => 'e.g. el, de, x-default' ),
						array( 'name' => 'url', 'type' => 'url', 'label' => 'Site URL' ),
					),
				),
				array( 'name' => 'themeColor', 'type' => 'text', 'label' => 'Browser theme colour', 'description' => 'e.g. #0A1628' ),
			),
		),
		array(
			'name'   => 'verification',
			'type'   => 'group',
			'label'  => 'Search engine verification',
			'fields' => array(
				array( 'name' => 'google', 'type' => 'text', 'label' => 'Google Search Console', 'description' => 'Only the content="…" code.' ),
				array( 'name' => 'bing', 'type' => 'text', 'label' => 'Bing Webmaster Tools' ),
				array( 'name' => 'yandex', 'type' => 'text', 'label' => 'Yandex' ),
				array( 'name' => 'baidu', 'type' => 'text', 'label' => 'Baidu' ),
				array( 'name' => 'pinterest', 'type' => 'text', 'label' => 'Pinterest' ),
				array( 'name' => 'facebook', 'type' => 'text', 'label' => 'Facebook domain verification' ),
			),
		),
		array(
			'name'   => 'social',
			'type'   => 'group',
			'label'  => 'Social profiles',
			'fields' => array(
				array( 'name' => 'twitterSite', 'type' => 'text', 'label' => 'X / Twitter handle', 'description' => 'e.g. @almayachting' ),
				array( 'name' => 'facebookAppId', 'type' => 'text', 'label' => 'Facebook App ID' ),
				array( 'name' => 'sameAs', 'type' => 'lines', 'label' => 'Profile URLs', 'description' => 'One per line: Instagram, Facebook, LinkedIn, YouTube, TripAdvisor, Google Business Profile… Tells search and AI engines these profiles belong to you.' ),
			),
		),
		array(
			'name'   => 'organization',
			'type'   => 'group',
			'label'  => 'Business (structured data / local SEO)',
			'fields' => array(
				array(
					'name'    => 'type',
					'type'    => 'select',
					'label'   => 'Business type',
					'default' => 'TravelAgency',
					'options' => array( 'TravelAgency' => 'Travel agency', 'LocalBusiness' => 'Local business', 'Organization' => 'Organization', 'TouristInformationCenter' => 'Tourist information centre' ),
				),
				array( 'name' => 'name', 'type' => 'text', 'label' => 'Business name' ),
				array( 'name' => 'legalName', 'type' => 'text', 'label' => 'Legal name' ),
				array( 'name' => 'alternateName', 'type' => 'text', 'label' => 'Alternate name' ),
				array( 'name' => 'description', 'type' => 'textarea', 'label' => 'Description' ),
				array( 'name' => 'logo', 'type' => 'image', 'label' => 'Logo', 'description' => 'Square or wide PNG, at least 112 × 112 px.' ),
				array( 'name' => 'image', 'type' => 'image', 'label' => 'Representative photo' ),
				array( 'name' => 'phone', 'type' => 'text', 'label' => 'Phone (international format)' ),
				array( 'name' => 'email', 'type' => 'email', 'label' => 'Email' ),
				array( 'name' => 'streetAddress', 'type' => 'text', 'label' => 'Street address' ),
				array( 'name' => 'locality', 'type' => 'text', 'label' => 'City' ),
				array( 'name' => 'region', 'type' => 'text', 'label' => 'Region' ),
				array( 'name' => 'postalCode', 'type' => 'text', 'label' => 'Postal code' ),
				array( 'name' => 'country', 'type' => 'text', 'label' => 'Country code', 'description' => 'ISO 3166-1, e.g. GR' ),
				array( 'name' => 'latitude', 'type' => 'number', 'label' => 'Latitude' ),
				array( 'name' => 'longitude', 'type' => 'number', 'label' => 'Longitude' ),
				array( 'name' => 'mapUrl', 'type' => 'url', 'label' => 'Google Maps / Business Profile URL' ),
				array( 'name' => 'priceRange', 'type' => 'text', 'label' => 'Price range', 'description' => 'e.g. €€€ or “€5,000–€25,000 per week”.' ),
				array( 'name' => 'currency', 'type' => 'text', 'label' => 'Currency', 'description' => 'ISO 4217, e.g. EUR' ),
				array( 'name' => 'areaServed', 'type' => 'lines', 'label' => 'Areas served', 'description' => 'One per line, e.g. Cyclades, Saronic Gulf, Ionian Islands.' ),
				array( 'name' => 'knowsLanguage', 'type' => 'lines', 'label' => 'Languages spoken', 'description' => 'One per line, e.g. English, Greek.' ),
				array( 'name' => 'foundingDate', 'type' => 'text', 'label' => 'Founding year', 'description' => 'e.g. 2014' ),
				array( 'name' => 'vatId', 'type' => 'text', 'label' => 'VAT number' ),
				array(
					'name'   => 'openingHours',
					'type'   => 'repeater',
					'label'  => 'Opening hours',
					'button' => 'Add hours',
					'fields' => array(
						array( 'name' => 'days', 'type' => 'lines', 'label' => 'Days', 'description' => 'One per line: Monday … Sunday.' ),
						array( 'name' => 'opens', 'type' => 'text', 'label' => 'Opens', 'description' => 'HH:MM, e.g. 09:00' ),
						array( 'name' => 'closes', 'type' => 'text', 'label' => 'Closes', 'description' => 'HH:MM, e.g. 18:00' ),
					),
				),
			),
		),
		array(
			'name'   => 'location',
			'type'   => 'group',
			'label'  => 'Geographic targeting (site default)',
			'fields' => array(
				array( 'name' => 'placeName', 'type' => 'text', 'label' => 'Place name', 'description' => 'e.g. Piraeus, Athens' ),
				array( 'name' => 'region', 'type' => 'text', 'label' => 'Region code', 'description' => 'ISO 3166-2, e.g. GR-I' ),
				array( 'name' => 'latitude', 'type' => 'number', 'label' => 'Latitude' ),
				array( 'name' => 'longitude', 'type' => 'number', 'label' => 'Longitude' ),
			),
		),
		array(
			'name'   => 'crawlers',
			'type'   => 'group',
			'label'  => 'Crawlers, robots.txt & llms.txt',
			'fields' => array(
				array( 'name' => 'indexSite', 'type' => 'checkbox', 'label' => 'Allow search engines to index the website', 'default' => true, 'description' => 'Untick only for a staging site; it hides the whole site.' ),
				array( 'name' => 'allowAiSearch', 'type' => 'checkbox', 'label' => 'Allow AI search engines (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot…)', 'default' => true ),
				array( 'name' => 'allowAiTraining', 'type' => 'checkbox', 'label' => 'Allow AI model training (GPTBot, ClaudeBot, Google-Extended, CCBot…)', 'default' => true ),
				array( 'name' => 'blockedBots', 'type' => 'lines', 'label' => 'Other blocked crawlers', 'description' => 'One user agent per line.' ),
				array( 'name' => 'disallowPaths', 'type' => 'lines', 'label' => 'Disallowed paths', 'description' => 'One per line, e.g. /private' ),
				array( 'name' => 'sitemapExclude', 'type' => 'lines', 'label' => 'Paths excluded from sitemap.xml', 'description' => 'One per line.' ),
				array( 'name' => 'llmsIntro', 'type' => 'textarea', 'label' => 'llms.txt introduction', 'description' => 'Plain-language summary of the business for AI assistants. The page list is generated automatically.' ),
			),
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
				array( 'name' => 'latitude', 'type' => 'number', 'label' => 'Latitude', 'description' => 'For maps and structured data, e.g. 37.3497' ),
				array( 'name' => 'longitude', 'type' => 'number', 'label' => 'Longitude', 'description' => 'e.g. 23.4644' ),
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
				array(
					'name'        => 'pages',
					'type'        => 'group',
					'label'       => 'Built-in pages',
					'description' => 'Untick to switch a page off: it disappears from the website, menus, sitemap and llms.txt (visitors get “page not found”). Your own pages are managed under Pages: Draft or Private switches one off, Trash removes it.',
					'fields'      => array(
						array( 'name' => 'fleet', 'type' => 'checkbox', 'label' => 'Fleet (and every vessel page)', 'default' => true ),
						array( 'name' => 'destinations', 'type' => 'checkbox', 'label' => 'Destinations', 'default' => true ),
						array( 'name' => 'services', 'type' => 'checkbox', 'label' => 'Services', 'default' => true ),
						array( 'name' => 'about', 'type' => 'checkbox', 'label' => 'About', 'default' => true ),
						array( 'name' => 'contact', 'type' => 'checkbox', 'label' => 'Contact', 'default' => true, 'description' => 'Also hides the enquiry buttons that link to it.' ),
						array( 'name' => 'privacy', 'type' => 'checkbox', 'label' => 'Privacy Policy', 'default' => true ),
						array( 'name' => 'terms', 'type' => 'checkbox', 'label' => 'Terms & Conditions', 'default' => true ),
					),
				),
			),
		),
		'seo'               => array(
			'title'  => 'SEO & GEO',
			'fields' => seo_settings_fields(),
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
