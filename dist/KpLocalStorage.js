(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["KpLocalStorage"] = factory();
	else
		root["KpLocalStorage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var PriorityQueue = (function () {
	
	    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
	
	    function PriorityQueue() {
	        _classCallCheck(this, PriorityQueue);
	
	        this._serial = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
	        this._queue = [];
	    }
	
	    _createClass(PriorityQueue, [{
	        key: 'getQueue',
	        value: function getQueue() {
	            return this._queue;
	        }
	    }, {
	        key: 'enqueue',
	        value: function enqueue(item) {
	
	            if (!item) {
	                throw new Error('item not found');
	            }
	
	            if (!item.data) {
	                throw new Error('data not found');
	            }
	
	            if (typeof item.priority !== 'number') {
	                throw new TypeError('priority not a number');
	            }
	
	            item.serial = this._serial--;
	            this._queue.push(item);
	            this.moveUp(this._queue.length - 1);
	            return this;
	        }
	    }, {
	        key: 'dequeue',
	        value: function dequeue() {
	            var firstItem = this._queue[0];
	            var lastItem = this._queue.pop();
	            if (this._queue.length > 0) {
	                this._queue[0] = lastItem;
	                this.moveDown(0);
	            }
	            return firstItem;
	        }
	    }, {
	        key: 'top',
	        value: function top() {
	            return this._queue[0];
	        }
	    }, {
	        key: 'remove',
	        value: function remove(data) {
	
	            var removeIndexMap = {};
	
	            for (var i = 0, l = this._queue.length; i < l; i++) {
	
	                if (this._queue[i].data === data) {
	                    removeIndexMap[i] = true;
	                }
	            }
	
	            var copyQueue = this._queue.slice();
	
	            this.clear();
	
	            for (var i = 0, l = copyQueue.length; i < l; i++) {
	                if (!removeIndexMap[i]) {
	                    this.enqueue(copyQueue[i]);
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: 'moveUp',
	        value: function moveUp(pos) {
	
	            var parent = undefined;
	            var swap = undefined;
	
	            while (pos > 0) {
	
	                // 父节点位置为Math.floor(pos/2);
	                parent = pos - 1 >>> 1;
	
	                // pos < parent pos => 交换位置
	                if (this.compare(this._queue[pos], this._queue[parent]) < 0) {
	                    swap = this._queue[parent];
	                    this._queue[parent] = this._queue[pos];
	                    this._queue[pos] = swap;
	                    pos = parent;
	                } else {
	                    break;
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: 'moveDown',
	        value: function moveDown(pos) {
	
	            var last = this._queue.length - 1;
	            var left = undefined;
	            var right = undefined;
	            var minIndex = undefined;
	            var swap = undefined;
	
	            while (true) {
	
	                left = (pos << 1) + 1;
	                right = left + 1;
	                minIndex = pos;
	
	                if (left <= last && this.compare(this._queue[left], this._queue[minIndex])) {
	                    minIndex = left;
	                }
	
	                if (right <= last && this.compare(this._queue[right], this._queue[minIndex])) {
	                    minIndex = right;
	                }
	
	                if (minIndex !== pos) {
	                    swap = this._queue[minIndex];
	                    this._queue[minIndex] = this._queue[pos];
	                    this._queue[pos] = swap;
	                    pos = minIndex;
	                } else {
	                    break;
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: 'compare',
	        value: function compare(item1, item2) {
	            var priority1 = item1.priority;
	            var priority2 = item2.priority;
	
	            if (priority1 === priority2) {
	                priority1 = item1.serial;
	                priority2 = item2.serial;
	            }
	
	            return priority2 - priority1;
	        }
	    }, {
	        key: 'count',
	        value: function count() {
	            return this._queue.length;
	        }
	    }, {
	        key: 'isEmpty',
	        value: function isEmpty() {
	            return !this.count();
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this._queue = [];
	            return this;
	        }
	    }]);
	
	    return PriorityQueue;
	})();
	
	exports['default'] = PriorityQueue;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=KpLocalStorage.js.map