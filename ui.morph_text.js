;(function($) {
	$.widget('ui.morph_text', {
		
		_inputOnBlur: function(_ev) {
		
			var _e = this.element, _o = this.options, self = this,
			_val = _e.val();
			_val = _val ? _val : _o.empty_label;
			
			this._label.html(_val).show();
			
			_e.hide();
			
			if (typeof(_o.onInputBlur) == 'function') {
			
				_o.onInputBlur.call(_e, _ev);
			}
		},
		
		_labelOnFocus: function(_ev) {
		
			var _e = this.element, _o = this.options;
			this._label.hide();
			this.element.show().select();
			
			if (typeof(_o.onLabelFocus) == 'function') {
				
				_o.onLabelFocus.call(_e, _ev);
			}
		},
		
		_init: function() {
			
			var _e = this.element,
			_o = this.options,
			self = this;
			this._label = $(_o.label_element).css(_o.label_css).insertAfter(_e).hide();
			
			if (!_e.filter('input:text, textarea').length) {
			
				return;
			}
			
			_e.blur(function(_ev) {
				
				self._inputOnBlur(_ev);
			});
			
			this._label.bind('focus, click', function(_ev) {
				
				self._labelOnFocus(_ev);
			});
			
			this._inputOnBlur();
		},
		
		setValue: function(_v) {
		
			this.element.val(_v);
			this._inputOnBlur(null);
		},
		
		setFocus: function() {
		
			this._labelOnFocus(null);
		}
	})
})(jQuery);

$.extend($.ui.morph_text, {
	defaults: {
		'empty_label': '___',
		'label_element': '<span />',
		'label_css': { 'cursor': 'pointer' },
		'onInputBlur': null,
		'onLabelFocus': null
	}
});