(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'exports'], function (_, exports) {
			root.Model = factory(root, _, exports);
		});
	} else if (typeof exports !== 'undefined') {
		var _ = require('underscore');
		factory(root, exports, _);
	} else {
		root.Model = factory(root, root._, {});
	}
}(this, function (root, _) {

	var guid = (function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return function () {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		};
	})();

	var Model = function (options) {
		this.uid = guid();
		_.extend(this, options);
	};

	Model.extend = function (options) {
		var self = this;
		return function (op) {
			var model = new self(options);
			return _.extend(_.clone(model), op);
		};
	};

	return Model;
}));
