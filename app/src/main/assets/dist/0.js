webpackJsonp([0],{

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(78)

/* script */
__vue_exports__ = __webpack_require__(65)

/* template */
var __vue_template__ = __webpack_require__(74)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

module.exports = (typeof Array.from === 'function' ?
  Array.from :
  __webpack_require__(63)
);


/***/ },

/***/ 63:
/***/ function(module, exports) {

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
module.exports = (function() {
  var isCallable = function(fn) {
    return typeof fn === 'function';
  };
  var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };
  var iteratorProp = function(value) {
    if(value != null) {
      if(['string','number','boolean','symbol'].indexOf(typeof value) > -1){
        return Symbol.iterator;
      } else if (
        (typeof Symbol !== 'undefined') &&
        ('iterator' in Symbol) &&
        (Symbol.iterator in value)
      ) {
        return Symbol.iterator;
      }
      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
      else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };
  var getMethod = function(O, P) {
    // Assert: IsPropertyKey(P) is true.
    if (O != null && P != null) {
      // Let func be GetV(O, P).
      var func = O[P];
      // ReturnIfAbrupt(func).
      // If func is either undefined or null, return undefined.
      if(func == null) {
        return void 0;
      }
      // If IsCallable(func) is false, throw a TypeError exception.
      if (!isCallable(func)) {
        throw new TypeError(func + ' is not a function');
      }
      return func;
    }
  };
  var iteratorStep = function(iterator) {
    // Let result be IteratorNext(iterator).
    // ReturnIfAbrupt(result).
    var result = iterator.next();
    // Let done be IteratorComplete(result).
    // ReturnIfAbrupt(done).
    var done = Boolean(result.done);
    // If done is true, return false.
    if(done) {
      return false;
    }
    // Return result.
    return result;
  };

  // The length property of the from method is 1.
  return function from(items /*, mapFn, thisArg */ ) {
    'use strict';

    // 1. Let C be the this value.
    var C = this;

    // 2. If mapfn is undefined, let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;

    var T;
    if (typeof mapFn !== 'undefined') {
      // 3. else
      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError(
          'Array.from: when provided, the second argument must be a function'
        );
      }

      //   b. If thisArg was supplied, let T be thisArg; else let T
      //      be undefined.
      if (arguments.length > 2) {
        T = arguments[2];
      }
      //   c. Let mapping be true (implied by mapFn)
    }

    var A, k;

    // 4. Let usingIterator be GetMethod(items, @@iterator).
    // 5. ReturnIfAbrupt(usingIterator).
    var usingIterator = getMethod(items, iteratorProp(items));

    // 6. If usingIterator is not undefined, then
    if (usingIterator !== void 0) {
      // a. If IsConstructor(C) is true, then
      //   i. Let A be the result of calling the [[Construct]]
      //      internal method of C with an empty argument list.
      // b. Else,
      //   i. Let A be the result of the abstract operation ArrayCreate
      //      with argument 0.
      // c. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C()) : [];

      // d. Let iterator be GetIterator(items, usingIterator).
      var iterator = usingIterator.call(items);

      // e. ReturnIfAbrupt(iterator).
      if (iterator == null) {
        throw new TypeError(
          'Array.from requires an array-like or iterable object'
        );
      }

      // f. Let k be 0.
      k = 0;

      // g. Repeat
      var next, nextValue;
      while (true) {
        // i. Let Pk be ToString(k).
        // ii. Let next be IteratorStep(iterator).
        // iii. ReturnIfAbrupt(next).
        next = iteratorStep(iterator);

        // iv. If next is false, then
        if (!next) {

          // 1. Let setStatus be Set(A, "length", k, true).
          // 2. ReturnIfAbrupt(setStatus).
          A.length = k;

          // 3. Return A.
          return A;
        }
        // v. Let nextValue be IteratorValue(next).
        // vi. ReturnIfAbrupt(nextValue)
        nextValue = next.value;

        // vii. If mapping is true, then
        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
        //   2. If mappedValue is an abrupt completion, return
        //      IteratorClose(iterator, mappedValue).
        //   3. Let mappedValue be mappedValue.[[value]].
        // viii. Else, let mappedValue be nextValue.
        // ix.  Let defineStatus be the result of
        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
        // x. [TODO] If defineStatus is an abrupt completion, return
        //    IteratorClose(iterator, defineStatus).
        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        }
        else {
          A[k] = nextValue;
        }
        // xi. Increase k by 1.
        k++;
      }
      // 7. Assert: items is not an Iterable so assume it is
      //    an array-like object.
    } else {

      // 8. Let arrayLike be ToObject(items).
      var arrayLike = Object(items);

      // 9. ReturnIfAbrupt(items).
      if (items == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        );
      }

      // 10. Let len be ToLength(Get(arrayLike, "length")).
      // 11. ReturnIfAbrupt(len).
      var len = toLength(arrayLike.length);

      // 12. If IsConstructor(C) is true, then
      //     a. Let A be Construct(C, «len»).
      // 13. Else
      //     a. Let A be ArrayCreate(len).
      // 14. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 15. Let k be 0.
      k = 0;
      // 16. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = arrayLike[k];
        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        }
        else {
          A[k] = kValue;
        }
        k++;
      }
      // 17. Let setStatus be Set(A, "length", len, true).
      // 18. ReturnIfAbrupt(setStatus).
      A.length = len;
      // 19. Return A.
    }
    return A;
  };
})();


/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _swiper = __webpack_require__(67);

var _swiper2 = _interopRequireDefault(_swiper);

var _router = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  mounted: function mounted() {
    if (!(this.list && this.list.length === 0)) {
      this.render();
    }
    this.xheight = this.getHeight();
  },

  methods: {
    clickListItem: function clickListItem(item) {
      (0, _router.go)(item.url, this.$router);
      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)));
    },
    buildBackgroundUrl: function buildBackgroundUrl(url) {
      return 'url(' + url + ')';
    },
    render: function render() {
      var _this = this;

      this.swiper = new _swiper2.default({
        container: this.$el,
        direction: this.direction,
        auto: this.auto,
        loop: this.loop,
        interval: this.interval,
        threshold: this.threshold,
        duration: this.duration,
        height: this.height || this._height,
        minMovingDistance: this.minMovingDistance,
        imgList: this.imgList
      }).on('swiped', function (prev, index) {
        _this.current = index;
        _this.index = index;
      });
    },
    rerender: function rerender() {
      var _this2 = this;

      if (!this.$el) {
        return;
      }
      this.$nextTick(function () {
        _this2.index = 0;
        _this2.current = 0;
        _this2.length = _this2.list.length || _this2.$children.length;
        _this2.destroy();
        _this2.render();
      });
    },
    destroy: function destroy() {
      this.swiper && this.swiper.destroy();
    },
    getHeight: function getHeight() {
      // when list.length > 0, it's better to set height or ratio
      var hasHeight = parseInt(this.height, 10);
      if (hasHeight) return this.height;
      if (!hasHeight) {
        if (this.aspectRatio) {
          return this.$el.offsetWidth * this.aspectRatio + 'px';
        }
        return '180px';
      }
    }
  },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    showDots: {
      type: Boolean,
      default: true
    },
    showDescMask: {
      type: Boolean,
      default: true
    },
    dotsPosition: {
      type: String,
      default: 'right'
    },
    dotsClass: String,
    auto: {
      type: Boolean,
      default: true
    },
    loop: Boolean,
    interval: {
      type: Number,
      default: 3000
    },
    threshold: {
      type: Number,
      default: 50
    },
    duration: {
      type: Number,
      default: 300
    },
    height: {
      type: String,
      default: 'auto'
    },
    aspectRatio: Number,
    minMovingDistance: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      current: this.index,
      xheight: '180px',
      length: this.list.length
    };
  },

  watch: {
    list: function list(val) {
      this.rerender();
    },
    current: function current(currentIndex) {
      this.$emit('on-index-change', currentIndex);
    },
    index: function index(val) {
      var _this3 = this;

      if (val !== this.current) {
        this.$nextTick(function () {
          _this3.swiper.go(val);
        });
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  }
};

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _swiper = __webpack_require__(73);

var _swiper2 = _interopRequireDefault(_swiper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        Swiper: _swiper2.default
    },
    methods: {
        updateMainStyle: function updateMainStyle() {
            var menu = this.$el.getElementsByClassName('menu')[0];
            menu.style.height = this.$el.offsetHeight - parseFloat(this.height) + 'px';
        }
    },
    mounted: function mounted() {
        this.updateMainStyle();
        window.addEventListener('resize', this.updateMainStyle);
    },
    destroyed: function destroyed() {
        window.removeEventListener('resize', this.updateMainStyle);
    },
    computed: {},
    data: function data() {
        return {
            height: '200px',
            list: [{
                url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400385458&ampidx=1&ampsn=78f6b8d99715384bdcc7746596d88359&ampscene=19#wechat_redirect',
                img: 'http://img.spd56.cn/www/src/images/act/insure_app.png',
                title: ''
            }, {
                url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400160890&ampidx=1&ampsn=29ef02af25793a11a3f6aec92bfb46c1&ampscene=19#wechat_redirect',
                img: 'http://img.spd56.cn/client/images/banner_volume.jpg',
                title: ''
            }, {
                url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400094682&ampidx=1&ampsn=8231a2053b772b2108784fccc254d28c&ampscene=19#wechat_redirect',
                img: 'http://img.spd56.cn/client/images/loop_login.jpg',
                title: ''
            }]
        };
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arrayFrom = __webpack_require__(62);

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _objectAssign = __webpack_require__(72);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Swiper = function () {
  function Swiper(options) {
    _classCallCheck(this, Swiper);

    this._default = {
      container: '.vux-swiper',
      item: '.vux-swiper-item',
      direction: 'vertical',
      activeClass: 'active',
      threshold: 50,
      duration: 300,
      auto: false,
      loop: false,
      interval: 3000,
      height: 'auto',
      minMovingDistance: 0
    };
    this._options = (0, _objectAssign2.default)(this._default, options);
    this._options.height = this._options.height.replace('px', '');
    this._start = {};
    this._move = {};
    this._end = {};
    this._eventHandlers = {};
    this._prev = this._current = this._goto = 0;
    this._width = this._height = this._distance = 0;
    this._offset = [];
    this.$box = this._options.container;
    this.$container = this._options.container.querySelector('.vux-swiper');
    this.$items = this.$container.querySelectorAll(this._options.item);
    this.count = this.$items.length;
    this._position = []; // used by go event
    this._firstItemIndex = 0;
    if (!this.count) {
      return;
    }
    this._init();
    this._auto();
    this._bind();
    this._onResize();
    return this;
  }

  _createClass(Swiper, [{
    key: '_auto',
    value: function _auto() {
      var me = this;
      me.stop();
      if (me._options.auto) {
        me.timer = setTimeout(function () {
          me.next();
        }, me._options.interval);
      }
    }
  }, {
    key: 'updateItemWidth',
    value: function updateItemWidth() {
      this._width = this.$box.offsetWidth;
      this._distance = this._options.direction === 'horizontal' ? this._width : this._height;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.timer && clearTimeout(this.timer);
    }
  }, {
    key: '_loop',
    value: function _loop() {
      return this._options.loop && this.count >= 3;
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var me = this;
      this.resizeHandler = function () {
        setTimeout(function () {
          me.updateItemWidth();
          me._setOffset();
          me._setTransfrom();
        }, 100);
      };
      window.addEventListener('orientationchange', this.resizeHandler, false);
    }
  }, {
    key: '_init',
    value: function _init() {
      this._height = this._options.height === 'auto' ? 'auto' : this._options.height - 0;
      this.updateItemWidth();
      this._initPosition();
      this._activate(this._current);
      this._setOffset();
      this._setTransfrom();
      if (this._loop()) {
        this._loopRender();
      }
    }
  }, {
    key: '_initPosition',
    value: function _initPosition() {
      for (var i = 0; i < this.count; i++) {
        this._position.push(i);
      }
    }
  }, {
    key: '_movePosition',
    value: function _movePosition(position) {
      var me = this;
      if (position > 0) {
        var firstIndex = me._position.splice(0, 1);
        me._position.push(firstIndex[0]);
      } else if (position < 0) {
        var lastIndex = me._position.pop();
        me._position.unshift(lastIndex);
      }
    }
  }, {
    key: '_setOffset',
    value: function _setOffset() {
      var me = this;
      var index = me._position.indexOf(me._current);
      me._offset = [];
      (0, _arrayFrom2.default)(me.$items).forEach(function ($item, key) {
        me._offset.push((key - index) * me._distance);
      });
    }
  }, {
    key: '_setTransition',
    value: function _setTransition(duration) {
      duration = duration || this._options.duration || 'none';
      var transition = duration === 'none' ? 'none' : duration + 'ms';
      (0, _arrayFrom2.default)(this.$items).forEach(function ($item, key) {
        $item.style.webkitTransition = transition;
        $item.style.transition = transition;
      });
    }
  }, {
    key: '_setTransfrom',
    value: function _setTransfrom(offset) {
      var me = this;
      offset = offset || 0;
      (0, _arrayFrom2.default)(me.$items).forEach(function ($item, key) {
        var distance = me._offset[key] + offset;
        var transform = 'translate3d(' + distance + 'px, 0, 0)';
        if (me._options.direction === 'vertical') {
          transform = 'translate3d(0, ' + distance + 'px, 0)';
        }
        $item.style.webkitTransform = transform;
        $item.style.transform = transform;
      });
    }
  }, {
    key: '_bind',
    value: function _bind() {
      var me = this;
      me.touchstartHandler = function (e) {
        me.stop();
        me._start.x = e.changedTouches[0].pageX;
        me._start.y = e.changedTouches[0].pageY;
        me._setTransition('none');
      };
      me.touchmoveHandler = function (e) {
        me._move.x = e.changedTouches[0].pageX;
        me._move.y = e.changedTouches[0].pageY;
        var distanceX = me._move.x - me._start.x;
        var distanceY = me._move.y - me._start.y;
        var distance = distanceY;
        var noScrollerY = Math.abs(distanceX) > Math.abs(distanceY);
        if (me._options.direction === 'horizontal' && noScrollerY) {
          distance = distanceX;
        }
        if ((me._options.minMovingDistance && Math.abs(distance) >= me._options.minMovingDistance || !me._options.minMovingDistance) && noScrollerY) {
          me._setTransfrom(distance);
        }

        noScrollerY && e.preventDefault();
      };

      me.touchendHandler = function (e) {
        me._end.x = e.changedTouches[0].pageX;
        me._end.y = e.changedTouches[0].pageY;

        var distance = me._end.y - me._start.y;
        if (me._options.direction === 'horizontal') {
          distance = me._end.x - me._start.x;
        }

        distance = me.getDistance(distance);
        if (distance !== 0 && me._options.minMovingDistance && Math.abs(distance) < me._options.minMovingDistance) {
          return;
        }
        if (distance > me._options.threshold) {
          me.move(-1);
        } else if (distance < -me._options.threshold) {
          me.move(1);
        } else {
          me.move(0);
        }

        me._loopRender();
      };

      me.transitionEndHandler = function (e) {
        me._activate(me._current);
        var cb = me._eventHandlers.swiped;
        cb && cb.apply(me, [me._prev, me._current]);
        me._auto();
        me._loopRender();
        e.preventDefault();
      };
      me.$container.addEventListener('touchstart', me.touchstartHandler, false);
      me.$container.addEventListener('touchmove', me.touchmoveHandler, false);
      me.$container.addEventListener('touchend', me.touchendHandler, false);
      me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false);
    }
  }, {
    key: '_loopRender',
    value: function _loopRender() {
      var me = this;
      if (me._loop()) {
        // issue #507 (delete cloneNode)
        if (me._offset[me._offset.length - 1] === 0) {
          me.$container.appendChild(me.$items[0]);
          me._loopEvent(1);
        } else if (me._offset[0] === 0) {
          me.$container.insertBefore(me.$items[me.$items.length - 1], me.$container.firstChild);
          me._loopEvent(-1);
        }
      }
    }
  }, {
    key: '_loopEvent',
    value: function _loopEvent(num) {
      var me = this;
      me._itemDestoy();
      me.$items = me.$container.querySelectorAll(me._options.item);
      me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false);
      me._movePosition(num);
      me._setOffset();
      me._setTransfrom();
    }
  }, {
    key: 'getDistance',
    value: function getDistance(distance) {
      if (this._loop()) {
        return distance;
      } else {
        if (distance > 0 && this._current === 0) {
          return 0;
        } else if (distance < 0 && this._current === this.count - 1) {
          return 0;
        } else {
          return distance;
        }
      }
    }
  }, {
    key: '_moveIndex',
    value: function _moveIndex(num) {
      if (num !== 0) {
        this._prev = this._current;
        this._current += this.count;
        this._current += num;
        this._current %= this.count;
      }
    }
  }, {
    key: '_activate',
    value: function _activate(index) {
      var clazz = this._options.activeClass;
      Array.prototype.forEach.call(this.$items, function ($item, key) {
        $item.classList.remove(clazz);
        if (index === Number($item.dataset.index)) {
          $item.classList.add(clazz);
        }
      });
    }
  }, {
    key: 'go',
    value: function go(index) {
      var me = this;
      me.stop();

      index = index || 0;
      index += this.count;
      index = index % this.count;
      index = this._position.indexOf(index) - this._position.indexOf(this._current);

      me._moveIndex(index);
      me._setOffset();
      me._setTransition();
      me._setTransfrom();
      me._auto();
      return this;
    }
  }, {
    key: 'next',
    value: function next() {
      this.move(1);
      return this;
    }
  }, {
    key: 'move',
    value: function move(num) {
      this.go(this._current + num);
      return this;
    }
  }, {
    key: 'on',
    value: function on(event, callback) {
      if (this._eventHandlers[event]) {
        console.error('[swiper] event ' + event + ' is already register');
      }
      if (typeof callback !== 'function') {
        console.error('[swiper] parameter callback must be a function');
      }
      this._eventHandlers[event] = callback;
      return this;
    }
  }, {
    key: '_itemDestoy',
    value: function _itemDestoy() {
      var _this = this;

      Array.prototype.forEach.call(this.$items, function ($item, key) {
        $item.removeEventListener('webkitTransitionEnd', _this.transitionEndHandler, false);
      });
      /*
      for (let item of this.$items) {
      item.removeEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
      }
      */
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.stop();
      this._current = 0;
      this._setTransfrom(0);
      window.removeEventListener('orientationchange', this.resizeHandler, false);
      this.$container.removeEventListener('touchstart', this.touchstartHandler, false);
      this.$container.removeEventListener('touchmove', this.touchmoveHandler, false);
      this.$container.removeEventListener('touchend', this.touchendHandler, false);
      this._itemDestoy();
    }
  }]);

  return Swiper;
}();

exports.default = Swiper;

/***/ },

/***/ 68:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.go = go;
exports.getUrl = getUrl;
function go(url, $router) {
  if (/^javas/.test(url) || !url) return;
  var useRouter = (typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object' || $router && typeof url === 'string' && !/http/.test(url);
  if (useRouter) {
    $router.go(url);
  } else {
    window.location.href = url;
  }
}

function getUrl(url, $router) {
  // Make sure the href is right in hash mode
  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
    return '#!' + url;
  }
  return url && (typeof url === 'undefined' ? 'undefined' : _typeof(url)) !== 'object' ? url : 'javascript:void(0);';
}

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.menu {\n    padding: 10px 20px;\n}\n.menu table {\n    width: 100%;\n    height: 100%;\n}\n.menu table td {\n    width: 50%;\n}\n.menu table td:nth-child(2n+1) {\n    border-right: 1px solid #d2d2d2;\n}\n.menu table tr:nth-child(1) {\n    border-bottom: 1px solid #d2d2d2;\n}\n.menu [class^=\"icon-\"], [class*=\" icon-\"] {\n    font-size: 50px;\n    margin-bottom: 5px;\n}\n.home-header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 10;\n    width: 100%;\n    height: 60px;\n    background-color: rgba(0, 0, 0, 0.3);\n    box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.4);\n}\n.location {\n    position: absolute;\n    left: 10px;\n    top: 20px;\n    z-index: 10;\n    color: #fff;\n    height: 30px;\n    line-height: 30px;\n    font-size: 18px;\n}\n.location span {\n    vertical-align: middle;\n}\n.notice {\n    position: absolute;\n    right: 0;\n    top: 20px;\n    z-index: 10;\n    background: #000;\n    color: #fff;\n    padding: 0 5px 0 10px;\n    border-radius: 15px 0px 0px 15px;\n    height: 27px;\n    line-height: 27px;\n    font-size: 18px;\n}\n.notice span {\n    line-height: 27px;\n    font-weight: bold;\n}\n", ""]);

// exports


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.vux-slider {\n  overflow: hidden;\n  position: relative;\n}\n.vux-slider > .vux-indicator,\n.vux-slider .vux-indicator-right {\n  position: absolute;\n  right: 15px;\n  bottom: 10px;\n}\n.vux-slider > .vux-indicator > a,\n.vux-slider .vux-indicator-right > a {\n  float: left;\n  margin-left: 6px;\n}\n.vux-slider > .vux-indicator > a > .vux-icon-dot,\n.vux-slider .vux-indicator-right > a > .vux-icon-dot {\n  display: inline-block;\n  vertical-align: middle;\n  width: 6px;\n  height: 6px;\n  border-radius: 3px;\n  background-color: #d0cdd1;\n}\n.vux-slider > .vux-indicator > a > .vux-icon-dot.active,\n.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {\n  background-color: #04BE02;\n}\n.vux-slider > .vux-indicator-center {\n  right: 50%;\n  transform: translateX(50%);\n}\n.vux-slider > .vux-indicator-left {\n  left: 15px;\n  right: auto;\n}\n.vux-slider > .vux-swiper {\n  overflow: hidden;\n  position: relative;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item > a {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: center center no-repeat;\n  background-size: cover;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 1.4em;\n  font-size: 16px;\n  padding: 20px 50px 12px 13px;\n  margin: 0;\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.7) 100%);\n  color: #fff;\n  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal;\n}\n", ""]);

// exports


/***/ },

/***/ 72:
/***/ function(module, exports) {

"use strict";
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(80)

/* script */
__vue_exports__ = __webpack_require__(64)

/* template */
var __vue_template__ = __webpack_require__(77)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },

/***/ 74:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', [_m(0), " ", _h('swiper', {
    attrs: {
      "list": list,
      "height": height,
      "showDots": false,
      "showDescMask": false,
      "auto": ""
    }
  }), " ", _m(1)])
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "home-header"
  }, [_h('div', {
    staticClass: "location"
  }, [_h('span', {
    staticClass: "icon-dingwei"
  }), " ", _h('span', ["北京"])]), " ", _h('div', {
    staticClass: "notice"
  }, [_h('span', {
    staticClass: "icon-xiaoxi"
  })])])
}},function (){with(this) {
  return _h('div', {
    staticClass: "menu"
  }, [_h('table', [_h('tr', [_h('td', [_h('div', {
    staticClass: "icon-anxufahuo"
  }), "按需发货"]), " ", _h('td', [_h('div', {
    staticClass: "icon-zhengchesong"
  }), "整车送"])]), " ", _h('tr', [_h('td', [_h('div', {
    staticClass: "icon-xiaojianpai"
  }), "小件派"]), " ", _h('td')])])])
}}]}

/***/ },

/***/ 77:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "vux-slider"
  }, [_h('div', {
    staticClass: "vux-swiper",
    style: ({
      height: xheight
    })
  }, [_t("default"), " ", _l((list), function(item, index) {
    return _h('div', {
      staticClass: "vux-swiper-item",
      attrs: {
        "data-index": index
      },
      on: {
        "click": function($event) {
          clickListItem(item)
        }
      }
    }, [_h('a', {
      attrs: {
        "href": "javascript:"
      }
    }, [_h('div', {
      staticClass: "vux-img",
      style: ({
        backgroundImage: buildBackgroundUrl(item.img)
      })
    }), " ", (showDescMask) ? _h('p', {
      staticClass: "vux-swiper-desc"
    }, [_s(item.title)]) : _e()])])
  })]), " ", _h('div', {
    directives: [{
      name: "show",
      value: (showDots),
      expression: "showDots"
    }],
    class: [dotsClass, 'vux-indicator', 'vux-indicator-' + dotsPosition]
  }, [_l((length), function(key) {
    return _h('a', {
      attrs: {
        "href": "javascript:"
      }
    }, [_h('i', {
      staticClass: "vux-icon-dot",
      class: {
        'active': key === current
      }
    })])
  })])])
}},staticRenderFns: []}

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
			var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }

});