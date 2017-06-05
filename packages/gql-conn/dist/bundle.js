(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["easyGqlAuth"] = factory();
	else
		root["easyGqlAuth"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLConnection = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tokenFoundation = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphQLConnection = exports.GraphQLConnection = function (_Configurable) {
  _inherits(GraphQLConnection, _Configurable);

  function GraphQLConnection() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GraphQLConnection);

    var _this = _possibleConstructorReturn(this, (GraphQLConnection.__proto__ || Object.getPrototypeOf(GraphQLConnection)).call(this, config, opts));

    _this.name = 'GraphQLConnection';
    _this.configure();
    return _this;
  }

  _createClass(GraphQLConnection, [{
    key: 'configure',
    value: function configure() {
      var config = this.config;

      var gqlServer = config.gqlServer;
      gqlServer.endpoint = gqlServer.endpoint || gqlServer.connection.uri;

      this.config.gqlServer = gqlServer;
      this.validateConfig();
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig() {
      if (_typeof(this.store) !== 'object') {
        this.configError('missing store for holding signinToken from GraphQL server');
      }

      if (_typeof(this.keyNames) !== 'object') {
        this.configError('missing keyNames object, used to indicate store token keys');
      }
    }
  }, {
    key: 'setJwtToken',
    value: function setJwtToken(signinToken) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.log('setJwtToken not yet implemented on GraphQL server Connection :(', {
        signinToken: signinToken
      });
    }
  }, {
    key: 'defaultHeaders',
    get: function get() {
      return null;
    }
  }, {
    key: 'authTokenKeyName',
    get: function get() {
      return this.keyNames.gqlServerTokenKeyName;
    }
  }, {
    key: 'authToken',
    get: function get() {
      return this.store.getItem(this.authTokenKeyName) || null;
    }
  }]);

  return GraphQLConnection;
}(_tokenFoundation.Configurable);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gqlConnection = __webpack_require__(0);

Object.defineProperty(exports, 'GraphQLConnection', {
  enumerable: true,
  get: function get() {
    return _gqlConnection.GraphQLConnection;
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (b, c) {
  'object' == ( false ? 'undefined' : _typeof(exports)) && 'object' == ( false ? 'undefined' : _typeof(module)) ? module.exports = c() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (c),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? exports.tokenFoundation = c() : b.tokenFoundation = c();
})(undefined, function () {
  return function (a) {
    function b(d) {
      if (c[d]) return c[d].exports;var e = c[d] = { i: d, l: !1, exports: {} };return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports;
    }var c = {};return b.m = a, b.c = c, b.i = function (d) {
      return d;
    }, b.d = function (d, e, f) {
      b.o(d, e) || Object.defineProperty(d, e, { configurable: !1, enumerable: !0, get: f });
    }, b.n = function (d) {
      var e = d && d.__esModule ? function () {
        return d['default'];
      } : function () {
        return d;
      };return b.d(e, 'a', e), e;
    }, b.o = function (d, e) {
      return Object.prototype.hasOwnProperty.call(d, e);
    }, b.p = '', b(b.s = 4);
  }([function (a, b) {
    'use strict';
    Object.defineProperty(b, '__esModule', { value: !0 }), b.default = { auth0IdTokenKeyName: 'auth0Token', gqlServerTokenStorageKey: 'graphCoolToken' }, a.exports = b['default'];
  }, function (a, b, c) {
    'use strict';
    function d(l, m) {
      if (!(l instanceof m)) throw new TypeError('Cannot call a class as a function');
    }function e(l, m) {
      if (!l) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return m && ('object' == (typeof m === 'undefined' ? 'undefined' : _typeof(m)) || 'function' == typeof m) ? m : l;
    }function f(l, m) {
      if ('function' != typeof m && null !== m) throw new TypeError('Super expression must either be null or a function, not ' + (typeof m === 'undefined' ? 'undefined' : _typeof(m)));l.prototype = Object.create(m && m.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(l, m) : l.__proto__ = m);
    }Object.defineProperty(b, '__esModule', { value: !0 }), b.Store = void 0;var h = function () {
      function l(m, n) {
        for (var p, o = 0; o < n.length; o++) {
          p = n[o], p.enumerable = p.enumerable || !1, p.configurable = !0, 'value' in p && (p.writable = !0), Object.defineProperty(m, p.key, p);
        }
      }return function (m, n, o) {
        return n && l(m.prototype, n), o && l(m, o), m;
      };
    }();b.createStore = function (l) {
      var m = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {};return new k(l, m);
    };var j = c(2),
        k = b.Store = function (l) {
      function m(n) {
        var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};d(this, m);var p = e(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, 'Store', o));return p.log('create', { keyNames: n, opts: o }), p.keyNames = n.storage || n, p.storage = o.storage || o.keyStore || window.localStorage, p.authTokenKeyName = p.keyNames.authTokenKeyName, p.gqlServerTokenKeyName = p.keyNames.gqlServerTokenKeyName, p;
      }return f(m, l), h(m, [{ key: 'removeItem', value: function value(o) {
          this.storage.removeItem(o);
        } }, { key: 'getItem', value: function value(o) {
          return this.storage.getItem(o);
        } }, { key: 'setItem', value: function value(o, p) {
          this.storage.setItem(o, p);
        } }, { key: 'validateKeyNames', value: function value() {
          for (var o = this, p = arguments.length, q = Array(p), r = 0; r < p; r++) {
            q[r] = arguments[r];
          }q.map(function (s) {
            return o.validateKeyName(s);
          });
        } }, { key: 'validateKeyName', value: function value(o) {
          return 'string' != typeof this.keyNames[o] && this.error('keyNames missing ' + o), this;
        } }, { key: 'error', value: function value(o) {
          console.error(o);
        } }, { key: 'resetAll', value: function value() {
          this.removeItem(this.authTokenKeyName), this.removeItem(this.gqlServerTokenKeyName);
        } }, { key: 'getAll', value: function value() {
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};return { authToken: this.getItem(this.authTokenKeyName), gqlServerToken: this.getItem(this.gqlServerTokenKeyName) };
        } }, { key: 'store', value: function value(o, p) {
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};if (0 > this.keyNames.indexOf(o)) throw Error('keyname mismatch for store: ' + o);this.setItem(o, p);
        } }]), m;
    }(j.Loggable);
  }, function (a, b) {
    'use strict';
    function d(g, h) {
      if (!(g instanceof h)) throw new TypeError('Cannot call a class as a function');
    }Object.defineProperty(b, '__esModule', { value: !0 });var e = function () {
      function g(h, j) {
        for (var l, k = 0; k < j.length; k++) {
          l = j[k], l.enumerable = l.enumerable || !1, l.configurable = !0, 'value' in l && (l.writable = !0), Object.defineProperty(h, l.key, l);
        }
      }return function (h, j, k) {
        return j && g(h.prototype, j), k && g(h, k), h;
      };
    }(),
        f = b.Loggable = function () {
      function g(h) {
        var j = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};d(this, g), this.opts = j, this.io = j.io || console, this.logging = j.logging, this.name = h || j.name;
      }return e(g, [{ key: 'enableLog', value: function value() {
          return this.logging = !0, this;
        } }, { key: 'disableLog', value: function value() {
          return this.logging = !1, this;
        } }, { key: 'log', value: function value() {
          if (this.logging) {
            for (var j, k = arguments.length, l = Array(k), m = 0; m < k; m++) {
              l[m] = arguments[m];
            }(j = this.io).log.apply(j, [this.name].concat(l));
          }
        } }, { key: 'error', value: function value() {
          if (this.logging) {
            for (var j, k = arguments.length, l = Array(k), m = 0; m < k; m++) {
              l[m] = arguments[m];
            }(j = this.io).error.apply(j, [this.name].concat(l));
          }
        } }]), g;
    }();
  }, function (a, b, c) {
    'use strict';
    function e(q, r) {
      if (!(q instanceof r)) throw new TypeError('Cannot call a class as a function');
    }function f(q, r) {
      if (!q) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return r && ('object' == (typeof r === 'undefined' ? 'undefined' : _typeof(r)) || 'function' == typeof r) ? r : q;
    }function g(q, r) {
      if ('function' != typeof r && null !== r) throw new TypeError('Super expression must either be null or a function, not ' + (typeof r === 'undefined' ? 'undefined' : _typeof(r)));q.prototype = Object.create(r && r.prototype, { constructor: { value: q, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(q, r) : q.__proto__ = r);
    }function h(q) {
      return 'function' == typeof q;
    }Object.defineProperty(b, '__esModule', { value: !0 }), b.Configurable = void 0;var j = 'function' == typeof Symbol && 'symbol' == _typeof(Symbol.iterator) ? function (q) {
      return typeof q === 'undefined' ? 'undefined' : _typeof(q);
    } : function (q) {
      return q && 'function' == typeof Symbol && q.constructor === Symbol && q !== Symbol.prototype ? 'symbol' : typeof q === 'undefined' ? 'undefined' : _typeof(q);
    },
        k = function () {
      function q(r, s) {
        for (var u, t = 0; t < s.length; t++) {
          u = s[t], u.enumerable = u.enumerable || !1, u.configurable = !0, 'value' in u && (u.writable = !0), Object.defineProperty(r, u.key, u);
        }
      }return function (r, s, t) {
        return s && q(r.prototype, s), t && q(r, t), r;
      };
    }(),
        l = c(0),
        m = function (q) {
      return q && q.__esModule ? q : { default: q };
    }(l),
        n = c(2),
        o = c(1),
        p = b.Configurable = function (q) {
      function r() {
        var s = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};e(this, r);var u = f(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, 'Configurable', t));return u.validate(s), u.log('configuring with', { config: s, opts: t }), u.opts = u.opts || t, u.config = s, u.configure(), u;
      }return g(r, q), k(r, [{ key: 'configure', value: function value() {
          return this.log('configure'), this.observers = {}, this.configureStorage(), this.validateConfig(), this.retrieveTokens(), this;
        } }, { key: 'configureStorage', value: function value() {
          var t = this.config,
              u = this.opts;return this.log('configureStorage'), this.extractProperties([t, u], 'storage', 'keyNames', 'store'), this.keyNames = this.keyNames || this.storage || m.default, this.store = this.store || this.createStore(), this;
        } }, { key: 'validateConfig', value: function value() {
          this.store || this.configError('Missing store. Was not configured!');
        } }, { key: 'retrieveTokens', value: function value() {
          this.log('retrieveTokens', { store: this.store }), h(this.store.getAll) || this.error('Store is missing function getAll to retrieve tokens'), this.tokens = this.store.getAll() || {};
        } }, { key: 'extractProperty', value: function value(t, u, v) {
          var w = t.find(function (y) {
            return (y || {})[u];
          }) || {},
              x = w[u];return v && x && (this[u] = x), x;
        } }, { key: 'extractProperties', value: function value(t) {
          for (var u = this, v = arguments.length, w = Array(1 < v ? v - 1 : 0), x = 1; x < v; x++) {
            w[x - 1] = arguments[x];
          }return w.reduce(function (y, z) {
            var A = u.extractProperty(t, z, !0);return y[z] = A, y;
          }, {});
        } }, { key: 'configError', value: function value(t) {
          throw this.error(t), Error(t);
        } }, { key: 'on', value: function value(t, u) {
          this.log('on', t, u);var v = this.observers[t] || [];return this.observers[t] = v.concat(u), this;
        } }, { key: 'publish', value: function value(t, u) {
          this.log('publish', t, u);var v = this.observers[t] || [];return v ? v.map(function (w) {
            return w(u);
          }) : this.log('no observers registered for', t), this;
        } }, { key: 'handleError', value: function value(t) {
          throw this.error(t), t;
        } }, { key: 'createStore', value: function value(t) {
          var u = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
              v = u,
              s = v.createStore;return t = t || this.keyNames, u = u || this.opts, this.log('createStore', { keyNames: t, opts: u }), s = h(s) ? s : this.defaultCreateStore, this.log('create with', { createStore: s }), s(t, u);
        } }, { key: 'defaultCreateStore', value: function value(t, u) {
          return new o.Store(t, u);
        } }, { key: 'validate', value: function value(t) {
          if ('object' !== ('undefined' == typeof t ? 'undefined' : j(t))) throw Error('config must be an object');
        } }]), r;
    }(n.Loggable);
  }, function (a, b, c) {
    'use strict';
    Object.defineProperty(b, '__esModule', { value: !0 });var d = c(3);Object.defineProperty(b, 'Configurable', { enumerable: !0, get: function get() {
        return d.Configurable;
      } });var e = c(0);Object.defineProperty(b, 'keyNames', { enumerable: !0, get: function get() {
        return e.keyNames;
      } });var f = c(1);Object.defineProperty(b, 'Store', { enumerable: !0, get: function get() {
        return f.Store;
      } }), Object.defineProperty(b, 'createStore', { enumerable: !0, get: function get() {
        return f.createStore;
      } });
  }]);
});
//# sourceMappingURL=bundle.prod.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map