(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore'], function (_) {
			return (root.returnExportsGlobal = factory(_));
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(require('underscore'));
	} else {
		root.Model = factory(root._);
	}
}(this, function (_) {

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
