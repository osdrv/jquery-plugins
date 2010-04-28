(function($) {
	$.widget("ui.customFile", {
		_init: function() {
			if (navigator.userAgent.indexOf('MSIE 6') >= 0) return;
			var e = this.element, o = this.options;
			e.addClass('ui-custom-input-file').attr('size', 1);
			var c = $('<div />').addClass('ui-custom-file-container').insertBefore(e).append(e);
			var fn = $('<div />').addClass('ui-custom-file-filename');
			var r_j = $('<div />').addClass('custom-input-holder input');
			r_j.append($('<div />').addClass('left-side'));
			r_j.append($('<div />').addClass('text-holder').append(fn));
			r_j.append($('<div />').addClass('right-side'));
			r_j.appendTo(c);
			var b = $('<div />').addClass('ui-custom-file-button').appendTo(c);
			e.val('')
				.hover(
					function(_e) { b.addClass('ui-custom-file-button-active'); },
					function(_e) { b.removeClass('ui-custom-file-button-active'); }
				)
				.change(
					function(_e) {
						var name = e.val();
						var fileTitle = name.replace(/.*\\(.*)/, "$1");
						fileTitle = fileTitle.replace(/.*\/(.*)/, "$1");
						fn.html(fileTitle);
						if (typeof(o.onChange) == 'function') { o.onChange.call(e, _e); }
					}
				);
		}
	});
	$.extend($.ui.customFile, { defaults: { onChange: null } });
})(jQuery);