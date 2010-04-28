/**
 * Guide: http://4pcbr.blogspot.com/2009/02/js-chain-plugin.html
 */

var Chain = (function() {
	
	var self = this;
	
	this.storage = [];
	
	this.onFailure = null;
	
	return function() {
		this.addMethod = function(callback) {
			if (typeof(callback) == 'function') {
				self.storage.push(callback);
			} else {
				throw new Error('Invalid callback %s', callback);
			}
			
			return this;
		};
		
		this.execute = function(args) {
			if (!self.storage.length) {
				
				return true;
			}
			
			var current_method = self.storage.shift();
			if (!current_method(this, args)) {
				if (typeof(self.onFailure) == 'function') {
					self.onFailure();
				}
				self.storage = [];
			}
			
			return true;
		};
		
		this.isDone = function() {
			return self.storage.length > 0;
		};
		
		this.getRest = function() {
			return self.storage.length;
		}
		
		this.setOnFailure = function(callback) {
			if (typeof(callback) == 'function') {
				self.onFailure = callback;
			} else {
				throw new Error('Invalid callback %s', callback);
			}
			
			return this;
		}
	}
})();