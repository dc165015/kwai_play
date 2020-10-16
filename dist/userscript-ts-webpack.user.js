// ==UserScript==
// @name Kuaishou Website Fullscreen Player
// @namespace http://github.com/dc165015/kwai_play
// @description Play the video/photos in full-size. Use Enter key to enter/quit full screen, Space key to start or pause, ArrorLeft/ArrowRight key to navigate, L key to like/dislike.
// @version 0.1.0
// @require tampermonkey://vendor/jquery.js
// @grant GM.addStyle
// @grant GM_addStyle
// @grant unsafeWindow
// @icon https://static.yximgs.com/udata/pkg/WEB-LIVE/kwai_icon.8f6787d8.ico
// @match https://live.kuaishou.com/u/*
// @match https://live.kuaishou.com/profile/*
// @run-at document-start
// ==/UserScript==
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylesheets_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _lib_hackFeedsFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _lib_hackFeedsFetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_hackFeedsFetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _components_user_profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _components_player_SlidePlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _components_player_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _components_player_PlayerController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);







$(() => {
    Object(_components_history__WEBPACK_IMPORTED_MODULE_2__["saveHistory"])();
    if (window.location.href.match(/\/profile\//)) {
        const user = new _components_user_profile__WEBPACK_IMPORTED_MODULE_3__["UserProfile"]();
        Object.assign(unsafeWindow, { user, $ });
    }
    else if (window.location.href.match(/\/u\//)) {
        const player = _components_player_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__["VideoPlayer"].from() || _components_player_SlidePlayer__WEBPACK_IMPORTED_MODULE_4__["SlidePlayer"].from();
        _components_player_PlayerController__WEBPACK_IMPORTED_MODULE_6__["PlayerController"].amount(player);
        Object.assign(unsafeWindow, { player, $ });
    }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* for picture mode */\n.fullscreen .long-mode {\n  display: block;\n}\n.fullscreen .long-mode img {\n  position: absolute !important;\n  max-height: 100%;\n  width: 100%;\n  height: auto;\n  object-fit: contain;\n  animation: slide getGlobal(\"CONFIG.SLIDE_INTERVAL\")ms ease-in-out;\n  animation-fill-mode: both;\n  animation-direction: alternate;\n}\n.fullscreen .long-mode img.hide {\n  display: none;\n}\n@keyframes slide {\n  0% {\n    opacity: 0.65;\n    transform: scale(1);\n  }\n  35%, 90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.35;\n    transform: scale(1.2);\n  }\n}\n\n/* for video mode */\n.fullscreen .comment-container {\n  position: fixed;\n  z-index: 1002;\n  left: -29%;\n  height: 80%;\n  width: 30%;\n  top: 50%;\n  transform: translateY(-50%);\n}\n.fullscreen .comment-container:hover {\n  left: 0;\n}\n\n.fullscreen {\n  width: 100% !important;\n  height: 100% !important;\n  position: fixed !important;\n  overflow: hidden !important;\n  z-index: 1001 !important;\n  -ms-overflow-style: none;\n  /* Internet Explorer 10+ */\n  scrollbar-width: none;\n  /* Firefox */\n}\n.fullscreen ::-webkit-scrollbar {\n  display: none;\n  /* Safari and Chrome */\n}\n\n.feed-list.collapse li {\n  padding-top: 0 !important;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// @ts-nocheck
(function (window) {
  var ft = window.fetch;

  window.fetch = function (url, data) {
    return new Promise(function (resolve) {
      if (url.match(/m_graphql/)) {
        if (data.body.match(/(private|public)FeedsQuery/)) {
          data.body = data.body.replace(/count":\d*/, 'count":1000');
        }

        resolve(ft(url, data));
      }
    });
  };
})(unsafeWindow);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveHistory", function() { return saveHistory; });
function saveHistory() {
    const oldHistory = window.history;
    const proxyHistory = new Proxy(window, {
        get(target, prop, receiver) {
            if (prop == 'replaceState') {
                return function replaceState() {
                    console.log('App wants to replace hisitory with arguments:', arguments);
                };
            }
            else {
                return Reflect.get(oldHistory, prop, receiver);
            }
        }
    });
    Object.defineProperty(window, 'history', {
        enumerable: true,
        configurable: true,
        get() {
            return proxyHistory;
        }
    });
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfile", function() { return UserProfile; });
/* harmony import */ var src_lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var src_lib_waits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _WorkList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _player_SlidePlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _player_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _player_PlayerController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







class UserProfile {
    constructor() {
        this.url = '';
        this.userId = '';
        this.worksTotal = 0;
        this.playerLoadListeners = new Set();
        this.playerUnLoadListeners = new Set();
        if (this.getUserIdAndProfileUrl()) {
            this.pushProfilePageInHistory();
            this.getProfilePanel();
            this.init();
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.amountController();
            yield this.getWorksTotal();
            this.workList = new _WorkList__WEBPACK_IMPORTED_MODULE_2__["WorkList"](this.worksTotal, this);
            this.watchForPlayer();
        });
    }
    getProfilePanel() {
        this.profileEl = $(_config__WEBPACK_IMPORTED_MODULE_3__["CONFIG"].SELECTORS.PROFILE_PANEL, document.body);
    }
    getUserIdAndProfileUrl() {
        const match = location.href.match(_config__WEBPACK_IMPORTED_MODULE_3__["CONFIG"].MATCHS.PROFILE_URL);
        if (match) {
            const [url, userId] = match;
            this.userId = userId;
            this.url = location.href;
            return { url, userId };
        }
    }
    getStatsEl() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.statsEl || (this.statsEl = yield Object(src_lib_waits__WEBPACK_IMPORTED_MODULE_1__["waitForOnInsert"])(_config__WEBPACK_IMPORTED_MODULE_3__["CONFIG"].SELECTORS.STATS_USERDATA_WORKCOUNT, _config__WEBPACK_IMPORTED_MODULE_3__["CONFIG"].SELECTORS.STATS_USERDATA));
        });
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getStatsEl();
            yield Object(src_lib_waits__WEBPACK_IMPORTED_MODULE_1__["waitForTime"])(2000);
            yield this.getWorksTotal();
        });
    }
    getWorksTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getStatsEl();
            if (!this.worksTotal && this.statsEl) {
                this.worksTotal = Object(src_lib_util__WEBPACK_IMPORTED_MODULE_0__["getNumberInElement"])(this.statsEl);
                if (!this.worksTotal) {
                    yield Object(src_lib_waits__WEBPACK_IMPORTED_MODULE_1__["waitForOnTxtChange"])(this.statsEl.get(0));
                    this.worksTotal = Object(src_lib_util__WEBPACK_IMPORTED_MODULE_0__["getNumberInElement"])(this.statsEl);
                }
            }
            return this.worksTotal;
        });
    }
    pushProfilePageInHistory() {
        window.history.pushState({ userId: this.userId }, document.title, this.url);
    }
    watchForPlayer() {
        var _a;
        const _profileEl = (_a = this.profileEl) === null || _a === void 0 ? void 0 : _a.get(0);
        if (_profileEl) {
            const playerPanelClass = _config__WEBPACK_IMPORTED_MODULE_3__["CONFIG"].SELECTORS.PLAYER_PANEL.substring(1);
            const playerWatcher = new MutationObserver(mutations => mutations.forEach(mutation => {
                var _a, _b;
                (_a = mutation.addedNodes) === null || _a === void 0 ? void 0 : _a.forEach(node => {
                    if (isPlayerPanel(node)) {
                        this.getPlayer(node);
                        this.playerLoadListeners.forEach(listener => listener(this.player, this.workList));
                    }
                });
                (_b = mutation.removedNodes) === null || _b === void 0 ? void 0 : _b.forEach(node => {
                    if (isPlayerPanel(node)) {
                        this.playerUnLoadListeners.forEach(listener => listener(this.player));
                    }
                });
            }));
            playerWatcher.observe(_profileEl, { childList: true });
            function isPlayerPanel(node) {
                return $(node).hasClass(playerPanelClass);
            }
        }
    }
    getPlayer(playerPanel) {
        this.player = _player_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__["VideoPlayer"].from(playerPanel) || _player_SlidePlayer__WEBPACK_IMPORTED_MODULE_4__["SlidePlayer"].from(playerPanel);
    }
    onPlayerLoad(listener) {
        this.playerLoadListeners.add(listener);
    }
    onPlayerUnLoad(listener) {
        var _a;
        this.playerUnLoadListeners.add(listener);
        (_a = this.player) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onWorkListUpdated() {
        var _a;
        if (this.workList)
            (_a = this.player) === null || _a === void 0 ? void 0 : _a.receivePlayList(this.workList);
    }
    amountController() {
        this.onPlayerLoad((player, playList) => {
            _player_PlayerController__WEBPACK_IMPORTED_MODULE_6__["PlayerController"].amount(player, playList);
        });
        this.onPlayerUnLoad(player => {
            _player_PlayerController__WEBPACK_IMPORTED_MODULE_6__["PlayerController"].unamount();
        });
        _player_PlayerController__WEBPACK_IMPORTED_MODULE_6__["PlayerController"].listen();
    }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSafeIndex", function() { return getSafeIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProtoPropDesc", function() { return getProtoPropDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNumberInElement", function() { return getNumberInElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectFirstFound", function() { return selectFirstFound; });
function debounce(callback, interval = 100) {
    let timeout = 0, _this = this;
    return function debounced(...args) {
        if (timeout)
            window.clearTimeout(timeout);
        timeout = window.setTimeout(act, interval);
        function act() {
            timeout = 0;
            callback.apply(_this, args);
        }
    };
}
function getSafeIndex(index, array) {
    const length = array.length;
    return length ? (index % length + length) % length : 0;
}
function getProtoPropDesc(obj, prop) {
    let proto, desc;
    while (proto = Object.getPrototypeOf(obj)) {
        if (desc = Object.getOwnPropertyDescriptor(proto, prop))
            return desc;
        obj = proto;
    }
}
function getNumberInElement(el) {
    el = el instanceof HTMLElement ? $(el) : el;
    return Number(el.text().trim());
}
function selectFirstFound(selectors, container) {
    for (const selector of selectors) {
        const result = $(selector, container);
        if (result.length)
            return result;
    }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForOnInsert", function() { return waitForOnInsert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForOnTxtChange", function() { return waitForOnTxtChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForOn", function() { return waitForOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForBornTimely", function() { return waitForBornTimely; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForTime", function() { return waitForTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForChildrenLoading", function() { return waitForChildrenLoading; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Wait for the element to be insterted. Once it's insterted and it meets the condition,
 * it will return the element.
 *
 * @export
 * @param {string} selector
 * @param {(HTMLElement | string)} context
 * @param {boolean} [doCheckChildrenOnly=false]
 * @param {number} [interval=300]
 * @param {*} [condition=(el: JQuery<HTMLElement>) => !!el.length]
 * @return {*} the element that be waited for.
 */
function waitForOnInsert(selector, context, doCheckChildrenOnly = false, interval = 300, condition = (el) => !!el.length) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = $(selector, context);
        return result.length
            ? result
            : yield waitForOn(selector, { context, interval, condition, checkInsert: true }, { subtree: !doCheckChildrenOnly });
    });
}
function waitForOnTxtChange(target, condition = (el) => !!el.length) {
    return waitForOn(target, { condition, checkTxt: true });
}
function waitForOn(selector, config = {}, observeOption = {}) {
    const defaultConfig = {
        context: document.documentElement,
        interval: 300,
        condition: (el) => !!el.length,
    };
    let observed = getElement(config.context);
    if (!observed) {
        observed = selector instanceof HTMLElement ? selector : $(selector).get(0);
    }
    return new Promise((resolve, reject) => {
        if (!observed) {
            reject(`Cannot find element of ${selector}.`);
        }
        else {
            config = Object.assign(defaultConfig, config);
            const target = selector || observed;
            const delayedChecker = Object(_util__WEBPACK_IMPORTED_MODULE_0__["debounce"])(checker, config.interval);
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    var _a;
                    // no node was inserted
                    if (config.checkInsert && !((_a = mutation.addedNodes) === null || _a === void 0 ? void 0 : _a.length))
                        return;
                    // no text was changed
                    if (config.checkTxt && mutation.type != 'characterData')
                        return;
                    delayedChecker();
                });
            });
            if (config.checkInsert)
                observeOption.childList = true;
            if (config.checkTxt)
                Object.assign(observeOption, { childList: true, subtree: true, characterData: true });
            observer.observe(observed, observeOption);
            function checker() {
                var _a, _b;
                const results = target instanceof HTMLElement ? $(target) : $(target, observed);
                if ((_b = (_a = config.condition) === null || _a === void 0 ? void 0 : _a.call(config, results)) !== null && _b !== void 0 ? _b : true) {
                    resolve(results);
                    observer.disconnect();
                }
                else {
                    reject('Selected element was found, but failed to meet the condition.');
                }
            }
        }
    });
}
function waitForBornTimely(selector, context, interval = 300, maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const startedAt = Date.now();
        checkTimely();
        function checkTimely() {
            const results = $(selector, context);
            if (results.length) {
                resolve(results);
            }
            else if (Date.now() - startedAt > maxWait) {
                reject(`Failed to retrieve $('${selector}') in ${(maxWait / 1000).toFixed()}s.`);
            }
            else {
                window.setTimeout(checkTimely, interval);
            }
        }
    });
}
/**
 * Wait for time in **milliseconds**, if time not specified, it will wait for 1000ms by default.
 * @param [milliSeconds]
 * @returns  A promise that will be resolved after **milliSeconds** past
 */
function waitForTime(milliSeconds = 1000) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => window.setTimeout(resolve, milliSeconds));
    });
}
/**
 * Wait for children loading into the DOM. By watching the insertions into target's children.
 * Think all children were loaded until no more insertions into the target in the idle time span you specified.
 * @param target The target you wait for its children's loading finished.
 * @param idleTimeSpan the time without new child inserted, which you think it will be no more children. default to 100ms.
 * @param maxWaitingTime if there is no insertion in the maxWaitingTime, it means no child was loaded at all
 *        and then report error. Default value is 10s.
 * @returns Return the totoal time spending until all children were loaded. If target not existed, return 0;
 */
function waitForChildrenLoading(target, idleTimeSpan = 100, maxWaitingTime = 10000) {
    return __awaiter(this, void 0, void 0, function* () {
        return !target ? 0 : new Promise((resolve, reject) => {
            const timeout = window.setTimeout(() => reject(`no child loaded at all in ${maxWaitingTime}ms.`), maxWaitingTime);
            const resolver = (observer) => {
                window.clearTimeout(timeout);
                resolve();
                observer === null || observer === void 0 ? void 0 : observer.disconnect();
            };
            const waiter = Object(_util__WEBPACK_IMPORTED_MODULE_0__["debounce"])(resolver, idleTimeSpan);
            const observer = new MutationObserver(mutations => mutations.forEach(mutation => {
                var _a;
                if ((_a = mutation.addedNodes) === null || _a === void 0 ? void 0 : _a.length) {
                    window.clearTimeout(timeout);
                    waiter(observer);
                }
            }));
            observer.observe(target, { childList: true });
        });
    });
}
function getElement(selector) {
    return typeof selector == 'string' ? $(selector).get(0) : selector;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkList", function() { return WorkList; });
/* harmony import */ var _Work__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var src_lib_waits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class WorkList {
    constructor(total = 0, user) {
        this.total = total;
        this.user = user;
        this._works = new Map();
        this.listEl = $(_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.WORK_LIST);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadAllWorks();
            this.presentSortedWorkList();
            this.user.onWorkListUpdated();
        });
    }
    get size() {
        return this.works.size;
    }
    get works() {
        var _a;
        (_a = this.listEl) === null || _a === void 0 ? void 0 : _a.children().each((i, item) => {
            const work = new _Work__WEBPACK_IMPORTED_MODULE_0__["Work"](item);
            const src = work.src;
            if (src) {
                this._works.set(src, work);
            }
        });
        return this._works;
    }
    next(doRecursivelyPlay = false) {
        this.it || (this.it = this.generator());
        const result = this.it.next(doRecursivelyPlay);
        return result.value || undefined;
    }
    *generator() {
        let doRecursivelyPlay = false;
        do {
            for (const work of this.sortByTopFirst()) {
                doRecursivelyPlay = !!(yield work);
            }
        } while (doRecursivelyPlay);
    }
    sortByTopFirst() {
        const list = Array.from(this.works.values());
        list.sort((a, b) => b.likeCount - a.likeCount);
        return this._sortedWorks = list;
    }
    get sortedWorks() {
        var _a;
        return (_a = this._sortedWorks) !== null && _a !== void 0 ? _a : this.sortByTopFirst();
    }
    presentSortedWorkList() {
        const newList = this.sortedWorks.map(work => work.boxEl);
        this.listEl.append(newList);
    }
    get hasMoreWorksToBeLoaded() {
        const amount = this.works.size;
        return amount < this.total || amount >= 1000;
    }
    loadAllWorks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.listEl.addClass('collapse');
            let i = 2, scollY = window.scrollY;
            while (this.hasMoreWorksToBeLoaded) {
                // scroll to the document bottom, to minus the App's threshold is to avoid some works are just 
                window.scrollBy({ top: i *= -1, behavior: 'smooth' });
                yield Object(src_lib_waits__WEBPACK_IMPORTED_MODULE_2__["waitForTime"])(500);
            }
            this.listEl.removeClass('collapse');
            window.scrollTo(0, scrollY);
        });
    }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Work", function() { return Work; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

class Work {
    constructor(boxEl) {
        var _a, _b;
        this.boxEl = boxEl;
        this.contentEl = $(_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].SELECTORS.WORK_CONTENT, boxEl);
        this.src = (_b = (_a = $('img', this.boxEl).attr('src')) === null || _a === void 0 ? void 0 : _a.match(/(.*?\.jpg).*/)) === null || _b === void 0 ? void 0 : _b[1];
    }
    click() {
        var _a;
        (_a = this.contentEl) === null || _a === void 0 ? void 0 : _a.trigger('click');
    }
    get likeCount() {
        var _a;
        return (_a = this._likeCount) !== null && _a !== void 0 ? _a : this.updateLikeCount();
    }
    updateLikeCount() {
        var _a, _b;
        const txt = (_a = $(_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].SELECTORS.WORK_LIKE, this.boxEl).text()) === null || _a === void 0 ? void 0 : _a.trim();
        const [str, count, unit] = (_b = txt.match(/(\d+\.?\d*)(w|m)/)) !== null && _b !== void 0 ? _b : [];
        const level = unit == 'w' && 10000 || unit == 'm' && 100000000 || 1;
        return this._likeCount = Number(count) * level;
    }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFIG", function() { return CONFIG; });
const CONFIG = {
    SLIDE_INTERVAL: 5000,
    MATCHS: {
        PROFILE_URL: /kuaishou\.com\/profile\/(.*)?(\/|\?)?.*/,
    },
    SELECTORS: {
        PROFILE_PANEL: '.profile',
        STATS_USERDATA: '.user-data',
        STATS_USERDATA_WORKCOUNT: '.user-data-item.work',
        PLAYER_PANEL: '.photo-preview',
        PLAYER_CONTAINER: '.player-container',
        VIDEO_PLAYER: '.kwai-player-container-video',
        SLIDE_PLAYER: '.long-mode',
        LIKE_BUTTON: '.like-icon',
        PLAY_BUTTON: '.play-icon',
        NEXTWORK_BUTTONS: [
            '.arrow-right',
            '.photo-preview-btn-next',
            '.end-info-reco-next',
        ],
        PREVWORK_BUTTONS: [
            '.arrow-left',
            '.photo-preview-btn-prev',
            '.end-info-reco-replay',
        ],
        CLOSE_BUTTON: '.close',
        WORK_LIST: '.feed-list',
        WORK_BOX: '.work-card',
        WORK_CONTENT: '.work-card-thumbnail',
        WORK_LIKE: '.work-card-info-data-like',
    }
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlidePlayer", function() { return SlidePlayer; });
/* harmony import */ var _BasePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var src_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


var PhotoSwitchDirection;
(function (PhotoSwitchDirection) {
    PhotoSwitchDirection["NEXT"] = "down";
    PhotoSwitchDirection["PREV"] = "up";
})(PhotoSwitchDirection || (PhotoSwitchDirection = {}));
class SlidePlayer extends _BasePlayer__WEBPACK_IMPORTED_MODULE_0__["BasePlayer"] {
    constructor(playerContainer, player) {
        super(playerContainer, player);
        this.currentIndex = -1;
        this.timeoutPlayHandle = 0;
        this.interval = src_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SLIDE_INTERVAL;
        this.imgs.addClass('hide');
    }
    static from(playerPanel) {
        const playerContainer = $(src_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.PLAYER_CONTAINER, playerPanel);
        const player = $(src_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.SLIDE_PLAYER, playerContainer);
        if (player.length)
            return new this(playerContainer, player);
    }
    play() {
        this.slide(PhotoSwitchDirection.NEXT);
        if (this.doAutoPlay) {
            this.timeoutPlayHandle = window.setTimeout(() => this.play(), this.interval);
        }
    }
    stop() {
        window.clearTimeout(this.timeoutPlayHandle);
        this.timeoutPlayHandle = 0;
    }
    togglePlay() {
        if (this.timeoutPlayHandle) {
            this.stop();
        }
        else {
            this.play();
        }
    }
    stopAutoPlay() {
        super.stopAutoPlay();
        this.timeoutPlayHandle = 0;
    }
    // the imgs may keep comming, so it has to retrieve imgs again.
    get imgs() {
        return $('.long-mode img', this.playerContainer);
    }
    showNextImg() {
        this.slide(PhotoSwitchDirection.NEXT);
    }
    showPrevImg() {
        this.slide(PhotoSwitchDirection.PREV);
    }
    // param j is for slide backward/forward step.
    slide(direction = PhotoSwitchDirection.NEXT) {
        const imgs = this.imgs;
        if (imgs) {
            if (direction == PhotoSwitchDirection.NEXT && this.currentIndex + 1 == imgs.length) {
                this.showNextWork();
            }
            else if (direction == PhotoSwitchDirection.PREV && this.currentIndex == 0) {
                this.showPrevWork();
            }
            else {
                this.currentIndex++;
                this.showTheCurrent(imgs);
            }
        }
    }
    showTheCurrent(imgs) {
        let theCurrent = $(imgs[this.currentIndex]);
        // show the current
        theCurrent.removeClass('hide');
        // hide the current after 1.1 times interval
        setTimeout(() => theCurrent.addClass('hide'), this.interval * 1.1);
    }
    reset() {
        super.reset();
        this.currentIndex = 0;
    }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasePlayer", function() { return BasePlayer; });
/* harmony import */ var src_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


class BasePlayer {
    constructor(playerContainer, originalPlayer) {
        this.playerContainer = playerContainer;
        this.originalPlayer = originalPlayer;
        this.isFullScreen = false;
        this.doAutoPlay = true;
        this.containerNextSibling = this.playerContainer.next();
        this.enterFullScreen();
    }
    toggleLike() {
        this.click(this.likeBtn);
    }
    play() { }
    ;
    stop() { }
    ;
    togglePlay() { }
    ;
    startAutoPlay(playList) {
        if (playList) {
            this.doAutoPlay = true;
            this.playList = playList;
        }
        this.play();
    }
    stopAutoPlay() {
        this.doAutoPlay = false;
    }
    reset() {
        this.stop();
        this.quitFullScreen();
    }
    destroy() {
        this.stop();
        this.originalPlayer.remove();
    }
    get currentPlaySrc() {
        var _a;
        return (_a = this.currentPlay) === null || _a === void 0 ? void 0 : _a.src;
    }
    get nextBtn() {
        return Object(_lib_util__WEBPACK_IMPORTED_MODULE_1__["selectFirstFound"])(src_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].SELECTORS.NEXTWORK_BUTTONS);
    }
    showNextWork() {
        var _a;
        const item = (_a = this.playList) === null || _a === void 0 ? void 0 : _a.next();
        if (item) {
            this.currentPlay = item;
            item.click();
        }
        else {
            this.click(this.nextBtn);
        }
    }
    get prevBtn() {
        return Object(_lib_util__WEBPACK_IMPORTED_MODULE_1__["selectFirstFound"])(src_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].SELECTORS.PREVWORK_BUTTONS);
    }
    showPrevWork() {
        this.click(this.prevBtn);
    }
    get likeBtn() {
        return $(src_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].SELECTORS.LIKE_BUTTON, this.playerContainer);
    }
    click(button) {
        if (button && button.length) {
            button.trigger('click');
        }
        return this;
    }
    switchWork(direction = WorkSwitchDirection.NEXT) {
        if (direction == WorkSwitchDirection.NEXT) {
            this.showNextWork();
        }
        else {
            this.showPrevWork();
        }
    }
    enterFullScreen() {
        this.playerContainer.prependTo(document.body);
        this.playerContainer.addClass('fullscreen');
        this.isFullScreen = true;
    }
    quitFullScreen() {
        this.playerContainer.removeClass('fullscreen');
        // recover to its original location in DOM
        this.containerNextSibling.before(this.playerContainer);
        this.isFullScreen = false;
    }
    toggleFullScreen() {
        this.isFullScreen ? this.quitFullScreen() : this.enterFullScreen();
    }
    receivePlayList(playList) {
        if (playList)
            this.playList = playList;
    }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoPlayer", function() { return VideoPlayer; });
/* harmony import */ var _BasePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var src_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


var VolumeSwitchDirection;
(function (VolumeSwitchDirection) {
    VolumeSwitchDirection["HIGHER"] = "up";
    VolumeSwitchDirection["LOWER"] = "down";
})(VolumeSwitchDirection || (VolumeSwitchDirection = {}));
class VideoPlayer extends _BasePlayer__WEBPACK_IMPORTED_MODULE_0__["BasePlayer"] {
    constructor() {
        super(...arguments);
        this.intervalVideoTimeCheckHandle = 0;
    }
    static from(playerPanel) {
        const playerContainer = $(src_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.PLAYER_CONTAINER, playerPanel);
        const player = $(src_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.VIDEO_PLAYER, playerContainer);
        if (player.length)
            return new this(playerContainer, player);
    }
    get totalVideoTime() {
        this.totalTimer = $('.progress-time-total', this.playerContainer);
        return this.resolveVideoTimer(this.totalTimer);
    }
    get currentVideoTime() {
        this.currentTimer = $('.progress-time-current', this.playerContainer);
        return this.resolveVideoTimer(this.currentTimer);
    }
    get leftVideoTime() {
        return this.totalVideoTime - this.currentVideoTime;
    }
    // the last 6s content is advertisement which shall be skipped. 
    get isADTime() {
        return this.leftVideoTime <= 5.5;
    }
    // Checking the video src to prevent the repeated switchWork effection
    // on the same old work, until the new work is loaded.
    getNewVideoSrc() {
        const currentVideoSrc = $('video', this.playerContainer).attr('src');
        return this.currentVideoSrc == currentVideoSrc ? void 0 : currentVideoSrc;
    }
    get playBtn() {
        return this._playBtn || (this._playBtn = $(src_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.PLAY_BUTTON, this.playerContainer));
    }
    get isPlaying() {
        // when video is playing, the play button has a rect element in svg. Otherwise, it hasn't.
        return this.playBtn && !!$('svg rect', this.playBtn).length;
    }
    play() {
        if (!this.isPlaying) {
            this.click(this.playBtn);
        }
        if (this.doAutoPlay) {
            this.intervalVideoTimeCheckHandle = window.setInterval(() => this.checkIfPlayNextOnEnd(), 500);
        }
    }
    stop() {
        if (this.isPlaying) {
            this.click(this.playBtn);
        }
    }
    stopAutoPlay() {
        super.stopAutoPlay();
        window.clearInterval(this.intervalVideoTimeCheckHandle);
        this.intervalVideoTimeCheckHandle = 0;
    }
    togglePlay() {
        this.click(this.playBtn);
    }
    checkIfPlayNextOnEnd() {
        const newVideoSrc = this.getNewVideoSrc();
        if (this.isADTime && newVideoSrc) {
            this.currentVideoSrc = newVideoSrc;
            this.showNextWork();
        }
    }
    // convert time string "02:01:01" to 7261s
    resolveVideoTimer(timer) {
        const str = timer.text();
        const arr = str.split(':').map(n => Number(n));
        return arr.reduce((total, current) => total = current + total * 60);
    }
    get video() {
        return $('video', this.playerContainer);
    }
    volume(direction = VolumeSwitchDirection.HIGHER) {
        const video = this.video.get(0);
        if (video) {
            let volume = video.volume;
            volume || (volume = 0.1);
            volume = direction == 'up' ? volume *= 1.1 : volume *= 0.9;
            video.volume = volume > 1 ? 1 : volume;
        }
    }
    volumeUp() {
        this.volume(VolumeSwitchDirection.HIGHER);
    }
    volumeDown() {
        this.volume(VolumeSwitchDirection.LOWER);
    }
}
;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerController", function() { return PlayerController; });
/* harmony import */ var _SlidePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


class PlayerController {
    static on(key, actionCallback, filter) {
        const action = filter ? () => filter() && actionCallback() : actionCallback;
        this.commands.set(key, action);
        this.listen();
    }
    static amount(player, playList, newConfig = {}) {
        var _a, _b;
        this.unamount();
        this.config(newConfig);
        this.player = player;
        (_a = this.player) === null || _a === void 0 ? void 0 : _a.receivePlayList(playList);
        (_b = this.player) === null || _b === void 0 ? void 0 : _b.startAutoPlay();
        return this;
    }
    static config(newConfig = {}) {
        this.configuration = Object.assign(this.defaultConfig, newConfig);
        for (let key in this.configuration) {
            this.commands.set(key, this.configuration[key]);
        }
    }
    static unamount() {
        this.player = undefined;
        this.commands.clear();
    }
    static listener(e) {
        const action = PlayerController.commands.get(e.key);
        if (action) {
            e.preventDefault();
            e.stopPropagation();
            action(e);
        }
    }
    static listen() {
        const doc = $(document);
        doc.off('keydown');
        $(document).on('keydown', this.listener);
    }
}
PlayerController.commands = new Map();
PlayerController.defaultConfig = {
    ArrowRight() { var _a; (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.showNextWork(); },
    ArrowLeft() { var _a; (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.showPrevWork(); },
    ArrowUp() {
        var _a, _b;
        PlayerController.player instanceof _SlidePlayer__WEBPACK_IMPORTED_MODULE_0__["SlidePlayer"]
            ? (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.showPrevImg() : (_b = PlayerController.player) === null || _b === void 0 ? void 0 : _b.volumeUp();
    },
    ArrowDown() {
        var _a, _b;
        PlayerController.player instanceof _SlidePlayer__WEBPACK_IMPORTED_MODULE_0__["SlidePlayer"]
            ? (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.showNextImg() : (_b = PlayerController.player) === null || _b === void 0 ? void 0 : _b.volumeDown();
    },
    Enter() { var _a; (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.toggleFullScreen(); },
    l() { var _a; (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.toggleLike(); },
    ' '() { var _a; (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.togglePlay(); },
    Escape(e) {
        var _a;
        (_a = PlayerController.player) === null || _a === void 0 ? void 0 : _a.reset();
        if (e.shiftKey) {
            $(_config_index__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].SELECTORS.CLOSE_BUTTON).trigger('click');
        }
    },
};
;


/***/ })
/******/ ]);