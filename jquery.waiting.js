(function($) {
	$.sleep = function(options) { return $.sleep.issue.init(options); };
	$.fn.sleep = function(options) { return $.sleep.issue.init(this, options); };
	$.wakeup = function(options) { return $.sleep.issue.destroy(); };
	$.fn.wakeup = function(options) { return $.sleep.issue.destroy(this); };
	
	$.sleep.defaults = {
		idle_icon: '/sf/progress.gif',
		shroud_css: {
			'opacity': '0.5',
			'position': 'absolute',
			'background-color': '#FFFFFF',
			'vertical-align': 'middle',
			'text-align': 'center'
		},
		vertical_offset: null
	};
	
	$.sleep.issue = {
		config: null,
		init: function(obj, options) {
			
			if (typeof(options) != 'undefined')  options.shroud_css = $.extend({}, $.sleep.defaults.shroud_css, options.shroud_css);
			this.config = $.extend({}, $.sleep.defaults, options);
			this.z_index = this.config.z_index;
			obj = obj instanceof jQuery ? obj : $(obj);
			if (obj.position() == undefined) { return obj };
			var left = obj.position().left + parseInt(obj.css('margin-left')),
				top = obj.position().top + parseInt(obj.css('margin-top')),
				top = obj.position().top + parseInt(obj.css('margin-top')),
				width = obj.width() + parseInt(obj.css('padding-left')) + parseInt(obj.css('padding-right')),
				height = obj.height() + parseInt(obj.css('padding-top')) + parseInt(obj.css('padding-bottom')),
				parent = obj.parent(),
				top_offset = (options !== undefined && options.vertical_offset !== undefined) ? parseInt(options.vertical_offset, 10) : (Math.round(height / 2) - 16);
			shroud = $('<div/>')
				.css({ left: left, top: top, width: width, height: height })
				.css(this.config.shroud_css)
				.addClass('jq-idle-shroud')
				.append(
					$('<img/>')
						.addClass('jq-idle-icon')
						.attr('src', this.config.idle_icon).
						css({ 'top': top_offset, 'position': 'relative' })
				)
				.appendTo(parent);
			return obj;
		},
		
		destroy: function(obj) {
			obj = obj instanceof jQuery ? obj : $(obj);
			obj.parent().children('.jq-idle-shroud').remove();
			return obj;
		}
	}
})(jQuery);