(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gqlAuth"] = factory();
	else
		root["gqlAuth"] = factory();
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
exports.GraphQLAuth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createGraphQLAuth = createGraphQLAuth;

var _gqlConn = __webpack_require__(2);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createGraphQLAuth(config) {
  return new GraphQLAuth(config);
}

var GraphQLAuth = exports.GraphQLAuth = function (_GraphQLConnection) {
  _inherits(GraphQLAuth, _GraphQLConnection);

  function GraphQLAuth() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GraphQLAuth);

    var _this = _possibleConstructorReturn(this, (GraphQLAuth.__proto__ || Object.getPrototypeOf(GraphQLAuth)).call(this, config, opts));

    var createConnection = opts.clientConfig.createConnection;


    createConnection = createConnection || opts.createConnection;

    _this.connection = _this.connection || config.connection || opts.connection;
    if (createConnection) {
      _this.connection = _this.connection || createConnection(config, opts);
    }
    _this.validateConfig();
    return _this;
  }

  _createClass(GraphQLAuth, [{
    key: 'validateConfig',
    value: function validateConfig() {
      if (!this.connection) {
        this.configError('missing GraphQL connection in configuration');
      }
    }
  }, {
    key: 'extractSignedInUserToken',
    value: function extractSignedInUserToken(signinResult) {
      return signinResult.data.signinUser.token;
    }
  }, {
    key: 'setGraphQLServerToken',
    value: function setGraphQLServerToken(signinToken) {
      // set graphcool token in localstorage
      this.store.setItem(this.gqlServerTokenKeyName, signinToken);
      this.publish('storedGraphQLServerToken', {
        signinToken: signinToken
      });
      return this;
    }
  }, {
    key: 'signin',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
        var authToken, profile, created, signinResult, signinToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                authToken = data.authToken, profile = data.profile;

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

                this.handleReceivedGraphQLServerToken(signinToken);
                return _context.abrupt('return', {
                  status: signinResult,
                  token: signinToken
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signin(_x3) {
        return _ref.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: 'handleReceivedGraphQLServerToken',
    value: function handleReceivedGraphQLServerToken(signinToken) {
      this.publish('receivedGraphQLServerToken', {
        signinToken: signinToken
      });
      this.setGraphQLServerToken(signinToken);
      this.setJwtToken(signinToken);
    }
  }, {
    key: 'setJwtToken',
    value: function setJwtToken(signinToken) {
      if (this.connection) {
        this.connection.setJwtToken(signinToken, this.opts);
        this.publish('setJwtToken', {
          signinToken: signinToken
        });
      } else {
        this.error('missing connection for setting JWT token');
      }
    }
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
      var authToken = data.authToken,
          profile = data.profile;

      return {
        variables: {
          authToken: authToken,
          name: profile.name
        }
      };
    }
  }, {
    key: 'doCreateUser',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data) {
        var authToken, profile, _userData, _result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                authToken = data.authToken, profile = data.profile;
                // create user if necessary

                _context2.prev = 1;

                this.log('Create user', name);
                _userData = this.buildUserData(data);

                if (!this.queries.createUser) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 7;
                return this.doQuery({
                  query: this.queries.createUser(_userData)
                });

              case 7:
                _result = _context2.sent;

                publish('createdUserOK', {
                  authToken: authToken,
                  userData: _userData,
                  profile: profile,
                  result: _result
                });
                return _context2.abrupt('return', _result);

              case 12:
                this.log('missing createUser query, faking it');
                _context2.next = 15;
                return this.fakeCreateUser(_userData);

              case 15:
                _context2.next = 21;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2['catch'](1);

                publish('createUserFailure', {
                  authToken: authToken,
                  userData: userData,
                  profile: profile,
                  result: result,
                  error: _context2.t0
                });
                this.handleQueryError(err);

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 17]]);
      }));

      function doCreateUser(_x4) {
        return _ref2.apply(this, arguments);
      }

      return doCreateUser;
    }()
  }, {
    key: 'doQuery',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref4) {
        var query = _ref4.query;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.connection.doQuery(query, opts);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function doQuery(_x5) {
        return _ref3.apply(this, arguments);
      }

      return doQuery;
    }()

    // TODO: simulate GraphCool query mutation result?

  }, {
    key: 'fakeCreateUser',
    value: function fakeCreateUser(userData) {
      return userData;
    }
  }, {
    key: 'buildSigninUserData',
    value: function buildSigninUserData(_ref5) {
      var authToken = _ref5.authToken,
          profile = _ref5.profile;

      return {
        variables: {
          authToken: authToken
        }
      };
    }

    // sign in user

  }, {
    key: 'doSigninUser',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data) {
        var authToken, profile, userData, _result2;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                authToken = data.authToken, profile = data.profile;

                this.log('signin user', data);

                if (this.queries.signinUser) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt('return', this.fakeSigninUser(profile));

              case 4:
                userData = this.buildSigninUserData(data);
                _context4.prev = 5;
                _context4.next = 8;
                return this.doQuery({
                  query: this.queries.signinUser(userData)
                });

              case 8:
                _result2 = _context4.sent;

                this.publish('signedInOK', {
                  authToken: authToken,
                  profile: profile,
                  userData: userData,
                  result: _result2
                });
                return _context4.abrupt('return', _result2);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](5);

                this.publish('signedInFailure', {
                  authToken: authToken,
                  profile: profile,
                  userData: userData,
                  error: _context4.t0
                });
                this.handleQueryError(_context4.t0);

              case 17:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 13]]);
      }));

      function doSigninUser(_x6) {
        return _ref6.apply(this, arguments);
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
}(_gqlConn.GraphQLConnection);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlAuth = __webpack_require__(0);

Object.defineProperty(exports, 'GraphQLAuth', {
  enumerable: true,
  get: function get() {
    return _graphqlAuth.GraphQLAuth;
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (y, z) {
  'object' == ( false ? 'undefined' : _typeof(exports)) && 'object' == ( false ? 'undefined' : _typeof(module)) ? module.exports = z() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (z),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? exports.easyGqlAuth = z() : y.easyGqlAuth = z();
})(undefined, function () {
  return function (x) {
    function y(A) {
      if (z[A]) return z[A].exports;var B = z[A] = { i: A, l: !1, exports: {} };return x[A].call(B.exports, B, B.exports, y), B.l = !0, B.exports;
    }var z = {};return y.m = x, y.c = z, y.i = function (A) {
      return A;
    }, y.d = function (A, B, C) {
      y.o(A, B) || Object.defineProperty(A, B, { configurable: !1, enumerable: !0, get: C });
    }, y.n = function (A) {
      var B = A && A.__esModule ? function () {
        return A['default'];
      } : function () {
        return A;
      };return y.d(B, 'a', B), B;
    }, y.o = function (A, B) {
      return Object.prototype.hasOwnProperty.call(A, B);
    }, y.p = '', y(y.s = 2);
  }([function (x, y, z) {
    'use strict';
    function A(H, I) {
      if (!(H instanceof I)) throw new TypeError('Cannot call a class as a function');
    }function B(H, I) {
      if (!H) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return I && ('object' == (typeof I === 'undefined' ? 'undefined' : _typeof(I)) || 'function' == typeof I) ? I : H;
    }function C(H, I) {
      if ('function' != typeof I && null !== I) throw new TypeError('Super expression must either be null or a function, not ' + (typeof I === 'undefined' ? 'undefined' : _typeof(I)));H.prototype = Object.create(I && I.prototype, { constructor: { value: H, enumerable: !1, writable: !0, configurable: !0 } }), I && (Object.setPrototypeOf ? Object.setPrototypeOf(H, I) : H.__proto__ = I);
    }Object.defineProperty(y, '__esModule', { value: !0 }), y.GraphQLConnection = void 0;var D = 'function' == typeof Symbol && 'symbol' == _typeof(Symbol.iterator) ? function (H) {
      return typeof H === 'undefined' ? 'undefined' : _typeof(H);
    } : function (H) {
      return H && 'function' == typeof Symbol && H.constructor === Symbol && H !== Symbol.prototype ? 'symbol' : typeof H === 'undefined' ? 'undefined' : _typeof(H);
    },
        E = function () {
      function H(I, J) {
        for (var L, K = 0; K < J.length; K++) {
          L = J[K], L.enumerable = L.enumerable || !1, L.configurable = !0, 'value' in L && (L.writable = !0), Object.defineProperty(I, L.key, L);
        }
      }return function (I, J, K) {
        return J && H(I.prototype, J), K && H(I, K), I;
      };
    }(),
        F = z(1),
        G = y.GraphQLConnection = function (H) {
      function I() {
        var J = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            K = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};A(this, I);var L = B(this, (I.__proto__ || Object.getPrototypeOf(I)).call(this, J, K)),
            M = J.gqlServer;return M.endpoint = M.endpoint || M.connection.uri, L.config.gqlServer = M, L.validateConnection(), L;
      }return C(I, H), E(I, [{ key: 'validateConnection', value: function value() {
          'object' !== D(this.store) && this.configError('missing store for holding signinToken from GraphQL server'), 'object' !== D(this.keyNames) && this.configError('missing keyNames object, used to indicate store token keys');
        } }, { key: 'setJwtToken', value: function value(K) {
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};this.log('setJwtToken not yet implemented on GraphQL server Connection :(', { signinToken: K });
        } }, { key: 'defaultHeaders', get: function get() {
          return null;
        } }, { key: 'authTokenKeyName', get: function get() {
          return this.keyNames.gqlServerTokenKeyName;
        } }, { key: 'authToken', get: function get() {
          return this.store.getItem(this.authTokenKeyName) || null;
        } }]), I;
    }(F.Configurable);
  }, function (x, y) {
    (function (A, B) {
      x.exports = B();
    })(this, function () {
      return function (A) {
        function B(D) {
          if (C[D]) return C[D].exports;var E = C[D] = { i: D, l: !1, exports: {} };return A[D].call(E.exports, E, E.exports, B), E.l = !0, E.exports;
        }var C = {};return B.m = A, B.c = C, B.i = function (D) {
          return D;
        }, B.d = function (D, E, F) {
          B.o(D, E) || Object.defineProperty(D, E, { configurable: !1, enumerable: !0, get: F });
        }, B.n = function (D) {
          var E = D && D.__esModule ? function () {
            return D['default'];
          } : function () {
            return D;
          };return B.d(E, 'a', E), E;
        }, B.o = function (D, E) {
          return Object.prototype.hasOwnProperty.call(D, E);
        }, B.p = '', B(B.s = 4);
      }([function (A, B) {
        'use strict';
        Object.defineProperty(B, '__esModule', { value: !0 }), B.default = { auth0IdTokenKeyName: 'auth0Token', gqlServerTokenStorageKey: 'graphCoolToken' };
      }, function (A, B, C) {
        'use strict';
        function D(J, K) {
          if (!(J instanceof K)) throw new TypeError('Cannot call a class as a function');
        }function E(J, K) {
          if (!J) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return K && ('object' == (typeof K === 'undefined' ? 'undefined' : _typeof(K)) || 'function' == typeof K) ? K : J;
        }function F(J, K) {
          if ('function' != typeof K && null !== K) throw new TypeError('Super expression must either be null or a function, not ' + (typeof K === 'undefined' ? 'undefined' : _typeof(K)));J.prototype = Object.create(K && K.prototype, { constructor: { value: J, enumerable: !1, writable: !0, configurable: !0 } }), K && (Object.setPrototypeOf ? Object.setPrototypeOf(J, K) : J.__proto__ = K);
        }Object.defineProperty(B, '__esModule', { value: !0 }), B.Store = void 0;var G = function () {
          function J(K, L) {
            for (var M, N = 0; N < L.length; N++) {
              M = L[N], M.enumerable = M.enumerable || !1, M.configurable = !0, 'value' in M && (M.writable = !0), Object.defineProperty(K, M.key, M);
            }
          }return function (K, L, M) {
            return L && J(K.prototype, L), M && J(K, M), K;
          };
        }();B.createStore = function (J) {
          var K = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};return new I(J, K);
        };var H = C(2),
            I = B.Store = function (J) {
          function K(L) {
            var M = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};D(this, K);var N = E(this, (K.__proto__ || Object.getPrototypeOf(K)).call(this, 'Store', M));return N.log('create', { keyNames: L, opts: M }), N.keyNames = L.storage || L, N.storage = M.storage || M.keyStore || window.localStorage, N.auth0IdTokenKeyName = N.keyNames.auth0IdTokenKeyName, N.gqlServerTokenKeyName = N.keyNames.gqlServerTokenKeyName, N;
          }return F(K, J), G(K, [{ key: 'removeItem', value: function value(L) {
              this.storage.removeItem(L);
            } }, { key: 'getItem', value: function value(L) {
              return this.storage.getItem(L);
            } }, { key: 'setItem', value: function value(L, M) {
              this.storage.setItem(L, M);
            } }, { key: 'validateKeyNames', value: function value() {
              for (var L = this, M = arguments.length, N = Array(M), O = 0; O < M; O++) {
                N[O] = arguments[O];
              }N.map(function (P) {
                return L.validateKeyName(P);
              });
            } }, { key: 'validateKeyName', value: function value(L) {
              return 'string' != typeof this.keyNames[L] && this.error('keyNames missing ' + L), this;
            } }, { key: 'error', value: function value(L) {
              console.error(L);
            } }, { key: 'resetAll', value: function value() {
              this.removeItem(this.auth0TokenKeyName), this.removeItem(this.gqlServerTokenKeyName);
            } }, { key: 'getAll', value: function value() {
              return 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, { auth0Token: this.getItem(this.auth0IdTokenKeyName), gqlServerToken: this.getItem(this.gqlServerTokenKeyName) };
            } }, { key: 'store', value: function value(L, M) {
              if (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, 0 > this.keyNames.indexOf(L)) throw Error('keyname mismatch for store: ' + L);this.setItem(L, M);
            } }]), K;
        }(H.Loggable);
      }, function (A, B) {
        'use strict';
        function C(F, G) {
          if (!(F instanceof G)) throw new TypeError('Cannot call a class as a function');
        }Object.defineProperty(B, '__esModule', { value: !0 });var D = function () {
          function F(G, H) {
            for (var I, J = 0; J < H.length; J++) {
              I = H[J], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(G, I.key, I);
            }
          }return function (G, H, I) {
            return H && F(G.prototype, H), I && F(G, I), G;
          };
        }(),
            E = B.Loggable = function () {
          function F(G) {
            var H = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};C(this, F), this.io = H.io || console, this.logging = H.logging, this.name = G || H.name;
          }return D(F, [{ key: 'enableLog', value: function value() {
              return this.logging = !0, this;
            } }, { key: 'disableLog', value: function value() {
              return this.logging = !1, this;
            } }, { key: 'log', value: function value() {
              if (this.logging) {
                for (var G, H = arguments.length, I = Array(H), J = 0; J < H; J++) {
                  I[J] = arguments[J];
                }(G = this.io).log.apply(G, [this.name].concat(I));
              }
            } }, { key: 'error', value: function value() {
              if (this.logging) {
                for (var G, H = arguments.length, I = Array(H), J = 0; J < H; J++) {
                  I[J] = arguments[J];
                }(G = this.io).error.apply(G, [this.name].concat(I));
              }
            } }]), F;
        }();
      }, function (A, B, C) {
        'use strict';
        function D(N, O) {
          if (!(N instanceof O)) throw new TypeError('Cannot call a class as a function');
        }function E(N, O) {
          if (!N) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return O && ('object' == (typeof O === 'undefined' ? 'undefined' : _typeof(O)) || 'function' == typeof O) ? O : N;
        }function F(N, O) {
          if ('function' != typeof O && null !== O) throw new TypeError('Super expression must either be null or a function, not ' + (typeof O === 'undefined' ? 'undefined' : _typeof(O)));N.prototype = Object.create(O && O.prototype, { constructor: { value: N, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(N, O) : N.__proto__ = O);
        }Object.defineProperty(B, '__esModule', { value: !0 }), B.Configurable = void 0;var G = 'function' == typeof Symbol && 'symbol' == _typeof(Symbol.iterator) ? function (N) {
          return typeof N === 'undefined' ? 'undefined' : _typeof(N);
        } : function (N) {
          return N && 'function' == typeof Symbol && N.constructor === Symbol && N !== Symbol.prototype ? 'symbol' : typeof N === 'undefined' ? 'undefined' : _typeof(N);
        },
            H = function () {
          function N(O, P) {
            for (var Q, R = 0; R < P.length; R++) {
              Q = P[R], Q.enumerable = Q.enumerable || !1, Q.configurable = !0, 'value' in Q && (Q.writable = !0), Object.defineProperty(O, Q.key, Q);
            }
          }return function (O, P, Q) {
            return P && N(O.prototype, P), Q && N(O, Q), O;
          };
        }(),
            I = C(0),
            J = function (N) {
          return N && N.__esModule ? N : { default: N };
        }(I),
            K = C(2),
            L = C(1),
            M = B.Configurable = function (N) {
          function O() {
            var P = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                Q = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};D(this, O);var R = E(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, 'Configurable', Q));R.validate(P);var S = P.keyNames,
                T = P.store,
                U = P.storage;return R.config = P, R.observers = {}, R.config = P, R.storage = U, R.keyNames = S || U || J.default, R.store = T || R.defaultCreateStore(R.keyNames, Q), R.tokens = R.store.getAll(), R.tokens = R.store ? R.store.getAll() : P.tokens, R;
          }return F(O, N), H(O, [{ key: 'configError', value: function value(P) {
              throw this.error(P), Error(P);
            } }, { key: 'on', value: function value(P, Q) {
              this.log('on', P, Q);var R = this.observers[P] || [];return this.observers[P] = R.concat(Q), this;
            } }, { key: 'publish', value: function value(P, Q) {
              this.log('publish', P, Q);var R = this.observers[P] || [];return R ? R.map(function (S) {
                return S(Q);
              }) : this.log('no observers registered for', P), this;
            } }, { key: 'handleError', value: function value(P) {
              throw this.error(P), P;
            } }, { key: 'defaultCreateStore', value: function value(P, Q) {
              return new L.Store(P, Q);
            } }, { key: 'validate', value: function value(P) {
              if ('object' !== ('undefined' == typeof P ? 'undefined' : G(P))) throw Error('config must be an object');
            } }]), O;
        }(K.Loggable);
      }, function (A, B, C) {
        'use strict';
        Object.defineProperty(B, '__esModule', { value: !0 });var D = C(3);Object.defineProperty(B, 'Configurable', { enumerable: !0, get: function get() {
            return D.Configurable;
          } });var E = C(0);Object.defineProperty(B, 'keyNames', { enumerable: !0, get: function get() {
            return E.keyNames;
          } });var F = C(1);Object.defineProperty(B, 'Store', { enumerable: !0, get: function get() {
            return F.Store;
          } }), Object.defineProperty(B, 'createStore', { enumerable: !0, get: function get() {
            return F.createStore;
          } });
      }]);
    });
  }, function (x, y, z) {
    'use strict';
    Object.defineProperty(y, '__esModule', { value: !0 });var A = z(0);Object.defineProperty(y, 'GraphQLConnection', { enumerable: !0, get: function get() {
        return A.GraphQLConnection;
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