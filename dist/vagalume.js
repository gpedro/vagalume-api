'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _querystring = require('querystring');

var _dashify = require('dashify');

var _dashify2 = _interopRequireDefault(_dashify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var webBaseUrl = 'https://www.vagalume.com.br';
var apiBaseUrl = 'https://api.vagalume.com.br';

var Vagalume = function () {
	function Vagalume(apikey) {
		_classCallCheck(this, Vagalume);

		this.apikey = apikey;
	}

	_createClass(Vagalume, [{
		key: '_fetch',
		value: function _fetch(url) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			if (this.apikey && !params['apikey']) {
				params['apikey'] = this.apikey;
			}

			var qs = (0, _querystring.stringify)(params);
			return (0, _nodeFetch2.default)(url + '?' + qs).then(function (res) {
				return res.json();
			});
		}
	}, {
		key: 'artist',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_artist) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var slug;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								slug = (0, _dashify2.default)(_artist);
								return _context.abrupt('return', this._fetch(webBaseUrl + '/' + slug + '/index.js', options));

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function artist(_x2) {
				return _ref.apply(this, arguments);
			}

			return artist;
		}()
	}, {
		key: 'lyrics',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(options) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (options.musid && (options.art || options.mus)) {
									delete options.art;
									delete options.mus;
								}

								if (options.extra) {
									if (options.extra instanceof Array) {
										options.extra = options.extra.join(',');
									}
								}

								return _context2.abrupt('return', this._fetch(apiBaseUrl + '/search.php', options));

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function lyrics(_x4) {
				return _ref2.apply(this, arguments);
			}

			return lyrics;
		}()
	}, {
		key: 'search',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'art';
				var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
				var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								if (!(['art', 'excerpt', 'artmus', 'alb'].indexOf(type) === -1)) {
									_context3.next = 2;
									break;
								}

								throw new Error('Tipo inválido. Disponíveis: art, excerpt, artmus, alb');

							case 2:

								options.q = query || '';
								options.limit = limit || 5;

								return _context3.abrupt('return', this._fetch(apiBaseUrl + '/search.' + type, options));

							case 5:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function search() {
				return _ref3.apply(this, arguments);
			}

			return search;
		}()
	}, {
		key: 'discography',
		value: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(artist, options) {
				var slug;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								slug = (0, _dashify2.default)(artist);
								return _context4.abrupt('return', this._fetch(webBaseUrl + '/' + slug + '/discografia/index.js', options));

							case 2:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function discography(_x9, _x10) {
				return _ref4.apply(this, arguments);
			}

			return discography;
		}()
	}, {
		key: 'hotspots',
		value: function () {
			var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(options) {
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								return _context5.abrupt('return', this._fetch(apiBaseUrl + '/hotspots.php', options));

							case 1:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function hotspots(_x11) {
				return _ref5.apply(this, arguments);
			}

			return hotspots;
		}()
	}, {
		key: 'news',
		value: function () {
			var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(options) {
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								return _context6.abrupt('return', this._fetch(webBaseUrl + '/news/index.js', options));

							case 1:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function news(_x12) {
				return _ref6.apply(this, arguments);
			}

			return news;
		}()
	}, {
		key: 'artistImage',
		value: function () {
			var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(artistId) {
				var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
				var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								options.bandID = artistId;
								options.limit = limit || 3;
								return _context7.abrupt('return', this._fetch(apiBaseUrl + '/image.php', options));

							case 3:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function artistImage(_x13) {
				return _ref7.apply(this, arguments);
			}

			return artistImage;
		}()
	}]);

	return Vagalume;
}();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Vagalume;
} else {
	window.Vagalume = Vagalume;
}

//# sourceMappingURL=vagalume.js.map