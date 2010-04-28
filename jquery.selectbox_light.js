/**
 * jQuery selectbox lite plugin. Minimal dom manipulation. Quite functional.
 * You are welcome to minify it!
 * Author: Oleg Sidorov <o.s.sidorov@gmail.com>
 */
$.fn.selectbox = function() {
	var _init = function() {
		var _select = function() {
			var _li = $(this), _dropdown = _li.closest('.dropdown-list'), _current_item = _dropdown.siblings('.current-label'), _select = _dropdown.siblings('select');
			_dropdown.find('li').removeClass('item-current').end().hide();
			_current_item.children('span').html(_li.addClass('item-current').text());
			if (_select.val() != _li.attr('option_value')) _select.val(_li.attr('option_value')).trigger('change');
		}
		var _toggle_drop_list = function() {$(this).siblings('.dropdown-list').toggle();}
		var _select_context = '', _options = $(this).children('option');
		if ($(this).hasClass('custom-select') || !_options.length) return;
		$(this).addClass('custom-select');
		$(this).wrap('<div class="custom-select-holder"></div>');
		var _max_str_len = 0, _selected_value = _options.eq(0).text(), _selected_value_index = 0;
		for (var _i = 0; _i < _options.length; _i++) {
			var _current_option = _options.eq(_i), _current_option_label_len = _current_option.text().length;
			var _val = _current_option.attr('value');
			_val = _val ? _val : _current_option.text();
			if ((_val) == $(this).val()) {_selected_value = _current_option.text();_selected_value_index = _i;}
			_max_str_len = _current_option_label_len > _max_str_len ? _current_option_label_len : _max_str_len;
			_select_context += '<li option_value="' + _val + '">' + _current_option.text() + '</li>';
		}
		var _current_label = '<div class="current-label"><span>' + _selected_value + '</span></div><div class="dropdown-button"></div>'
		_select_context = '<ul>' + _select_context + '</ul>';
		var _dropdown = $('<div />').addClass('dropdown-list').html(_select_context);
		_max_str_len *= 0.75;
		_dropdown.children().eq(0).children('li').click(_select).hover(function(_e){$(this).addClass('item-selected')}, function(_e){$(this).removeClass('item-selected')}).eq(_selected_value_index).addClass('item-current');
		$(this).parent().click(function(_e){_e.stopPropagation()}).css({'width': _max_str_len + 2 + 'em'}).append(_current_label).children('.current-label').click(_toggle_drop_list).css({'width': (_max_str_len - 1) + 'em'}).end().append('<div style="clear: both;"/>').append(_dropdown.css({'width': (_max_str_len) + 'em'})).find('.dropdown-button').click(_toggle_drop_list);
		$(document).click(function(_e){_dropdown.hide()});
	};
	for (var _i = 0; _i < this.length; _i++) { _init.apply(this[_i], arguments); }
	return this;
};
$.fn.unselectbox = function() {
	var _init = function() {
		if (!$(this).hasClass('custom-select')) return;
		var _parent = $(this).closest('.custom-select-holder');
		_parent.replaceWith($(this).removeClass('custom-select').show());
	};
	for (var _i = 0; _i < this.length; _i++) { _init.apply(this[_i], arguments); }
	return this;
};