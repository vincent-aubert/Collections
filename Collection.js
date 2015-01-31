(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'exports'], function (_, exports) {
			root.Collection = factory(root, _, exports);
		});
	} else if (typeof exports !== 'undefined') {
		var _ = require('underscore');
		factory(root, exports, _);
	} else {
		root.Collection = factory(root, root._, {});
	}
}(this, function (root, _) {

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
