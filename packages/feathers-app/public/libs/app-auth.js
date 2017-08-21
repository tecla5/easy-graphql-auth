(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["app-auth"] = factory();
	else
		root["app-auth"] = factory();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onDocReady = onDocReady;
exports.configureAppAuth = configureAppAuth;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function onDocReady(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }

  // The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. The state indicates that the DOMContentLoaded event has been fired.
  document.addEventListener('interactive', fn, false);
}

function isFunction(fun) {
  return fun && typeof fun === 'function';
}

function bindEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
}

var AppAuth = exports.AppAuth = function () {
  function AppAuth(lock) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AppAuth);

    if (!lock) {
      throw new Error('You must pass a lock instance as the first argument to the (AppAuth) constructor');
    }

    var elements = config.elements,
        selectors = config.selectors,
        selectElement = config.selectElement;


    this.lock = lock;
    this.config = config;
    elements = elements || {};
    selectors = selectors || defaults.selectors;
    login = elements.login || selectElement(selectors.login);
    logout = elements.logout || selectElement(selectors.logout);
    welcome = elements.welcome || selectElement(selectors.welcome);

    this.element = {
      login: login,
      logout: logout,
      welcome: welcome
    };

    this.onClick(this.element.login, this.onClickLogin.bind(this));
    this.onClick(element.logout, this.onClickLogout.bind(this));

    lock.onSuccess('sign:in', this.onSignedIn.bind(this));
    lock.onSuccess('sign:out', this.onSignedOut.bind(this));
  }

  _createClass(AppAuth, [{
    key: 'onClick',
    value: function onClick(element, cb) {
      this.isFunction(element.click) ? element.click(cb) : bindEvent(element, 'click', cb);
    }
  }, {
    key: 'onClickLogin',
    value: function onClickLogin() {
      this.lock.showLock().subscribeAuthenticated();
    }
  }, {
    key: 'onClickLogout',
    value: function onClickLogout() {
      this.lock.logout();
    }
  }, {
    key: 'hide',
    value: function hide(element) {
      isFunction(element.hide) ? element.hide() : element.classList.add('hide');
    }
  }, {
    key: 'show',
    value: function show(element) {
      isFunction(element.show) ? element.show() : element.classList.remove('hide');
    }
  }, {
    key: 'onSignedOut',
    value: function onSignedOut() {
      this.hideWelcome();
      this.hideLogout();
      this.displayLogin();
    }
  }, {
    key: 'onSignedIn',
    value: function onSignedIn(_ref) {
      var profile = _ref.profile;

      this.hideLogin();
      this.displayLogout();
      this.displayWelcome(profile);
    }
  }, {
    key: 'hideWelcome',
    value: function hideWelcome() {
      this.hide(this.element.welcome);
    }
  }, {
    key: 'hideLogin',
    value: function hideLogin() {
      this.hide(this.element.login);
    }
  }, {
    key: 'hideLogout',
    value: function hideLogout() {
      this.hide(this.element.logout);
    }
  }, {
    key: 'displayLogin',
    value: function displayLogin() {
      this.show(this.element.login);
    }
  }, {
    key: 'displayLogout',
    value: function displayLogout() {
      this.show(this.element.logout);
    }
  }, {
    key: 'displayWelcome',
    value: function displayWelcome(profile) {
      var welcome = this.element.welcome;
      displayWelcomeMsg(profile);
      this.show(welcome);
    }
  }, {
    key: 'welcomeMsg',
    value: function welcomeMsg(profile) {
      return 'Welcome ' + profile.name;
    }
  }, {
    key: 'displayWelcomeMsg',
    value: function displayWelcomeMsg(profile) {
      var welcome = this.element.welcome;
      var msg = this.welcomeMsg(profile);
      isFunction(welcome.text) ? welcome.text(msg) : welcome.textContent = msg;
    }
  }]);

  return AppAuth;
}();

var defaults = {
  selectors: {
    login: '#login',
    logout: '#logout',
    welcome: '#welcome'
  },
  createAppAuth: function createAppAuth(config) {
    return new AppAuth(config);
  },

  onReady: $ ? $(document).ready : onDocReady
};

function configureAppAuth(lock, _ref2) {
  var onReady = _ref2.onReady,
      createAppAuth = _ref2.createAppAuth,
      selectors = _ref2.selectors,
      selectElement = _ref2.selectElement;


  if (!lock) {
    throw new Error('You must pass a lock instance as the first argument to configureAppAuth');
  }
  createAppAuth = createAppAuth || defaults.createAppAuth;
  selectElement = selectElement || defaults.selectElement;
  onReady = onReady || defaults.onReady;

  return onReady(function () {
    createAppAuth(lock, {
      selectElement: selectElement,
      selectors: selectors
    });
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appAuth = __webpack_require__(0);

exports.default = {
  AppAuth: _appAuth.AppAuth,
  configureAppAuth: _appAuth.configureAppAuth,
  onDocReady: _appAuth.onDocReady
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map