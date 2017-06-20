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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  authTokenKeyName: 'auth0Token',
  gqlServerTokenKeyName: 'gqlServerAuthToken', // for GraphQL servers
  serverTokenKeyName: 'serverAuthToken' // for misc servers/storage systems
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notifiable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _loggable = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notifiable = exports.Notifiable = function (_Loggable) {
  _inherits(Notifiable, _Loggable);

  function Notifiable(name, opts) {
    _classCallCheck(this, Notifiable);

    var _this = _possibleConstructorReturn(this, (Notifiable.__proto__ || Object.getPrototypeOf(Notifiable)).call(this, name, opts));

    _this.notifyLog = opts.notifyLog;
    _this.topic = opts.topic || _this.defaultTopic;
    _this.notifyError = _this.notifyFailure;
    _this.observers = {};
    return _this;
  }

  _createClass(Notifiable, [{
    key: 'log',
    value: function log(msg, data) {
      if (this.notifyLog === false) return;
      _get(Notifiable.prototype.__proto__ || Object.getPrototypeOf(Notifiable.prototype), 'log', this).call(this, msg, data);
    }
  }, {
    key: 'notify',
    value: function notify(event, data) {
      var criteria = this._criteria(event, data);
      this.publish(criteria, data);
    }
  }, {
    key: '_criteria',
    value: function _criteria(event, data) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return Object.assign({}, {
        topic: this.topic,
        event: event,
        data: data
      }, opts);
    }
  }, {
    key: 'notifySuccess',
    value: function notifySuccess(event, data) {
      var criteria = this._criteria(event, data, {
        status: 'success'
      });
      this.publish(criteria, data);
    }
  }, {
    key: 'notifyFailure',
    value: function notifyFailure(event, data) {
      var criteria = this._criteria(event, data, {
        status: 'failure'
      });
      this.publish(criteria, data);
    }
  }, {
    key: 'onCriteria',
    value: function onCriteria(criteria, observer) {
      this.log('onCriteria', criteria, observer);
      var topic = criteria.topic,
          event = criteria.event,
          status = criteria.status;

      topic = topic || this.topic;
      this.observers[topic] = this.observers[topic] || {};
      this.observers[topic][event] = this.observers[topic][event] || {};

      var eventObservers = this.observers[topic][event];
      if (status) {
        eventObservers[status] = this.observers[topic][event][status] || [];
        eventObservers[status] = eventObservers[status].concat(observer);
      } else {
        eventObservers['observers'] = eventObservers['observers'] || [];
        eventObservers['observers'] = eventObservers['observers'].concat(observer);
      }
      return this;
    }
  }, {
    key: 'onStatus',
    value: function onStatus(event, status, observer) {
      var criteria = void 0;
      if ((typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') {
        criteria = event;
      } else {
        criteria = {
          event: event
        };
      }
      criteria.status = status;
      return this.onCriteria(criteria, observer);
    }
  }, {
    key: 'onSuccess',
    value: function onSuccess(criteria, observer) {
      return this.onStatus(criteria, 'success', observer);
    }
  }, {
    key: 'onFailure',
    value: function onFailure(criteria, observer) {
      return this.onStatus(criteria, 'failure', observer);
    }
  }, {
    key: 'on',
    value: function on(event, observer) {
      this.log('on', event, observer);
      if ((typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') {
        var criteria = event;
        return this.onCriteria(criteria, observer);
      }
      var slot = this.observers[event] || [];
      this.observers[event] = slot.concat(observer);
      return this;
    }
  }, {
    key: 'onAll',
    value: function onAll(events, observer) {
      var _this2 = this;

      if (Array.isArray(events)) {
        events.map(function (event) {
          return _this2.on(event, observer);
        });
        return this;
      } else {
        this.handleError('onAll: first argument must be a list (Array) of events to observe', eventNames);
      }
    }
  }, {
    key: 'publishCriteria',
    value: function publishCriteria(criteria, data) {
      this.log('publishCriteria', criteria, data);
      if (typeof criteria === 'string') {
        var _event = criteria;
        return this.publish(_event, data);
      }
      var topic = criteria.topic,
          event = criteria.event,
          status = criteria.status;


      this.observers = this.observers || {};
      var observers = this.observers[topic] || {};
      observers = observers[event] || {};

      this.publishTo(observers['observers'], data, criteria);
      this.publishTo(observers[status], data, criteria);
    }
  }, {
    key: 'publishTo',
    value: function publishTo(observers, data, criteria) {
      if (Array.isArray(observers)) {
        observers.map(function (observer) {
          return observer(data);
        });
      } else {
        this.log('no observers registered for', criteria);
      }
      return this;
    }
  }, {
    key: 'publish',
    value: function publish(event, data) {
      this.log('publish', event, data);

      if ((typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') {
        var criteria = this._criteria(event, data);
        this.publishCriteria(criteria, data);
      }

      this.observers = this.observers || {};
      var observers = this.observers[event] || [];
      if (observers) {
        observers.map(function (observer) {
          return observer(data);
        });
      } else {
        this.log('no observers registered for', event);
      }
      return this;
    }
  }, {
    key: 'defaultTopic',
    get: function get() {
      return 'default';
    }
  }]);

  return Notifiable;
}(_loggable.Loggable);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createStore = createStore;

var _notifiable = __webpack_require__(1);

var _keynames = __webpack_require__(0);

var _keynames2 = _interopRequireDefault(_keynames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isObj(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null;
}

function createStore(keyNames) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Store(keyNames, opts);
}

var Store = exports.Store = function (_Notifiable) {
  _inherits(Store, _Notifiable);

  function Store(keyNames) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, 'Store', opts));

    _this.configured = {};
    _this.validated = {};
    _this.keyNames = keyNames;
    _this.opts = opts;
    _this.log('create', {
      keyNames: _this.keyNames,
      opts: _this.opts
    });
    _this.configure();
    _this.postConfigure();
    return _this;
  }

  _createClass(Store, [{
    key: 'configure',
    value: function configure(force) {
      if (this.configured.Store && !force) return;
      this.configured.Store = false;
      var keyNames = this.keyNames || {};
      var opts = this.opts;
      try {
        this.keyNames = Object.assign({}, this.defaultKeyNames, keyNames.storage || keyNames);
        this.configureKeyNames();

        this.storage = opts.store || opts.keyStore || this.localStorage;
        this.configured.Store = true;
      } catch (err) {
        this.handleError('Store.configure', {
          opts: opts,
          keyNames: keyNames,
          errMsg: err.message,
          cause: err
        });
      }
    }
  }, {
    key: 'configureKeyNames',
    value: function configureKeyNames(keyNames) {
      keyNames = keyNames || this.keyNames;
      if (!isObj(keyNames)) {
        this.handleError('keyNames must be an Object', {
          keyNames: keyNames,
          defaultKeyNames: this.defaultKeyNames
        });
      }
      // TODO: set in this.keys object instead
      this.authTokenKeyName = keyNames.authTokenKeyName;
      this.gqlServerTokenKeyName = keyNames.gqlServerTokenKeyName;
      this.serverTokenKeyName = keyNames.serverTokenKeyName;
    }
  }, {
    key: 'postConfigure',
    value: function postConfigure() {
      this.validateConfig();
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig() {
      this.validated.Store = false;
      this.log('validateConfig');
      this.validateAllKeyNames();
      this.validated.Store = true;
    }

    // TODO: iterate and validate keys in store

  }, {
    key: 'validateAllKeyNames',
    value: function validateAllKeyNames() {
      this.validateKeyName('authTokenKeyName');
      this.validateKeyName('gqlServerTokenKeyName', 'warn');
      this.validateKeyName('serverTokenKeyName', 'warn');
    }
  }, {
    key: 'validateKeyName',
    value: function validateKeyName(keyName, method) {
      if (!this[keyName]) {
        this[method]('Store: key ' + keyName + ' not defined', {
          keyNames: this.keyNames,
          store: this
        });
      }
    }
  }, {
    key: 'validateKeyNames',
    value: function validateKeyNames() {
      var _this2 = this;

      for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
      }

      names.map(function (name) {
        return _this2.validateKeyName(name);
      });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(name) {
      this.storage.removeItem(name);
      this.publish('remove', {
        name: name
      });
      return this;
    }
  }, {
    key: 'getItem',
    value: function getItem(name) {
      return this.storage.getItem(name);
    }
  }, {
    key: 'setItem',
    value: function setItem(name, value) {
      this.storage.setItem(name, value);
      this.publish('set', {
        name: name,
        value: value
      });
      return this;
    }

    // TODO: iterate and remove keys in store

  }, {
    key: 'resetAll',
    value: function resetAll() {
      this.removeItem(this.authTokenKeyName);
      this.removeItem(this.gqlServerTokenKeyName);
      this.removeItem(this.serverTokenKeyName);

      this.publish('reset');
      return this;
    }

    // TODO: iterate and (reduce) return keys in store

  }, {
    key: 'getAll',
    value: function getAll() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        authToken: this.getItem(this.authTokenKeyName),
        gqlServerToken: this.getItem(this.gqlServerTokenKeyName),
        serverToken: this.getItem(this.serverTokenKeyName)
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
  }, {
    key: 'defaultKeyNames',
    get: function get() {
      return _keynames2.default;
    }
  }, {
    key: 'localStorage',
    get: function get() {
      try {
        return window.localStorage;
      } catch (err) {
        this.handleError('missing global window Object to retrieve localStorage');
      }
    }
  }]);

  return Store;
}(_notifiable.Notifiable);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLAuth = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.createGraphQLAuth = createGraphQLAuth;

var _gqlConn = __webpack_require__(6);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createGraphQLAuth(config, opts) {
  return new GraphQLAuth(config, opts);
}

var GraphQLAuth = exports.GraphQLAuth = function (_GraphQLConnection) {
  _inherits(GraphQLAuth, _GraphQLConnection);

  function GraphQLAuth() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GraphQLAuth);

    var _this = _possibleConstructorReturn(this, (GraphQLAuth.__proto__ || Object.getPrototypeOf(GraphQLAuth)).call(this, config, opts));

    _this.name = 'GraphQLAuth';
    _this.configure();
    _this.postConfig();
    return _this;
  }

  _createClass(GraphQLAuth, [{
    key: 'configure',
    value: function configure(force) {
      if (this.configured.GraphQLAuth && !force) return;
      _get(GraphQLAuth.prototype.__proto__ || Object.getPrototypeOf(GraphQLAuth.prototype), 'configure', this).call(this);
      var config = this.config;
      var opts = this.opts;

      var containers = [config, opts, opts.client];
      this.extractProperties(containers, 'createConnection', 'connection');

      if (!this.connection && !this.createConnection) {
        this.configError('Missing connection or createConnection option');
      }

      this.connection = this.connection || this.createConnection(config, opts);
      this.configured.GraphQLAuth = true;
      return this;
    }
  }, {
    key: 'postConfig',
    value: function postConfig() {
      _get(GraphQLAuth.prototype.__proto__ || Object.getPrototypeOf(GraphQLAuth.prototype), 'postConfig', this).call(this);
      this.validateConfig();
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig(force) {
      _get(GraphQLAuth.prototype.__proto__ || Object.getPrototypeOf(GraphQLAuth.prototype), 'validateConfig', this).call(this);
      if (this.validated.GraphQLAuth && !force) return;
      if (!this.connection) {
        this.configError('missing GraphQL connection in configuration');
      }
      this.validated.GraphQLAuth = true;
    }
  }, {
    key: 'extractSignedInUserToken',
    value: function extractSignedInUserToken(signinResult) {
      return signinResult.data.signinUser.token;
    }
  }, {
    key: 'setGraphQLServerToken',
    value: function setGraphQLServerToken(signinToken) {
      if (!this.store) {
        this.handleError('Missing store for setting signinToken', {
          signinToken: signinToken
        });
      }
      // set graphcool token in localstorage
      this.store.setItem(this.gqlServerTokenKeyName, signinToken);
      this.notifySuccess('token:stored', {
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
      this.notifySuccess('token:received', {
        signinToken: signinToken
      });
      this.setGraphQLServerToken(signinToken);
      this.setJwtToken(signinToken);
    }
  }, {
    key: 'setJwtToken',
    value: function setJwtToken(signinToken) {
      if (!this.connection) {
        this.error('missing connection for setting JWT token');
      }
      this.connection.setJwtToken(signinToken, this.opts);
      this.notifySuccess('jwt:token', {
        signinToken: signinToken
      });
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

    // TODO: make more clean

  }, {
    key: 'doCreateUser',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data) {
        var authToken, profile, result, userData, query, _result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                authToken = data.authToken, profile = data.profile;
                // create user if necessary

                result = void 0;
                userData = void 0;
                _context2.prev = 3;

                userData = this.buildUserData(data);
                this.log('Create user', data);

                this.validateQueries();

                if (!(this.queries && this.queries.createUser)) {
                  _context2.next = 16;
                  break;
                }

                query = this.queries.createUser(userData);
                _context2.next = 11;
                return this.doQuery(query);

              case 11:
                _result = _context2.sent;

                this.notifySuccess('user:create', {
                  authToken: authToken,
                  userData: userData,
                  profile: profile,
                  result: _result
                });
                return _context2.abrupt('return', _result);

              case 16:
                this.log('missing createUser query, faking it');
                _context2.next = 19;
                return this.fakeCreateUser(userData);

              case 19:
                return _context2.abrupt('return', _context2.sent);

              case 20:
                _context2.next = 26;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2['catch'](3);

                this.notifyFailure('user:create', {
                  authToken: authToken,
                  userData: userData,
                  profile: profile,
                  result: result,
                  error: _context2.t0
                });
                this.handleQueryError(err);

              case 26:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 22]]);
      }));

      function doCreateUser(_x4) {
        return _ref2.apply(this, arguments);
      }

      return doCreateUser;
    }()
  }, {
    key: 'validateQueries',
    value: function validateQueries() {
      if (_typeof(this.queries) !== 'object') {
        this.warn('No queries object defined', {
          queries: this.queries
        });
      }
    }
  }, {
    key: 'doQuery',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(query) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    value: function buildSigninUserData(_ref4) {
      var authToken = _ref4.authToken,
          profile = _ref4.profile;

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
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data) {
        var authToken, profile, userData, query, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                authToken = data.authToken, profile = data.profile;

                this.log('signin user', data);
                this.validateQueries();

                if (this.queries && this.queries.signinUser) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', this.fakeSigninUser(profile));

              case 5:
                userData = this.buildSigninUserData(data);
                _context4.prev = 6;
                query = this.queries.signinUser(userData);
                _context4.next = 10;
                return this.doQuery(query);

              case 10:
                result = _context4.sent;

                this.notifySuccess('server:signin', {
                  authToken: authToken,
                  profile: profile,
                  userData: userData,
                  result: result
                });
                return _context4.abrupt('return', result);

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](6);

                this.notifyFailure('server:signin', {
                  authToken: authToken,
                  profile: profile,
                  userData: userData,
                  error: _context4.t0
                });
                this.handleQueryError(_context4.t0);

              case 19:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 15]]);
      }));

      function doSigninUser(_x7) {
        return _ref5.apply(this, arguments);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gqlAuth = __webpack_require__(3);

Object.defineProperty(exports, 'GraphQLAuth', {
  enumerable: true,
  get: function get() {
    return _gqlAuth.GraphQLAuth;
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLConnection = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.createConnection = createConnection;

var _tokenFoundation = __webpack_require__(8);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createConnection(config, opts) {
  return new GraphQLConnection(config, opts);
}

var GraphQLConnection = exports.GraphQLConnection = function (_Configurable) {
  _inherits(GraphQLConnection, _Configurable);

  function GraphQLConnection() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GraphQLConnection);

    var _this = _possibleConstructorReturn(this, (GraphQLConnection.__proto__ || Object.getPrototypeOf(GraphQLConnection)).call(this, config, opts));

    _this.name = 'GraphQLConnection';
    _this.configure();
    _this.postConfig();
    return _this;
  }

  _createClass(GraphQLConnection, [{
    key: 'configure',
    value: function configure() {
      _get(GraphQLConnection.prototype.__proto__ || Object.getPrototypeOf(GraphQLConnection.prototype), 'configure', this).call(this);

      if (this.configured.GraphQLConnection) return;
      var config = this.config;

      var gqlServer = config.gqlServer;
      if (!gqlServer) {
        this.configError('missing gqlServer object in configuration');
      }

      this.log('gqlServer config', {
        gqlServer: gqlServer
      });
      gqlServer.endpoint = process.env.gqlServer_endpoint || gqlServer.endpoint || gqlServer.connection.uri;

      this.config.gqlServer = gqlServer || {};
      return this;
    }
  }, {
    key: 'prepareQuery',
    value: function prepareQuery(query) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.log('doQuery', {
        query: query,
        opts: opts
      });
      if (!this.client) {
        this.handleError('doQuery: missing client');
      }

      if (!query) {
        this.handleError('doQuery: query is not defined', query);
      }

      if (this.isGqlQuery(query)) {
        query = this.toGqlQuery(query);
      }
      return query;
    }
  }, {
    key: 'doQuery',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(query) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.log('doQuery', {
                  query: query,
                  opts: opts
                });
                this.handleError('doQuery: must be implemented by subclass');

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function doQuery(_x4) {
        return _ref.apply(this, arguments);
      }

      return doQuery;
    }()
  }, {
    key: 'isGqlQuery',
    value: function isGqlQuery(query) {
      if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) !== 'object') return false;
      // see: https://www.npmjs.com/package/graphql-tag
      if (query.kind === 'Document') return true;
      return false;
    }
  }, {
    key: 'toGqlQuery',
    value: function toGqlQuery(queryStr, opts) {
      if (typeof query !== 'string') {
        this.handleError('toGqlQuery: bad query', queryStr);
      }
      if (typeof this.gql !== 'function') {
        this.log('Try: https://www.npmjs.com/package/graphql-tag');
        this.error('Also see: https://www.npmjs.com/package/graphql');
        this.handleError('missing gql function to convert query string to GraphQL query');
      }
      return this.gql(query, opts);
    }
  }, {
    key: 'postConfig',
    value: function postConfig() {
      this.validateConfig();
      this.configured.GraphQLConnection = true;
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig(force) {
      if (this.validated.GraphQLConnection && !force) return;
      this.validated.GraphQLConnection = false;
      _get(GraphQLConnection.prototype.__proto__ || Object.getPrototypeOf(GraphQLConnection.prototype), 'validateConfig', this).call(this, force);
      this.validated.GraphQLConnection = true;
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
      return process.env.gqlServer_tokenKeyName || this.keyNames.gqlServerTokenKeyName;
    }
  }, {
    key: 'authToken',
    get: function get() {
      return this.store.getItem(this.authTokenKeyName) || null;
    }
  }]);

  return GraphQLConnection;
}(_tokenFoundation.Configurable);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gqlConnection = __webpack_require__(5);

Object.defineProperty(exports, 'GraphQLConnection', {
  enumerable: true,
  get: function get() {
    return _gqlConnection.GraphQLConnection;
  }
});
Object.defineProperty(exports, 'createConnection', {
  enumerable: true,
  get: function get() {
    return _gqlConnection.createConnection;
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configurable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keynames = __webpack_require__(0);

var _keynames2 = _interopRequireDefault(_keynames);

var _notifiable = __webpack_require__(1);

var _store = __webpack_require__(2);

var _isType = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Configurable = exports.Configurable = function (_Notifiable) {
  _inherits(Configurable, _Notifiable);

  function Configurable() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Configurable);

    var _this = _possibleConstructorReturn(this, (Configurable.__proto__ || Object.getPrototypeOf(Configurable)).call(this, 'Configurable', opts));

    _this.configured = {};
    _this.validated = {};

    _this.validate(config);
    _this.log('configuring with', {
      config: config,
      opts: opts
    });
    _this.opts = _this.opts || opts;
    _this.config = config;
    _this.configure();
    _this.postConfig();
    return _this;
  }

  _createClass(Configurable, [{
    key: 'configure',
    value: function configure() {
      if (this.configured.Configurable) return;
      this.log('Configurable: configure');
      this.observers = {};
      this.configureStorage();
      this.configured.Configurable = true;
      return this;
    }
  }, {
    key: 'postConfig',
    value: function postConfig() {
      this.validateConfig();
      this.retrieveTokens();
      return this;
    }
  }, {
    key: 'configureStorage',
    value: function configureStorage() {
      this.log('configureStorage');
      var config = this.config;
      var opts = this.opts;
      var containers = [config, opts];
      this.extractProperties(containers, 'storage', 'keyNames', 'store');
      this.keyNames = this.keyNames || this.storage || _keynames2.default;
      this.store = this.store || this.createStore(this.keyNames, this.opts);
      return this;
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.validated.Configurable && !force) return;
      this.log('validateConfig', {
        store: this.store,
        keyNames: this.keyNames
      });
      if (_typeof(this.store) !== 'object') {
        this.configError('missing store for holding auth tokens');
      }

      if (_typeof(this.keyNames) !== 'object') {
        this.configError('missing keyNames object, used to indicate store token keys');
      }
      this.validated.Configurable = true;
    }
  }, {
    key: 'retrieveTokens',
    value: function retrieveTokens() {
      this.log('retrieveTokens', {
        store: this.store
      });
      if (!(0, _isType.isFun)(this.store.getAll)) {
        this.error("Store is missing function getAll to retrieve tokens");
      }
      this.tokens = this.store.getAll() || {};
      return this;
    }
  }, {
    key: 'extractProperty',
    value: function extractProperty(containers, name, selfie) {
      this.log('extractProperty', name, {
        self: selfie
      });
      if (!(0, _isType.isArray)(containers)) {
        this.handleError('extractProperty: containes must be an Array', containers);
      }

      var container = containers.find(function (container) {
        return (container || {})[name];
      }) || {};
      var value = container[name];
      if (!value) {
        this.warn('no value found for', name);
      }
      if (selfie && value) {
        var displayValue = (0, _isType.isFun)(value) ? value.name : value;
        this.log('extract: set', name, 'to', displayValue);
        this[name] = value;
      }
      return value;
    }
  }, {
    key: 'extractProps',
    value: function extractProps(selfie, containers) {
      var _this2 = this;

      for (var _len = arguments.length, names = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        names[_key - 2] = arguments[_key];
      }

      this.log('extractProperties', names);
      return names.reduce(function (acc, name) {
        var value = _this2.extractProperty(containers, name, selfie);
        acc[name] = value;
        return acc;
      }, {});
    }
  }, {
    key: 'extractProperties',
    value: function extractProperties(containers) {
      for (var _len2 = arguments.length, names = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        names[_key2 - 1] = arguments[_key2];
      }

      return this.extractProps.apply(this, [true, containers].concat(names));
    }
  }, {
    key: 'configError',
    value: function configError(msg) {
      this.handleError(msg);
    }
  }, {
    key: 'createStore',
    value: function createStore(keyNames) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _opts = opts,
          createStore = _opts.createStore;

      keyNames = keyNames || this.keyNames;
      opts = opts || this.opts;
      this.log('createStore', {
        keyNames: keyNames,
        opts: opts
      });

      createStore = (0, _isType.isFun)(createStore) ? createStore : this.defaultCreateStore;
      this.log('create with', {
        createStore: createStore
      });
      return createStore(keyNames, opts);
    }
  }, {
    key: 'defaultCreateStore',
    value: function defaultCreateStore(keyNames, opts) {
      return (0, _store.createStore)(keyNames, opts);
    }
  }, {
    key: 'validate',
    value: function validate(config) {
      if (!(0, _isType.isObject)(config)) {
        this.handleError('config must be an object', config);
      }
    }
  }]);

  return Configurable;
}(_notifiable.Notifiable);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configurable = __webpack_require__(7);

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isFun = isFun;
exports.isObject = isObject;
exports.isArray = isArray;
function isFun(fun) {
  return typeof fun === 'function';
}

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isArray(obj) {
  return Array.isArray(obj);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loggable = exports.Loggable = function () {
  function Loggable(name) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Loggable);

    this.opts = opts;
    this.io = opts.io || console;
    this.logging = opts.logging;
    this.name = name || opts.name;
  }

  _createClass(Loggable, [{
    key: 'handleError',
    value: function handleError(err, data) {
      this.error(err, data);
      if (this.notify) {
        this.notify('error', data);
      }
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
    key: 'label',
    value: function label(lv) {
      lv = lv.toUpperCase();
      return '[' + this.name + '] ' + lv + ':';
    }
  }, {
    key: 'warn',
    value: function warn(msg, data) {
      if (this.logging) {
        return this.io.log(this.label('warning'), msg, data);
      }
    }
  }, {
    key: 'log',
    value: function log(msg, data) {
      if (this.logging) {
        return this.io.log(this.label('info'), msg, data);
      }
    }
  }, {
    key: 'error',
    value: function error(msg, data) {
      if (this.logging) {
        return this.io.error(this.label('error'), msg, data);
      }
    }
  }]);

  return Loggable;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map