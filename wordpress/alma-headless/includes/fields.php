<?php
/**
 * Field engine: renders admin controls, sanitizes submitted values and converts
 * stored values to REST output. Shared by post meta boxes and settings screens.
 *
 * Stored values are compact (attachment IDs, plain arrays); REST output expands
 * media into { id, url, width, height, alt, … } objects.
 */

namespace Alma;

defined( 'ABSPATH' ) || exit;

/* -------------------------------------------------------------------------
 * Rendering
 * ---------------------------------------------------------------------- */

function input_name( string $prefix, string $name ): string {
	return $prefix . '[' . $name . ']';
}

function input_id( string $name ): string {
	return 'alma_' . trim( preg_replace( '/[^a-z0-9]+/', '_', strtolower( $name ) ), '_' );
}

function field_value( array $field, array $values ) {
	return array_key_exists( $field['name'], $values ) ? $values[ $field['name'] ] : ( $field['default'] ?? null );
}

function render_fields( array $fields, string $prefix, array $values ): void {
	echo '<table class="form-table alma-fields" role="presentation"><tbody>';
	foreach ( $fields as $field ) {
		render_row( $field, $prefix, $values );
	}
	echo '</tbody></table>';
}

function render_row( array $field, string $prefix, array $values ): void {
	$name  = input_name( $prefix, $field['name'] );
	$value = field_value( $field, $values );
	$attrs = '';
	if ( ! empty( $field['condition'] ) ) {
		$attrs = sprintf(
			' data-condition-field="%s" data-condition-value="%s"',
			esc_attr( input_name( $prefix, $field['condition']['field'] ) ),
			esc_attr( $field['condition']['value'] )
		);
	}

	if ( 'group' === $field['type'] ) {
		echo '<tr class="alma-row alma-row--group"' . $attrs . '><td colspan="2"><fieldset class="alma-group">';
		echo '<legend>' . esc_html( $field['label'] ) . '</legend>';
		render_description( $field );
		render_fields( $field['fields'], $name, is_array( $value ) ? $value : array() );
		echo '</fieldset></td></tr>';
		return;
	}

	echo '<tr class="alma-row"' . $attrs . '><th scope="row"><label for="' . esc_attr( input_id( $name ) ) . '">' . esc_html( $field['label'] ) . '</label></th><td>';
	render_control( $field, $name, $value );
	render_description( $field );
	echo '</td></tr>';
}

function render_description( array $field ): void {
	if ( ! empty( $field['description'] ) ) {
		echo '<p class="description">' . esc_html( $field['description'] ) . '</p>';
	}
}

function render_control( array $field, string $name, $value ): void {
	$id = input_id( $name );

	switch ( $field['type'] ) {
		case 'textarea':
		case 'lines':
			$text = 'lines' === $field['type'] ? implode( "\n", (array) $value ) : (string) $value;
			printf(
				'<textarea class="large-text" rows="%d" id="%s" name="%s">%s</textarea>',
				'lines' === $field['type'] ? 6 : 3,
				esc_attr( $id ),
				esc_attr( $name ),
				esc_textarea( $text )
			);
			break;

		case 'wysiwyg':
			wp_editor(
				(string) $value,
				$id,
				array(
					'textarea_name' => $name,
					'textarea_rows' => 8,
					'media_buttons' => false,
				)
			);
			break;

		case 'number':
			printf(
				'<input type="number" step="any" class="small-text" id="%s" name="%s" value="%s">',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( null === $value ? '' : (string) $value )
			);
			break;

		case 'radio':
			echo '<fieldset class="alma-radio">';
			foreach ( $field['options'] as $option => $label ) {
				printf(
					'<label><input type="radio" name="%s" value="%s"%s%s> %s</label><br>',
					esc_attr( $name ),
					esc_attr( $option ),
					checked( (string) $value, (string) $option, false ),
					isset( $field['confirm'][ $option ] ) ? ' data-confirm="' . esc_attr( $field['confirm'][ $option ] ) . '"' : '',
					esc_html( $label )
				);
			}
			echo '</fieldset>';
			break;

		case 'select':
			printf( '<select id="%s" name="%s">', esc_attr( $id ), esc_attr( $name ) );
			foreach ( $field['options'] as $option => $label ) {
				printf( '<option value="%s"%s>%s</option>', esc_attr( $option ), selected( (string) $value, (string) $option, false ), esc_html( $label ) );
			}
			echo '</select>';
			break;

		case 'checkbox':
			printf(
				'<input type="hidden" name="%1$s" value="0"><input type="checkbox" id="%2$s" name="%1$s" value="1"%3$s>',
				esc_attr( $name ),
				esc_attr( $id ),
				checked( (bool) $value, true, false )
			);
			break;

		case 'image':
		case 'video':
		case 'gallery':
			render_media_control( $field, $name, $value );
			break;

		case 'repeater':
			render_repeater( $field, $name, $value );
			break;

		default: // text, email, url
			printf(
				'<input type="%s" class="regular-text" id="%s" name="%s" value="%s">',
				'email' === $field['type'] ? 'email' : 'text',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( (string) $value )
			);
	}
}

function render_media_control( array $field, string $name, $value ): void {
	$type = $field['type'];
	$ids  = 'gallery' === $type ? (array) $value : array( $value );
	$ids  = array_values( array_filter( array_map( 'absint', $ids ) ) );
	$max  = 'gallery' === $type ? (int) ( $field['max'] ?? 0 ) : 1;

	printf( '<div class="alma-media" data-type="%s" data-max="%d">', esc_attr( $type ), $max );
	printf( '<input type="hidden" class="alma-media-input" id="%s" name="%s" value="%s">', esc_attr( input_id( $name ) ), esc_attr( $name ), esc_attr( implode( ',', $ids ) ) );
	echo '<ul class="alma-media-preview">';
	foreach ( $ids as $id ) {
		render_media_item( $id );
	}
	echo '</ul>';
	$labels = array(
		'image'   => 'Choose image',
		'video'   => 'Choose video',
		'gallery' => 'Add images',
	);
	printf( '<button type="button" class="button alma-media-select">%s</button>', esc_html( $labels[ $type ] ) );
	echo '</div>';
}

function render_media_item( int $id ): void {
	echo '<li class="alma-media-item" data-id="' . esc_attr( (string) $id ) . '">';
	if ( wp_attachment_is_image( $id ) ) {
		echo wp_get_attachment_image( $id, 'thumbnail' );
	} else {
		echo '<span class="dashicons dashicons-video-alt3"></span><span class="alma-media-name">' . esc_html( wp_basename( (string) get_attached_file( $id ) ) ) . '</span>';
	}
	echo '<button type="button" class="alma-media-remove" aria-label="Remove">&times;</button></li>';
}

function render_repeater( array $field, string $name, $value ): void {
	$rows = is_array( $value ) ? array_values( $value ) : array();

	printf( '<div class="alma-repeater" data-max="%d">', (int) ( $field['max'] ?? 0 ) );
	echo '<div class="alma-repeater-rows">';
	foreach ( $rows as $index => $row ) {
		render_repeater_row( $field, $name, (string) $index, is_array( $row ) ? $row : array() );
	}
	echo '</div>';
	echo '<script type="text/html" class="alma-repeater-template">';
	render_repeater_row( $field, $name, '__INDEX__', array() );
	echo '</script>';
	printf( '<button type="button" class="button alma-repeater-add">%s</button>', esc_html( $field['button'] ?? 'Add row' ) );
	echo '</div>';
}

function render_repeater_row( array $field, string $name, string $index, array $row ): void {
	echo '<div class="alma-repeater-row">';
	echo '<div class="alma-repeater-actions">';
	echo '<button type="button" class="button-link alma-repeater-up" aria-label="Move up">&uarr;</button>';
	echo '<button type="button" class="button-link alma-repeater-down" aria-label="Move down">&darr;</button>';
	echo '<button type="button" class="button-link button-link-delete alma-repeater-remove">Remove</button>';
	echo '</div>';
	render_fields( $field['fields'], $name . '[' . $index . ']', $row );
	echo '</div>';
}

/* -------------------------------------------------------------------------
 * Sanitizing
 * ---------------------------------------------------------------------- */

function sanitize_fields( array $fields, $raw ): array {
	$raw = is_array( $raw ) ? $raw : array();
	$out = array();
	foreach ( $fields as $field ) {
		$out[ $field['name'] ] = sanitize_field( $field, $raw[ $field['name'] ] ?? null );
	}
	return $out;
}

function sanitize_field( array $field, $raw ) {
	$max = (int) ( $field['max'] ?? 0 );

	switch ( $field['type'] ) {
		case 'email':
			$value = is_scalar( $raw ) ? sanitize_email( (string) $raw ) : '';
			break;
		case 'url':
			$value = is_scalar( $raw ) ? esc_url_raw( trim( (string) $raw ) ) : '';
			break;
		case 'textarea':
			$value = is_scalar( $raw ) ? sanitize_textarea_field( (string) $raw ) : '';
			break;
		case 'wysiwyg':
			$value = is_scalar( $raw ) ? wp_kses_post( (string) $raw ) : '';
			break;
		case 'number':
			$value = is_numeric( $raw ) ? $raw + 0 : null;
			break;
		case 'checkbox':
			$value = ! empty( $raw ) && '0' !== $raw;
			break;
		case 'radio':
		case 'select':
			$value = is_scalar( $raw ) && isset( $field['options'][ (string) $raw ] )
				? (string) $raw
				: ( $field['default'] ?? array_key_first( $field['options'] ) );
			break;
		case 'lines':
			$items = is_array( $raw ) ? $raw : preg_split( '/\r\n|\r|\n/', (string) $raw );
			$items = array_map( 'sanitize_text_field', array_filter( $items, 'is_scalar' ) );
			$value = array_values( array_filter( $items, 'strlen' ) );
			break;
		case 'image':
			$id    = absint( $raw );
			$value = $id && wp_attachment_is_image( $id ) ? $id : 0;
			break;
		case 'video':
			$id    = absint( $raw );
			$value = $id && wp_attachment_is( 'video', $id ) ? $id : 0;
			break;
		case 'gallery':
			$ids   = is_array( $raw ) ? $raw : explode( ',', (string) $raw );
			$ids   = array_unique( array_map( 'absint', $ids ) );
			$value = array_values( array_filter( $ids, 'wp_attachment_is_image' ) );
			break;
		case 'group':
			$value = sanitize_fields( $field['fields'], $raw );
			break;
		case 'repeater':
			$value = array();
			foreach ( is_array( $raw ) ? $raw : array() as $row ) {
				$clean = sanitize_fields( $field['fields'], $row );
				if ( ! is_empty_row( $clean ) ) {
					$value[] = $clean;
				}
			}
			break;
		default: // text
			$value = is_scalar( $raw ) ? sanitize_text_field( (string) $raw ) : '';
	}

	if ( $max && is_array( $value ) && in_array( $field['type'], array( 'lines', 'gallery', 'repeater' ), true ) ) {
		$value = array_slice( $value, 0, $max );
	}

	if ( ! empty( $field['sanitize'] ) && is_callable( $field['sanitize'] ) ) {
		$value = call_user_func( $field['sanitize'], $value );
	}

	return $value;
}

function is_empty_row( array $row ): bool {
	foreach ( $row as $value ) {
		if ( is_array( $value ) ? ! empty( $value ) : ( null !== $value && '' !== $value && false !== $value && 0 !== $value ) ) {
			return false;
		}
	}
	return true;
}

/* -------------------------------------------------------------------------
 * REST output
 * ---------------------------------------------------------------------- */

function fields_to_rest( array $fields, array $values ): array {
	$out = array();
	foreach ( $fields as $field ) {
		$out[ $field['name'] ] = field_to_rest( $field, field_value( $field, $values ) );
	}
	return $out;
}

function field_to_rest( array $field, $value ) {
	switch ( $field['type'] ) {
		case 'image':
			return image_data( absint( $value ) );
		case 'video':
			return video_data( absint( $value ) );
		case 'gallery':
			return array_values( array_filter( array_map( __NAMESPACE__ . '\image_data', array_map( 'absint', (array) $value ) ) ) );
		case 'group':
			return fields_to_rest( $field['fields'], is_array( $value ) ? $value : array() );
		case 'repeater':
			$rows = array();
			foreach ( is_array( $value ) ? $value : array() as $row ) {
				$rows[] = fields_to_rest( $field['fields'], is_array( $row ) ? $row : array() );
			}
			return $rows;
		case 'lines':
			return array_values( (array) $value );
		case 'wysiwyg':
			return $value ? wpautop( (string) $value ) : '';
		case 'number':
			return is_numeric( $value ) ? $value + 0 : null;
		case 'checkbox':
			return (bool) $value;
		default:
			return null === $value ? '' : (string) $value;
	}
}

function image_data( int $id ): ?array {
	if ( ! $id ) {
		return null;
	}
	$src = wp_get_attachment_image_src( $id, 'full' );
	if ( ! $src ) {
		return null;
	}
	return array(
		'id'      => $id,
		'url'     => $src[0],
		'width'   => (int) $src[1],
		'height'  => (int) $src[2],
		'alt'     => (string) get_post_meta( $id, '_wp_attachment_image_alt', true ),
		'caption' => (string) wp_get_attachment_caption( $id ),
	);
}

function video_data( int $id ): ?array {
	$url = $id ? wp_get_attachment_url( $id ) : false;
	if ( ! $url ) {
		return null;
	}
	$meta = wp_get_attachment_metadata( $id );
	return array(
		'id'       => $id,
		'url'      => $url,
		'mimeType' => (string) get_post_mime_type( $id ),
		'width'    => isset( $meta['width'] ) ? (int) $meta['width'] : null,
		'height'   => isset( $meta['height'] ) ? (int) $meta['height'] : null,
	);
}
