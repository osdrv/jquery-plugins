var expecting_callback = null;
;(function($) {
	var _is_auth = false;
	var config_wwwdomain = 'http://' + document.domain;
	$.authJacket = function(_callback, _context) {
		
		if (_context === undefined)
			_context = (window === undefined) ? window : document.window;
		if (_is_auth) {
			_callback.call(_context);
		} else {
			$.getJSON(
				config_wwwdomain + "/ajax/userservice/?cmd=islogged",
				function(_data) {
					if (_data !== undefined) {
						if (_data.status == 1) {
							_is_auth = true;
							_callback.call(_context);
						} else {
							expecting_callback = function() {
								_is_auth = true;
								_callback.call(_context);
							};
							$.modal({
								loadUrl: '/user/login/?silent=1'
							})
						}
					}
				}
			);
		}
	}
})(jQuery);