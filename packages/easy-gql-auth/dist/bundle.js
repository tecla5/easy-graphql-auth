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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    }, b.p = '', b(b.s = 3);
  }([function (a, b) {
    'use strict';
    Object.defineProperty(b, '__esModule', { value: !0 }), b.default = { auth0IdTokenKeyName: 'auth0Token', gqlServerTokenStorageKey: 'graphCoolToken' };
  }, function (a, b) {
    'use strict';
    function d(h, j) {
      if (!(h instanceof j)) throw new TypeError('Cannot call a class as a function');
    }Object.defineProperty(b, '__esModule', { value: !0 });var f = function () {
      function h(j, k) {
        for (var m, l = 0; l < k.length; l++) {
          m = k[l], m.enumerable = m.enumerable || !1, m.configurable = !0, 'value' in m && (m.writable = !0), Object.defineProperty(j, m.key, m);
        }
      }return function (j, k, l) {
        return k && h(j.prototype, k), l && h(j, l), j;
      };
    }();b.createStore = function (h) {
      var j = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {};return new g(h, j);
    };var g = b.Store = function () {
      function h(j) {
        var k = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};d(this, h), this.keyNames = j.storage || j, this.storage = k.storage || k.keyStore || localStorage, this.auth0IdTokenKeyName = this.keyNames.auth0IdTokenKeyName, this.gqlServerTokenKeyName = this.keyNames.gqlServerTokenKeyName;
      }return f(h, [{ key: 'removeItem', value: function value(k) {
          this.storage.removeItem(k);
        } }, { key: 'getItem', value: function value(k) {
          return this.storage.getItem(k);
        } }, { key: 'setItem', value: function value(k, l) {
          this.storage.setItem(k, l);
        } }, { key: 'validateKeyNames', value: function value() {
          for (var k = this, l = arguments.length, m = Array(l), n = 0; n < l; n++) {
            m[n] = arguments[n];
          }m.map(function (o) {
            return k.validateKeyName(o);
          });
        } }, { key: 'validateKeyName', value: function value(k) {
          return 'string' != typeof this.keyNames[k] && this.error('keyNames missing ' + k), this;
        } }, { key: 'error', value: function value(k) {
          console.error(k);
        } }, { key: 'resetAll', value: function value() {
          this.removeItem(this.auth0TokenKeyName), this.removeItem(this.gqlServerTokenKeyName);
        } }, { key: 'getAll', value: function value() {
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};return { auth0Token: this.getItem(this.auth0IdTokenKeyName), gqlServerToken: this.getItem(this.gqlServerTokenKeyName) };
        } }, { key: 'store', value: function value(k, l) {
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};if (0 > this.keyNames.indexOf(k)) throw Error('keyname mismatch for store: ' + k);this.setItem(k, l);
        } }]), h;
    }();
  }, function (a, b, c) {
    'use strict';
    function e(m, n) {
      if (!(m instanceof n)) throw new TypeError('Cannot call a class as a function');
    }Object.defineProperty(b, '__esModule', { value: !0 }), b.Configurable = void 0;var f = 'function' == typeof Symbol && 'symbol' == _typeof(Symbol.iterator) ? function (m) {
      return typeof m === 'undefined' ? 'undefined' : _typeof(m);
    } : function (m) {
      return m && 'function' == typeof Symbol && m.constructor === Symbol && m !== Symbol.prototype ? 'symbol' : typeof m === 'undefined' ? 'undefined' : _typeof(m);
    },
        g = function () {
      function m(n, o) {
        for (var q, p = 0; p < o.length; p++) {
          q = o[p], q.enumerable = q.enumerable || !1, q.configurable = !0, 'value' in q && (q.writable = !0), Object.defineProperty(n, q.key, q);
        }
      }return function (n, o, p) {
        return o && m(n.prototype, o), p && m(n, p), n;
      };
    }(),
        h = c(0),
        j = function (m) {
      return m && m.__esModule ? m : { default: m };
    }(h),
        k = c(1),
        l = b.Configurable = function () {
      function m() {
        var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};e(this, m), this.validate(n);var p = n.keyNames,
            q = n.store,
            r = n.storage;this.config = n, this.io = o.io || console, this.logging = o.logging, this.observers = {}, this.config = n, this.storage = r, this.keyNames = p || r || j.default, this.store = q || this.defaultCreateStore(this.keyNames, o), this.tokens = this.store.getAll(), this.tokens = this.store ? this.store.getAll() : n.tokens;
      }return g(m, [{ key: 'on', value: function value(o, p) {
          this.log('on', o, p);var q = this.observers[o] || [];return this.observers[o] = q.concat(p), this;
        } }, { key: 'publish', value: function value(o, p) {
          this.log('publish', o, p);var q = this.observers[o] || [];return q ? q.map(function (r) {
            return r(p);
          }) : this.log('no observers registered for', o), this;
        } }, { key: 'handleError', value: function value(o) {
          throw this.error(o), o;
        } }, { key: 'enableLog', value: function value() {
          return this.logging = !0, this;
        } }, { key: 'disableLog', value: function value() {
          return this.logging = !1, this;
        } }, { key: 'log', value: function value() {
          if (this.logging) {
            for (var o, p = arguments.length, q = Array(p), r = 0; r < p; r++) {
              q[r] = arguments[r];
            }(o = this.io).log.apply(o, ['Lock'].concat(q));
          }
        } }, { key: 'error', value: function value() {
          if (this.logging) {
            for (var o, p = arguments.length, q = Array(p), r = 0; r < p; r++) {
              q[r] = arguments[r];
            }(o = this.io).error.apply(o, ['Lock'].concat(q));
          }
        } }, { key: 'defaultCreateStore', value: function value(o, p) {
          return new k.Store(o, p);
        } }, { key: 'validate', value: function value(o) {
          if ('object' !== ('undefined' == typeof o ? 'undefined' : f(o))) throw Error('config must be an object');
        } }]), m;
    }();
  }, function (a, b, c) {
    'use strict';
    Object.defineProperty(b, '__esModule', { value: !0 });var d = c(2);Object.defineProperty(b, 'Configurable', { enumerable: !0, get: function get() {
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLAuth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createGraphQLAuth = createGraphQLAuth;

var _tokenFoundation = __webpack_require__(0);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphQLAuth = exports.GraphQLAuth = function (_Configurable) {
  _inherits(GraphQLAuth, _Configurable);

  function GraphQLAuth(config) {
    _classCallCheck(this, GraphQLAuth);

    return _possibleConstructorReturn(this, (GraphQLAuth.__proto__ || Object.getPrototypeOf(GraphQLAuth)).call(this, config));
  }

  _createClass(GraphQLAuth, [{
    key: 'extractSignedInUserToken',
    value: function extractSignedInUserToken(signinResult) {
      return signinResult.data.signinUser.token;
    }
  }, {
    key: 'setGraphQLServerToken',
    value: function setGraphQLServerToken(signinToken) {
      // set graphcool token in localstorage
      this.store.setItem(this.gqlServerTokenKeyName, signinToken);
      return this;
    }
  }, {
    key: 'signin',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
        var auth0Token, profile, created, signinResult, signinToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                auth0Token = data.auth0Token, profile = data.profile;

                this.log('Signing into GraphQL server');
                _context.next = 4;
                return this.doCreateUser(data);

              case 4:
                created = _context.sent;
                _context.next = 7;
                return this.doSigninUser(data);

              case 7:
                signinResult = _context.sent;
                signinToken = this.extractSignedInUserToken(signinResult);

                this.setGraphQLServerToken(signinToken);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signin(_x) {
        return _ref.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: 'handleQueryError',
    value: function handleQueryError(err) {
      if (!err.graphQLErrors || err.graphQLErrors[0].code !== errorCode.USER_ALREADY_EXISTS) {
        this.handleError(err);
      }
    }
  }, {
    key: 'buildUserData',
    value: function buildUserData(data) {
      var auth0Token = data.auth0Token,
          profile = data.profile;

      return {
        variables: {
          authToken: auth0Token,
          name: profile.name
        }
      };
    }
  }, {
    key: 'doCreateUser',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data) {
        var auth0Token, profile, userData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                auth0Token = data.auth0Token, profile = data.profile;
                // create user if necessary

                _context2.prev = 1;

                this.log('Create user', name);
                userData = this.buildUserData(data);

                if (!this.queries.createUser) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return this.queries.createUser(userData);

              case 7:
                _context2.next = 12;
                break;

              case 9:
                this.log('missing createUser query, faking it');
                _context2.next = 12;
                return this.fakeCreateUser(userData);

              case 12:
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](1);

                this.handleQueryError(_context2.t0);

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 14]]);
      }));

      function doCreateUser(_x2) {
        return _ref2.apply(this, arguments);
      }

      return doCreateUser;
    }()

    // TODO: simulate GraphCool query mutation result?

  }, {
    key: 'fakeCreateUser',
    value: function fakeCreateUser(userData) {
      return userData;
    }
  }, {
    key: 'buildSigninUserData',
    value: function buildSigninUserData(_ref3) {
      var auth0Token = _ref3.auth0Token,
          profile = _ref3.profile;

      return {
        variables: {
          authToken: auth0Token
        }
      };
    }

    // sign in user

  }, {
    key: 'doSigninUser',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data) {
        var auth0Token, profile, userData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                auth0Token = data.auth0Token, profile = data.profile;

                this.log('signin user', data);

                if (this.queries.signinUser) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', this.fakeSigninUser(profile));

              case 4:
                userData = this.buildSigninUserData(data);
                _context3.next = 7;
                return this.queries.signinUser(userData);

              case 7:
                return _context3.abrupt('return', _context3.sent);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function doSigninUser(_x3) {
        return _ref4.apply(this, arguments);
      }

      return doSigninUser;
    }()
  }, {
    key: 'fakeSigninUser',
    value: function fakeSigninUser(profile) {
      this.log('returning fake signedinUser');
      return {
        data: {
          signinUser: {
            token: '1234'
          }
        }
      };
    }
  }, {
    key: 'gqlServerTokenKeyName',
    get: function get() {
      return this.store.gqlServerTokenKeyName;
    }
  }]);

  return GraphQLAuth;
}(_tokenFoundation.Configurable);

function createGraphQLAuth(config) {
  new GraphQLAuth(config);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLConnection = undefined;

var _tokenFoundation = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphQLConnection = exports.GraphQLConnection = function (_Configurable) {
  _inherits(GraphQLConnection, _Configurable);

  function GraphQLConnection() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GraphQLConnection);

    var _this = _possibleConstructorReturn(this, (GraphQLConnection.__proto__ || Object.getPrototypeOf(GraphQLConnection)).call(this, config));

    _this.connection = config.gqlServer.connection;
    return _this;
  }

  return GraphQLConnection;
}(_tokenFoundation.Configurable);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = __webpack_require__(1);

Object.defineProperty(exports, 'GraphQLAuth', {
  enumerable: true,
  get: function get() {
    return _auth.GraphQLAuth;
  }
});

var _connection = __webpack_require__(2);

Object.defineProperty(exports, 'GraphQLConnection', {
  enumerable: true,
  get: function get() {
    return _connection.GraphQLConnection;
  }
});

/***/ }),
/* 4 */
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