/* ALMA Headless — media pickers, repeaters and conditional fields. */
(function ($) {
	'use strict';

	/* ---------------------------------------------------------------- Media */

	function escapeHtml(text) {
		return $('<div>').text(text || '').html();
	}

	function mediaItemHtml(att) {
		var preview;
		if (att.type === 'image') {
			var size = att.sizes && (att.sizes.thumbnail || att.sizes.medium);
			preview = '<img src="' + escapeHtml(size ? size.url : att.url) + '" alt="">';
		} else {
			preview = '<span class="dashicons dashicons-video-alt3"></span><span class="alma-media-name">' + escapeHtml(att.filename || att.title) + '</span>';
		}
		return '<li class="alma-media-item" data-id="' + att.id + '">' + preview +
			'<button type="button" class="alma-media-remove" aria-label="Remove">&times;</button></li>';
	}

	function syncMedia($wrap) {
		var ids = $wrap.find('.alma-media-item').map(function () { return $(this).data('id'); }).get();
		var max = parseInt($wrap.data('max'), 10) || 0;
		$wrap.find('.alma-media-input').val(ids.join(',')).trigger('change');
		$wrap.toggleClass('is-full', max > 0 && ids.length >= max);
	}

	$(document).on('click', '.alma-media-select', function (e) {
		e.preventDefault();
		var $wrap = $(this).closest('.alma-media');
		var type = $wrap.data('type');
		var multiple = type === 'gallery';
		var max = parseInt($wrap.data('max'), 10) || 0;

		var frame = wp.media({
			title: $(this).text(),
			button: { text: 'Use selected' },
			multiple: multiple ? 'add' : false,
			library: { type: type === 'video' ? 'video' : 'image' }
		});

		frame.on('select', function () {
			var $list = $wrap.find('.alma-media-preview');
			var selection = frame.state().get('selection').toJSON();
			var limitHit = false;

			if (!multiple) {
				$list.empty();
				selection = selection.slice(0, 1);
			}
			var existing = $list.find('.alma-media-item').map(function () { return $(this).data('id'); }).get();

			selection.forEach(function (att) {
				if (existing.indexOf(att.id) !== -1) return;
				if (max && $list.children().length >= max) {
					limitHit = true;
					return;
				}
				$list.append(mediaItemHtml(att));
			});

			if (limitHit) {
				window.alert('You can add up to ' + max + ' images. The extra images were not added.');
			}
			syncMedia($wrap);
		});

		frame.open();
	});

	$(document).on('click', '.alma-media-remove', function () {
		var $wrap = $(this).closest('.alma-media');
		$(this).closest('.alma-media-item').remove();
		syncMedia($wrap);
	});

	function initSortable(context) {
		$(context).find('.alma-media[data-type="gallery"] .alma-media-preview').sortable({
			items: '> .alma-media-item',
			update: function () { syncMedia($(this).closest('.alma-media')); }
		});
	}

	/* ------------------------------------------------------------ Repeaters */

	function syncRepeater($rep) {
		var max = parseInt($rep.data('max'), 10) || 0;
		var count = $rep.children('.alma-repeater-rows').children().length;
		$rep.children('.alma-repeater-add').prop('disabled', max > 0 && count >= max);
	}

	$(document).on('click', '.alma-repeater-add', function () {
		var $rep = $(this).closest('.alma-repeater');
		var html = $rep.children('.alma-repeater-template').html().replace(/__INDEX__/g, String(Date.now()));
		var $row = $(html).appendTo($rep.children('.alma-repeater-rows'));
		initSortable($row);
		syncRepeater($rep);
		$row.find('input, textarea').first().trigger('focus');
	});

	$(document).on('click', '.alma-repeater-remove', function () {
		var $rep = $(this).closest('.alma-repeater');
		$(this).closest('.alma-repeater-row').remove();
		syncRepeater($rep);
	});

	$(document).on('click', '.alma-repeater-up', function () {
		var $row = $(this).closest('.alma-repeater-row');
		$row.prev('.alma-repeater-row').before($row);
	});

	$(document).on('click', '.alma-repeater-down', function () {
		var $row = $(this).closest('.alma-repeater-row');
		$row.next('.alma-repeater-row').after($row);
	});

	/* ------------------------------------------------- Conditional fields */

	function currentValue(name) {
		var $inputs = $('[name="' + name + '"]');
		return $inputs.is(':radio') ? $inputs.filter(':checked').val() : $inputs.val();
	}

	function applyConditions() {
		$('[data-condition-field]').each(function () {
			var $row = $(this);
			$row.toggle(currentValue($row.data('condition-field')) === String($row.data('condition-value')));
		});
	}

	// Remember the checked radio so a declined confirmation can restore it.
	$(document).on('focus mousedown', '.alma-radio input[type="radio"]', function () {
		$(this).closest('.alma-radio').data('previous', $(this).closest('.alma-radio').find(':checked').val());
	});

	$(document).on('change', '.alma-radio input[type="radio"]', function () {
		var $radio = $(this);
		var message = $radio.data('confirm');
		var $group = $radio.closest('.alma-radio');

		if (message && !window.confirm(message)) {
			$group.find('input[value="' + $group.data('previous') + '"]').prop('checked', true);
		}
		applyConditions();
	});

	$(function () {
		initSortable(document);
		$('.alma-repeater').each(function () { syncRepeater($(this)); });
		applyConditions();
	});
})(jQuery);
