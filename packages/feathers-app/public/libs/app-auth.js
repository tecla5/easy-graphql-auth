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
};

var AppAuth = exports.AppAuth = function () {
  function AppAuth(lock, _ref) {
    var login = _ref.login,
        logout = _ref.logout,
        welcome = _ref.welcome,
        selectors = _ref.selectors;

    _classCallCheck(this, AppAuth);

    if (!lock) {
      throw new Error('You must pass a lock instance as the first argument to the (AppAuth) constructor');
    }

    selectors = selectors || defaults.selectors;
    login = login || selectElement(selectors.login);
    logout = logout || selectElement(selectors.logout);
    welcome = welcome || selectElement(selectors.welcome);

    this.selector = {
      login: login,
      logout: logout,
      welcome: welcome
    };

    this.selector.login.click(function () {
      lock.showLock().subscribeAuthenticated();
    });

    this.selector.logout.click(function () {
      lock.logout();
    });

    lock.onSuccess('sign:in', this.signedIn);
    lock.onSuccess('sign:out', this.signedOut);
  }

  _createClass(AppAuth, [{
    key: 'signedOut',
    value: function signedOut() {
      this.selector.welcome.hide();
      this.selector.login.hide();
      this.selector.logout.show();
    }
  }, {
    key: 'signedIn',
    value: function signedIn(_ref2) {
      var profile = _ref2.profile;

      this.selector.logout.hide();
      this.selector.login.show();
      this.welcome();
    }
  }, {
    key: 'welcome',
    value: function welcome() {
      // this.selector.welcome.text(`Welcome ${profile.name}, you have now been signed in :)`)
      this.selector.welcome.show();
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

  onReady: $ ? $(document).ready : docReady
};

function configureAppAuth(lock, _ref3) {
  var ready = _ref3.ready,
      createAppAuth = _ref3.createAppAuth,
      selectors = _ref3.selectors,
      selectElement = _ref3.selectElement;


  if (!lock) {
    throw new Error('You must pass a lock instance as the first argument to configureAppAuth');
  }
  createAppAuth = createAppAuth || defaults.createAppAuth;
  selectElement = selectElement || defaults.onReady;

  ready = ready || ready(function () {
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