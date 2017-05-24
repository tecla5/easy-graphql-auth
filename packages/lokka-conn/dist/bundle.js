(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["apolloConn"] = factory();
	else
		root["apolloConn"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LokkaConnection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createConnection = createConnection;

var _easyGqlAuth = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LokkaConnection = exports.LokkaConnection = function (_GraphQLConnection) {
  _inherits(LokkaConnection, _GraphQLConnection);

  function LokkaConnection() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, LokkaConnection);

    var _this = _possibleConstructorReturn(this, (LokkaConnection.__proto__ || Object.getPrototypeOf(LokkaConnection)).call(this, config));

    _this.Lokka = config.Lokka || opts.Lokka;
    _this.Transport = config.Transport || opts.Transport;
    _this.createLokka = config.CreateLokka || opts.CreateLokka || _this.createLokkaClient;

    _this.createTransport = config.createTransport || opts.createTransport || _this.createLokkaTransport;

    if (opts.bind) {
      _this.createLokka.bind(_this);
      _this.createTransport.bind(_this);
    }
    return _this;
  }

  _createClass(LokkaConnection, [{
    key: 'connect',
    value: function connect() {
      var headers = void 0,
          transport = void 0;
      this.headers = headers = {
        'Authorization': 'Bearer ' + this.tokens.auth0IdToken
      };
      this.transport = transport = this.createTransport(headers);
      this.client = this.createLokka(transport);
      return this;
    }
  }, {
    key: 'createLokkaClient',
    value: function createLokkaClient(transport) {
      return new this.Lokka({
        transport: transport || this.transport
      });
    }
  }, {
    key: 'createLokkaTransport',
    value: function createLokkaTransport(_ref) {
      var headers = _ref.headers,
          endpoint = _ref.endpoint;

      endpoint = endpoint || this.config.graphCool.endpoint;
      return new this.Transport(endpoint, {
        headers: headers || this.headers
      });
    }
  }]);

  return LokkaConnection;
}(_easyGqlAuth.GraphQLConnection);

function createConnection(config) {
  return new LokkaConnection(config).connect();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof3(exports)) === 'object' && ( false ? 'undefined' : _typeof3(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof3(exports)) === 'object') exports["easyGqlAuth"] = factory();else root["easyGqlAuth"] = factory();
})(undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 3);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */
      (function (module) {
        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

        var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
        };

        (function webpackUniversalModuleDefinition(root, factory) {
          if ((false ? 'undefined' : _typeof2(exports)) === 'object' && (false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["tokenFoundation"] = factory();else root["tokenFoundation"] = factory();
        })(undefined, function () {
          return (/******/function (modules) {
              // webpackBootstrap
              /******/ // The module cache
              /******/var installedModules = {};
              /******/
              /******/ // The require function
              /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                  /******/return installedModules[moduleId].exports;
                  /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                  /******/i: moduleId,
                  /******/l: false,
                  /******/exports: {}
                  /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
              }
              /******/
              /******/
              /******/ // expose the modules object (__webpack_modules__)
              /******/__webpack_require__.m = modules;
              /******/
              /******/ // expose the module cache
              /******/__webpack_require__.c = installedModules;
              /******/
              /******/ // identity function for calling harmony imports with the correct context
              /******/__webpack_require__.i = function (value) {
                return value;
              };
              /******/
              /******/ // define getter function for harmony exports
              /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                  /******/Object.defineProperty(exports, name, {
                    /******/configurable: false,
                    /******/enumerable: true,
                    /******/get: getter
                    /******/ });
                  /******/
                }
                /******/
              };
              /******/
              /******/ // getDefaultExport function for compatibility with non-harmony modules
              /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                  return module['default'];
                } :
                /******/function getModuleExports() {
                  return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
              };
              /******/
              /******/ // Object.prototype.hasOwnProperty.call
              /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
              };
              /******/
              /******/ // __webpack_public_path__
              /******/__webpack_require__.p = "";
              /******/
              /******/ // Load entry module and return exports
              /******/return __webpack_require__(__webpack_require__.s = 3);
              /******/
            }(
            /************************************************************************/
            /******/[
            /* 0 */
            /***/function (module, exports, __webpack_require__) {

              "use strict";

              Object.defineProperty(exports, "__esModule", {
                value: true
              });
              exports.default = {
                auth0IdTokenKeyName: 'auth0Token',
                gqlServerTokenStorageKey: 'graphCoolToken'
              };

              /***/
            },
            /* 1 */
            /***/function (module, exports, __webpack_require__) {

              "use strict";

              Object.defineProperty(exports, "__esModule", {
                value: true
              });
              exports.Configurable = undefined;

              var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
              } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
              };

              var _createClass = function () {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
                };
              }();

              var _keynames = __webpack_require__(0);

              var _keynames2 = _interopRequireDefault(_keynames);

              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }

              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }

              var Configurable = exports.Configurable = function () {
                function Configurable() {
                  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                  _classCallCheck(this, Configurable);

                  this.validate(config);
                  var keyNames = config.keyNames,
                      store = config.store,
                      storage = config.storage;

                  this.config = config;
                  this.io = opts.io || console;
                  this.logging = opts.logging;
                  this.observers = {};
                  this.config = config;
                  this.storage = storage;
                  this.keyNames = keyNames || storage || _keynames2.default;
                  this.store = store || this.defaultCreateStore(this.keyNames, opts);
                  this.tokens = this.store.getAll();
                  this.tokens = this.store ? this.store.getAll() : config.tokens;
                }

                _createClass(Configurable, [{
                  key: 'on',
                  value: function on(eventName, observer) {
                    this.log('on', eventName, observer);
                    var slot = this.observers[eventName] || [];
                    this.observers[eventName] = slot.concat(observer);
                    return this;
                  }
                }, {
                  key: 'publish',
                  value: function publish(eventName, args) {
                    this.log('publish', eventName, args);
                    var observers = this.observers[eventName] || [];
                    if (observers) {
                      observers.map(function (observer) {
                        return observer(args);
                      });
                    } else {
                      this.log('no observers registered for', eventName);
                    }
                    return this;
                  }
                }, {
                  key: 'handleError',
                  value: function handleError(err) {
                    this.error(err);
                    throw err;
                  }
                }, {
                  key: 'enableLog',
                  value: function enableLog() {
                    this.logging = true;
                    return this;
                  }
                }, {
                  key: 'disableLog',
                  value: function disableLog() {
                    this.logging = false;
                    return this;
                  }
                }, {
                  key: 'log',
                  value: function log() {
                    if (this.logging) {
                      var _io;

                      for (var _len = arguments.length, msgs = Array(_len), _key = 0; _key < _len; _key++) {
                        msgs[_key] = arguments[_key];
                      }

                      (_io = this.io).log.apply(_io, ['Lock'].concat(msgs));
                    }
                  }
                }, {
                  key: 'error',
                  value: function error() {
                    if (this.logging) {
                      var _io2;

                      for (var _len2 = arguments.length, msgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        msgs[_key2] = arguments[_key2];
                      }

                      (_io2 = this.io).error.apply(_io2, ['Lock'].concat(msgs));
                    }
                  }
                }, {
                  key: 'defaultCreateStore',
                  value: function defaultCreateStore(keyNames, opts) {
                    return new Store(keyNames, opts);
                  }
                }, {
                  key: 'validate',
                  value: function validate(config) {
                    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
                      throw Error('config must be an object');
                    }
                  }
                }]);

                return Configurable;
              }();

              /***/
            },
            /* 2 */
            /***/function (module, exports, __webpack_require__) {

              "use strict";

              Object.defineProperty(exports, "__esModule", {
                value: true
              });

              var _createClass = function () {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
                };
              }();

              exports.createStore = createStore;

              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }

              var Store = exports.Store = function () {
                function Store(keyNames) {
                  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                  _classCallCheck(this, Store);

                  this.keyNames = keyNames;
                  this.validateKeyName('auth0IdTokenKeyName').validateKeyName('gqlServerTokenKeyName');

                  this.auth0IdTokenKeyName = this.keyNames.auth0IdTokenKeyName;
                  this.gqlServerTokenKeyName = this.keyNames.gqlServerTokenKeyName;
                }

                _createClass(Store, [{
                  key: 'removeItem',
                  value: function removeItem(name) {
                    localStorage.removeItem(name);
                  }
                }, {
                  key: 'getItem',
                  value: function getItem(name) {
                    return localStorage.getItem(name);
                  }
                }, {
                  key: 'setItem',
                  value: function setItem(name, value) {
                    localStorage.setItem(name, value);
                  }
                }, {
                  key: 'validateKeyName',
                  value: function validateKeyName(name) {
                    if (typeof this.keyNames[name] !== 'string') {
                      this.error('keyNames missing ' + name);
                    }
                    return this;
                  }
                }, {
                  key: 'error',
                  value: function error(msg) {
                    console.error(msg);
                    // throw Error(msg)
                  }
                }, {
                  key: 'resetAll',
                  value: function resetAll() {
                    this.removeItem(this.auth0TokenKeyName);
                    this.removeItem(this.gqlServerTokenKeyName);
                  }
                }, {
                  key: 'getAll',
                  value: function getAll() {
                    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    return {
                      auth0Token: this.getItem(this.auth0IdTokenKeyName),
                      gqlServerToken: this.getItem(this.gqlServerTokenKeyName)
                    };
                  }
                }, {
                  key: 'store',
                  value: function store(keyName, value) {
                    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                    if (this.keyNames.indexOf(keyName) < 0) {
                      throw Error('keyname mismatch for store: ' + keyName);
                    }

                    this.setItem(keyName, value);
                  }
                }]);

                return Store;
              }();

              function createStore(keyNames) {
                var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                return new Store(keyNames, opts);
              }

              /***/
            },
            /* 3 */
            /***/function (module, exports, __webpack_require__) {

              "use strict";

              Object.defineProperty(exports, "__esModule", {
                value: true
              });

              var _configurable = __webpack_require__(1);

              Object.defineProperty(exports, 'Configurable', {
                enumerable: true,
                get: function get() {
                  return _configurable.Configurable;
                }
              });

              var _keynames = __webpack_require__(0);

              Object.defineProperty(exports, 'keyNames', {
                enumerable: true,
                get: function get() {
                  return _keynames.keyNames;
                }
              });

              var _store = __webpack_require__(2);

              Object.defineProperty(exports, 'Store', {
                enumerable: true,
                get: function get() {
                  return _store.Store;
                }
              });
              Object.defineProperty(exports, 'createStore', {
                enumerable: true,
                get: function get() {
                  return _store.createStore;
                }
              });

              /***/
            }])
          );
        });
        //# sourceMappingURL=bundle.js.map
        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(4)(module));

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GraphQLAuth = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      exports.createGraphQLServerAuth = createGraphQLServerAuth;

      var _tokenFoundation = __webpack_require__(0);

      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);var value = info.value;
              } catch (error) {
                reject(error);return;
              }if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }return step("next");
          });
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof3(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof3(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

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

      function createGraphQLServerAuth(config) {
        new GraphQLServerAuth(config);
      }

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GraphQLConnection = undefined;

      var _tokenFoundation = __webpack_require__(0);

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof3(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof3(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

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

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

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

      /***/
    },
    /* 4 */
    /***/function (module, exports) {

      module.exports = function (module) {
        if (!module.webpackPolyfill) {
          module.deprecate = function () {};
          module.paths = [];
          // module.parent = undefined by default
          if (!module.children) module.children = [];
          Object.defineProperty(module, "loaded", {
            enumerable: true,
            get: function get() {
              return module.l;
            }
          });
          Object.defineProperty(module, "id", {
            enumerable: true,
            get: function get() {
              return module.i;
            }
          });
          module.webpackPolyfill = 1;
        }
        return module;
      };

      /***/
    }])
  );
});
//# sourceMappingURL=bundle.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = __webpack_require__(0);

Object.defineProperty(exports, 'Connection', {
  enumerable: true,
  get: function get() {
    return _connection.LokkaConnection;
  }
});
Object.defineProperty(exports, 'createConnection', {
  enumerable: true,
  get: function get() {
    return _connection.createConnection;
  }
});

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