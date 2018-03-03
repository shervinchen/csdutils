/*
 * jsutils v1.0.0
 * jsutils is a library to provide some frequent javascript methods
 *
 * Copyright (c) 2018 csdoker <csd758371536@qq.com>
 * https://github.com/csd758371536/jsutils
 *
 * Licensed under the MIT license.
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.jsutils = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // 声明全局命名空间
  var jsutils = {};
  // 校验工具
  jsutils.checkUtils = {
    // 校验数字类型
    isNumber: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'number';
    },
    // 校验字符串类型
    isString: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'string';
    },
    // 校验对象类型
    isObject: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'object';
    },
    // 校验布尔值类型
    isBoolean: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'boolean';
    },
    // 校验函数类型
    isFunction: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'function';
    },
    // 校验数组类型
    isArray: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'array';
    },
    // 校验日期类型
    isDate: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'date';
    },
    // 校验正则表达式类型
    isRegExp: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'regexp';
    },
    // 校验空值类型
    isNull: function(value) {
      return value === null;
    },
    // 校验undefined值类型
    isUndefined: function(value) {
      return value === undefined;
    },
    // 判断是否是空对象
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    /**
     * 校验日期格式
     * @param {String} value 需要校验的日期字符串
     * @param {String} userFormat  需要验证的日期格式，如'yyyy-mm-dd'或'yyyy.mm.dd'等等
     * jsutils.isValidDate('2016-07-12', 'yyyy-mm-dd'); // true
     * jsutils.isValidDate('2016.07.32', 'yyyy.mm.dd'); // 根据yyyy.mm.dd格式来验证日期,因为没有32号而返回false
     */
    isValidDate: function(value, userFormat) {
      // 设置默认格式
      userFormat = userFormat || 'mm/dd/yyyy';
      // 正则匹配出分隔符,根据分隔符生成日期数据和格式数组
      var delimiter = /[^mdy]/.exec(userFormat)[0];
      theFormat = userFormat.split(delimiter);
      theDate = value.split(delimiter);
      var month, day, year;
      for (var i = 0, len = theFormat.length; i < len; i++) {
        var format = theFormat[i];
        /m/.test(format) && (month = theDate[i]);
        /d/.test(format) && (day = theDate[i]);
        /y/.test(format) && (year = theDate[i]);
      }
      return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
    }
  };
  // 字符串工具
  jsutils.stringUtils = {
    /**
     * 限制文本字数,超出的替换省略号
     * @param {String} str 要限制的文本
     * @param {String} length 要限制的位数
     */
    limitStr: function(str, length) {
      var words = str.split('');
      words.splice(length, words.length - 1);
      return words.join('') + (words.length !== str.split('').length ? '…' : '');
    },
    // 去除字符串的空白字符
    trim: function(str, trimMode) {
      switch (trimMode) {
        case 'left':
          return str.replace(/(^\s+)/g, '');
        case 'right':
          return str.replace(/(\s+$)/g, '');
        case 'all':
          return str.replace(/(^\s+)|\s|(\s+$)/g, '');
        default:
          return str.replace(/(^\s+)|(\s+$)/g, '');
      }
    }
  };
  // 数组工具
  jsutils.arrayUtils = {
    // 对数组进行去重操作
    uniqueArray: function(arr) {
      var newArray = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (newArray.indexOf(arr[i]) < 0) { // indexOf方法不支持IE9以下
          newArray.push(arr[i]);
        }
      }
      return newArray;
    },
    // 对数组进行去重操作方法2
    uniqueArray2: function(arr) {
      var ret = [];
      var hash = {};

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var key = typeof(item) + item;
        if (hash[key] !== 1) {
          ret.push(item);
          hash[key] = 1;
        }
      }
      return ret;
    },
    // 深拷贝
    deepCopy: function(obj) {
      var copy = obj;
      // 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题（不是真正的clone引用变量）
      // 对于 Date
      if (obj instanceof Date) {
        copy = new Date(obj.getDate());
        return copy;
      }
      // 对于Object和Array的遍历，可以使用for in，这样可以保证在在Array对象上扩展的属性也可以正确复制
      // 对于 数组
      if (obj instanceof Array) {
        copy = [];
        for (var key in obj) {
          copy[key] = deepCopy(obj[key]);
        }
        return copy;
      }
      // 对于 Object
      if (obj instanceof Object) {
        copy = {};
        for (var key in obj) {
          //判断属性是否是原型链上的,本身属性才copy
          if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
          }
        }
        return copy;
      }
      // 对于 数字 字符串 布尔 null undefined
      return obj;
    },
    // 复制数组内容
    duplicator: function(arr) {
      return arr.concat(arr);
    }
  };
  // DOM工具
  jsutils.domUtils = {
    hasClass: function(el, cls) {
      cls = this.trim(cls);
      return new RegExp('\\b' + cls + '\\b', 'g').test(el.className);
    },
    addClass: function(el, cls) {
      var clsArray = this.trim(cls).split(/\s+/);
      for (var i = 0, length = clsArray.length; i < length; i++) {
        if (!this.hasClass(el, clsArray[i])) {
          el.className += (' ' + clsArray[i]);
          console.log(el.className);
        }
      }
    },
    removeClass: function(el, cls) {
      var removeClassArray = this.trim(cls).split(/\s+/),
        elClassArray = el.className.split(/\s+/);
      for (var i = 0, length = removeClassArray.length; i < length; i++) {
        var index = elClassArray.indexOf(removeClassArray[i]);
        if (!(index === -1)) {
          elClassArray.splice(index, 1);
        }
      }
      el.className = elClassArray.join(' ');
    }
  };
  // 普通工具
  jsutils.commonUtils = {
    inherits: function(subType, superType) {
      var _prototype = Object.create(superType.prototype);
      _prototype.constructor = subType;
      subType.prototype = _prototype;
    },
    // 判断当前处于哪一个屏幕适配度下
    isBreakPoint: function(bp) {
      //css中的断点
      var bps = [320, 480, 768, 1024, 1366, 1440, 1600, 1920];
      var w = win.innerWidth;
      var min, max;
      for (var i = 0, l = bps.length; i < l; i++) {
        if (bps[i] === bp) {
          min = bps[i - 1] || 0;
          max = bps[i];
          break;
        }
      }
      return w > min && w <= max;
    },
    ajax: function(opts) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          var json = JSON.parse(xmlhttp.responseText);
          opts.success(json);
        }
        if (xmlhttp.readyState === 4 && xmlhttp.status === 404) {
          opts.error();
        }
      }
      var dataStr = '';
      for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';
      }
      dataStr = dataStr.substr(0, dataStr.length - 1);

      if (opts.type.toLowerCase() === 'post') {
        xmlhttp.open(opts.type, opts.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dataStr);
      }
      if (opts.type.toLowerCase() === 'get') {
        xmlhttp.open(opts.type, opts.url + '?' + dataStr, true);
        xmlhttp.send();
      }
    }
  };
  // 事件工具
  jsutils.eventUtils = {
    // 跨浏览器addEvent
    addEvent: function(node, type, handler) {
      if (!node) return false;
      if (node.addEventListener) {
        node.addEventListener(type, handler, false);
        return true;
      } else if (node.attachEvent) {
        node['e' + type + handler] = handler;
        node[type + handler] = function() {
          node['e' + type + handler](win.event);
        };
        node.attachEvent('on' + type, node[type + handler]);
        return true;
      }
      return false;
    },
    // 跨浏览器removeEvent
    removeEvent: function(node, type, handler) {
      if (!node) return false;
      if (node.removeEventListener) {
        node.removeEventListener(type, handler, false);
        return true;
      } else if (node.detachEvent) {
        node.detachEvent('on' + type, node[type + handler]);
        node[type + handler] = null;
        return true;
      }
      return false;
    },
    getEvent: function(event) {
      return event ? event : window.event;
    },
    getTarget: function(event) {
      return event.target || event.srcElement;
    },
    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }
  };
  return jsutils;
}));
