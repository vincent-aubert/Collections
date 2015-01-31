(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore'], function (_) {
			return (root.returnExportsGlobal = factory(_));
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(require('underscore'));
	} else {
		root.Collection = factory(root._);
	}
}(this, function (_) {

	var Collection = Array;

	Collection.extend = function (options) {
		var self = this;
		return function () {
			var Klass = new self();
			Klass.model = options.model;
			return Klass;
		};
	};

	Collection.prototype = (function () {
		var buffer = Array.prototype;
		for (var i in _) {
			if (_.isFunction(_[i])) {
				buffer[i] = (function (fn) {
					return function () {
						var args = Array.prototype.slice.call(arguments);
						args.unshift(this);
						return _[fn].apply(null, args);
					};
				})(i);
			}
		}
		_.extend(buffer, {
			add: function (options) {
				this.push(new (this.model)(options));
				return this;
			},
			removeWhere: function (options) {
				var obj = this.where(options);
				obj.each(function (o, i) {
					this.removeByIndex(this.indexOf(o), 1);
				}.bind(this));
				return this;
			},
			removeByIndex: function (index) {
				this.splice(index, 1);
				return this;
			}
		});
		return buffer;
	})();

	return Collection;
}));
