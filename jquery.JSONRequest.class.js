/**
 * json request class
 */
var JSONRequest = function(options) {
	if (typeof(options) != 'object') {
		console.dir(options);
		throw ('Error: Invalid options data type.');
	}
	
	if (typeof(options.method) == 'undefined') {
		throw ('Error: No method argument given.');
	}
	
	if (typeof(options.params) != 'undefined' && !(options.params instanceof Array)) {
		throw ('Error: Invalid parameters data type given.');
	}
	
	var data = {
		method: options.method,
		params: options.params,
		id: Math.round(Math.random() * 1E06)
	}
	
	data = JSON.stringify(data, function(key, value) {return value });
	
	var _url = '/JSON/';

	if (options.url !== undefined)
		_url = options.url;

	$.ajax({
		url: _url,
		data: data,
		dataType: 'json',
		type: 'POST',
		cache: false,
		success: function(obj) {
			if (typeof(obj) != 'undefined') {
				var result = obj.result;
				var error = obj.error;
				var request_id = obj.id;
				if (typeof(error) != 'undefined' && error != null) {
					if (typeof(options.failure) == 'function') {
						options.failure(error);
					}
				}
				else if (typeof(options.success) == 'function') {
					options.success(result);
				}
			}
		},
		error: function(_xhr, _st, _err) {
			if (typeof(options.error) == 'function') {
				options.error(_xhr, _st, _err);
			}
		},
		dataType: 'json'
	});
};
