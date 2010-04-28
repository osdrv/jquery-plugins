var config_wwwdomain = 'http://' + document.domain;
var expecting_callback = null;
(function($) {
	var self = this;
	self._is_authorized = false;
	$.fn.authBind = function(type, handler) { return $._auth_bind.init(this, type, handler); }
	
	$._auth_bind = {
		init: function(obj, type, handler) {
			obj = obj instanceof jQuery ? obj : $(obj);
			obj.bind(type, function(event) {
				var _el = $(this);
				if (self._is_authorized) {
					handler.call(_el, event);
				} else {
					event.stopImmediatePropagation();
					event.preventDefault();
					var callback = (function(object) {
						return function() {
							self._is_authorized = true;
							var e = new jQuery.Event(type);
							object.trigger(e);
						}
					})(_el);
					$.getJSON(
						config_wwwdomain + "/ajax/userservice/?cmd=islogged",
						function(data){
							//$.modal('close');
							if (data.status == 1) {
								callback();
							}
							else {
								expecting_callback = callback;
								$.modal({
									loadUrl: '/user/login/?silent=1',
									noScroll: true,
									placeInCenter: true
								})
							}
						}
					);
				}
			});
			return obj;
		}
	}		
})(jQuery);
var expecting_callback = null;