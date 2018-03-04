/*
 * jsutils v1.0.0
 * jsutils is a library to provide some frequent javascript methods
 *
 * Copyright (c) 2018 csdoker <csd758371536@qq.com>
 * https://github.com/csd758371536/jsutils
 *
 * Licensed under the MIT license.
 */
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
      return Object.prototype.toString.call(value).slice(8, -1) === 'Number';
    },
    // 校验字符串类型
    isString: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'String';
    },
    // 校验对象类型
    isObject: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Object';
    },
    // 校验布尔值类型
    isBoolean: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Boolean';
    },
    // 校验函数类型
    isFunction: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Function';
    },
    // 校验数组类型
    isArray: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Array';
    },
    // 校验日期类型
    isDate: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Date';
    },
    // 校验正则表达式类型
    isRegExp: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'RegExp';
    },
    // 校验错误对象
    isError: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Error';
    },
    // 校验Symbol函數
    isSymbol: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Symbol';
    },
    // 校验Promise對象
    isPromise: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Promise';
    },
    // 校验Set對象
    isSet: function(value) {
      return Object.prototype.toString.call(value).slice(8, -1) === 'Set';
    },
    /**
     *
     * @desc   判断是否为邮箱地址
     * @param  {String}  str
     * @return {Boolean}
     */
    isEmail: function(str) {
      return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    },
    /**
     *
     * @desc  判断是否为身份证号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    isIdCard: function(str) {
      return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
    },
    /**
     *
     * @desc   判断是否为手机号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    isPhoneNum: function(str) {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
    },
    /**
     *
     * @desc   判断是否为URL地址
     * @param  {String} str
     * @return {Boolean}
     */
    isUrl: function(str) {
      return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
    },
    /**
     *
     * @desc 判断浏览器是否支持webP格式图片
     * @return {Boolean}
     */
    isSupportWebP: function() {
      return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    },
    /**
     *
     * @desc   判断`obj`是否为空
     * @param  {Object} obj
     * @return {Boolean}
     */
    isEmptyObject2: function(obj) {
      if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false;
      return !Object.keys(obj).length;
    },
    // 校验false
    isFalse: function(value) {
      if (value == '' || value == undefined || value == null || value == 'null' || value == 'undefined' || value == 0 || value == false || isNaN(value)) return true;
      return false;
    },
    // 校验true
    isTrue: function(value) {
      return !this.isFalse(value);
    },
    // 校验ios
    isIos: function() {
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        // return "Android";
        return false;
      } else if (u.indexOf('iPhone') > -1) { //苹果手机
        // return "iPhone";
        return true;
      } else if (u.indexOf('iPad') > -1) { //iPad
        // return "iPad";
        return false;
      } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
        // return "Windows Phone";
        return false;
      } else {
        return false;
      }
    },
    // 校验pc
    isPC: function() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    /**
     *
     * @desc 获取浏览器类型和版本
     * @return {String}
     */
    getExplore: function() {
      var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
      // (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
      //   (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
      //   (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
      //   (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
      //   (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
      //   (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
      //   (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
      if (ua.match(/rv:([\d.]+)\) like gecko/)) {
        s = ua.match(/rv:([\d.]+)\) like gecko/);
        sys.ie = s[1];
      } else if (ua.match(/msie ([\d\.]+)/)) {
        s = ua.match(/msie ([\d\.]+)/);
        sys.ie = s[1];
      } else if (ua.match(/edge\/([\d\.]+)/)) {
        s = ua.match(/edge\/([\d\.]+)/);
        sys.edge = s[1];
      } else if (ua.match(/firefox\/([\d\.]+)/)) {
        s = ua.match(/firefox\/([\d\.]+)/);
        sys.firefox = s[1];
      } else if (ua.match(/(?:opera|opr).([\d\.]+)/)) {
        s = ua.match(/(?:opera|opr).([\d\.]+)/);
        sys.opera = s[1];
      } else if (ua.match(/chrome\/([\d\.]+)/)) {
        s = ua.match(/chrome\/([\d\.]+)/);
        sys.chrome = s[1];
      } else if (ua.match(/version\/([\d\.]+).*safari/)) {
        s = ua.match(/version\/([\d\.]+).*safari/);
        sys.safari = s[1];
      }
      // 根据关系进行判断
      if (sys.ie) return ('IE: ' + sys.ie);
      if (sys.edge) return ('EDGE: ' + sys.edge);
      if (sys.firefox) return ('Firefox: ' + sys.firefox);
      if (sys.chrome) return ('Chrome: ' + sys.chrome);
      if (sys.opera) return ('Opera: ' + sys.opera);
      if (sys.safari) return ('Safari: ' + sys.safari);
      return 'Unkonwn';
    },
    /**
     *
     * @desc 获取操作系统类型
     * @return {String}
     */
    getOS: function() {
      var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
      var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
      var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

      if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
      if (/android/i.test(userAgent)) return 'android';
      if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
      if (/mac/i.test(appVersion)) return 'MacOSX';
      if (/win/i.test(appVersion)) return 'windows';
      if (/linux/i.test(appVersion)) return 'linux';
    },
    // 校验浏览器类型
    browserType: function() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
      var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
      var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
      var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp.$1);
        if (fIEVersion == 7) return "IE7";
        else if (fIEVersion == 8) return "IE8";
        else if (fIEVersion == 9) return "IE9";
        else if (fIEVersion == 10) return "IE10";
        else return "IE7以下"; //IE版本过低
      }
      if (isIE11) return 'IE11';
      if (isEdge) return "Edge";
      if (isFF) return "FF";
      if (isOpera) return "Opera";
      if (isSafari) return "Safari";
      if (isChrome) return "Chrome";
    },
    // 校验字符串
    checkStr: function(str, type) {
      switch (type) {
        case 'phone': //手机号码
          return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str);
        case 'tel': //座机
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': //身份证
          return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
          return /^[a-zA-Z]\w{5,17}$/.test(str);
        case 'postal': //邮政编码
          return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ': //QQ号
          return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email': //邮箱
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money': //金额(小数点2位)
          return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL': //网址
          return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
        case 'IP': //IP
          return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date': //日期时间
          return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
        case 'number': //数字
          return /^[0-9]$/.test(str);
        case 'english': //英文
          return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
          return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower': //小写
          return /^[a-z]+$/.test(str);
        case 'upper': //大写
          return /^[A-Z]+$/.test(str);
        case 'HTML': //HTML标记
          return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
          return true;
      }
    },
    // 校验身份证
    isCardID: function(sId) {
      if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
        alert('你输入的身份证长度或格式错误');
        return false;
      }
      //身份证城市
      var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      if (!aCity[parseInt(sId.substr(0, 2))]) {
        alert('你的身份证地区非法');
        return false;
      }
      // 出生日期验证
      var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
        d = new Date(sBirthday);
      if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
        alert('身份证上的出生日期非法');
        return false;
      }
      // 身份证号码校验
      var sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432";
      for (var i = 0; i < sId.length - 1; i++) {
        sum += sId[i] * weights[i];
      }
      var last = codes[sum % 11]; //计算出来的最后一位身份证号码
      if (sId[sId.length - 1] != last) {
        alert('你输入的身份证号非法');
        return false;
      }
      return true;
    },
    // 校验空值类型
    isNull: function(value) {
      return Object.prototype.toString.call(o).slice(8, -1) === 'Null';
    },
    // 校验undefined值类型
    isUndefined: function(value) {
      return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined';
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
      var theFormat = userFormat.split(delimiter);
      var theDate = value.split(delimiter);
      var month, day, year;
      for (var i = 0, len = theFormat.length; i < len; i++) {
        var format = theFormat[i];
        // /m/.test(format) && (month = theDate[i]);
        // /d/.test(format) && (day = theDate[i]);
        // /y/.test(format) && (year = theDate[i]);
        if (/m/.test(format)) {
          month = theDate[i];
        }
        if (/d/.test(format)) {
          day = theDate[i];
        }
        if (/y/.test(format)) {
          year = theDate[i];
        }
      }
      return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
    }
  };
  // 字符串工具
  jsutils.stringUtils = {
    // 字符串长度截取
    cutstr: function(str, len) {
      var temp;
      var icount = 0;
      var patrn = /[^\x00-\xff]/;
      var strre = "";
      for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
          temp = str.substr(i, 1);
          if (patrn.exec(temp) == null) {
            icount = icount + 1;
          } else {
            icount = icount + 2;
          }
          strre += temp;
        } else {
          break;
        }
      }
      return strre + "...";
    },
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
    /**
     * 去除字符串的空白字符
     * @param {String} str 字符串
     * @param {Number} type 1-所有空格  2-前后空格  3-前空格 4-后空格
     */
    trim: function(str, type) {
      type = type || 1;
      switch (type) {
        case 1:
          return str.replace(/\s+/g, "");
        case 2:
          return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
          return str.replace(/(^\s*)/g, "");
        case 4:
          return str.replace(/(\s*$)/g, "");
        default:
          return str;
      }
    },
    /**
     * 大小写转换
     * @param {String} str 字符串
     * @param {Number} type 1-首字母大写  2-首字母小写  3-大小写转换 4-全部大写 5-全部小写
     */
    changeCase: function(str, type) {
      type = type || 4;

      function ToggleCase(str) {
        var itemText = "";
        str.split("").forEach(
          function(item) {
            if (/^([a-z]+)/.test(item)) {
              itemText += item.toUpperCase();
            } else if (/^([A-Z]+)/.test(item)) {
              itemText += item.toLowerCase();
            } else {
              itemText += item;
            }
          });
        return itemText;
      }
      switch (type) {
        case 1:
          return str.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
          });
        case 2:
          return str.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
          });
        case 3:
          return ToggleCase(str);
          // return str.split('').map( function(word){
          //     if (/[a-z]/.test(word)) {
          //         return word.toUpperCase();
          //     }else{
          //         return word.toLowerCase()
          //     }
          // }).join('')
        case 4:
          return str.toUpperCase();
        case 5:
          return str.toLowerCase();
        default:
          return str;
      }
    },
    // 字符串循环复制
    repeatStr: function(str, count) {
      var text = '';
      for (var i = 0; i < count; i++) {
        text += str;
      }
      return text;
    },
    /**
     * 字符串替换
     * @param {String} str 原字符串
     * @param {String} AFindText 被替换的字符串
     * @param {String} ARepText 替换的字符串
     */
    replaceAll: function(str, AFindText, ARepText) {
      raRegExp = new RegExp(AFindText, "g");
      return str.replace(raRegExp, ARepText);
    },
    /**
     * 字符替换
     * @param {String} str 原字符串
     * @param {String} regArr 字符格式
     * @param {String} type 替换方式
     * @param {String} ARepText 替换的字符（默认*）
     */
    replaceStr: function(str, regArr, type, ARepText) {
      var regtext = '',
        Reg = null,
        replaceText = ARepText || '*';
      //replaceStr('18819322663',[3,5,3],0)
      //result：188*****663
      //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
      if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})';
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2');
      }
      //replaceStr('asdasdasdaa',[3,5,3],1)
      //result：***asdas***
      else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}';
        Reg = new RegExp(regtext);
        var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2);
      }
      //replaceStr('1asd88465asdwqe3',[5],0)
      //result：*****8465asdwqe3
      else if (regArr.length === 1 && type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})';
        Reg = new RegExp(regtext);
        return str.replace(Reg, this.repeatStr(replaceText, regArr[0]));
      }
      //replaceStr('1asd88465asdwqe3',[5],1,'+')
      //result："1asd88465as+++++"
      else if (regArr.length === 1 && type === 1) {
        regtext = '(\\w{' + regArr[0] + '}$)';
        Reg = new RegExp(regtext);
        return str.replace(Reg, this.repeatStr(replaceText, regArr[0]));
      }
    },
    // 检测字符串
    checkType: function(str, type) {
      switch (type) {
        case 'email':
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
          return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
          return /^[0-9]$/.test(str);
        case 'english':
          return /^[a-zA-Z]+$/.test(str);
        case 'text':
          return /^\w+$/.test(str);
        case 'chinese':
          return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
          return /^[a-z]+$/.test(str);
        case 'upper':
          return /^[A-Z]+$/.test(str);
        default:
          return true;
      }
    },
    // 检测密码强度
    checkPwd: function(str) {
      var nowLv = 0;
      if (str.length < 6) {
        return nowLv;
      }
      if (/[0-9]/.test(str)) {
        nowLv++;
      }
      if (/[a-z]/.test(str)) {
        nowLv++;
      }
      if (/[A-Z]/.test(str)) {
        nowLv++;
      }
      if (/[\.|-|_]/.test(str)) {
        nowLv++;
      }
      return nowLv;
    },
    /*过滤html代码(把<>转换)*/
    filterTag: function(str) {
      str = str.replace(/&/ig, "&amp;");
      str = str.replace(/</ig, "&lt;");
      str = str.replace(/>/ig, "&gt;");
      str = str.replace(" ", "&nbsp;");
      return str;
    },
    /**
     * 随机码
     * @param {Number} count 取值范围2-36
     */
    randomWord: function(count) {
      return Math.random().toString(count).substring(2);
    },
    /**
     * 查找字符串位置
     * @param {String} str 字符串
     * @param {String} strSplit 要查找的字符串
     * var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
     * countStr(strTest,'blog')
     * result: 6
     */
    countStr: function(str, strSplit) {
      return str.split(strSplit).length - 1;
    },
    /**
     * 过滤字符串(html标签，表情，特殊字符)
     * 字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
     * 如果需要过滤多种字符，type参数使用,分割，如下栗子
     * 过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
     * var str="asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\#@!()*{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程"
     * jsutils.filterStr(str,'html,WORD,chinese,special','*','%?')
     */
    filterStr: function(str, type, restr, spstr) {
      var typeArr = type.split(','),
        _str = str;
      for (var i = 0, len = typeArr.length; i < len; i++) {
        //是否是过滤特殊符号
        var pattern, regText = '$()[]{}?\|^*+./\"\'+';
        if (typeArr[i] === 'special') {
          //是否有哪些特殊符号需要保留
          if (spstr) {
            var _spstr = spstr.split(""),
              _regText = "[^0-9A-Za-z\\s";
            for (var j = 0, len1 = _spstr.length; j < len1; j++) {
              if (regText.indexOf(_spstr[j]) === -1) {
                _regText += _spstr[j];
              } else {
                _regText += '\\' + _spstr[j];
              }
            }
            _regText += ']';
            pattern = new RegExp(_regText, 'g');
          } else {
            pattern = new RegExp("[^0-9A-Za-z\\s]", 'g');
          }
        }
        var _restr = restr || '';
        switch (typeArr[i]) {
          case 'special':
            _str = _str.replace(pattern, _restr);
            break;
          case 'html':
            _str = _str.replace(/<\/?[^>]*>/g, _restr);
            break;
          case 'emjoy':
            _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
            break;
          case 'word':
            _str = _str.replace(/[a-z]/g, _restr);
            break;
          case 'WORD':
            _str = _str.replace(/[A-Z]/g, _restr);
            break;
          case 'number':
            _str = _str.replace(/[0-9]/g, _restr);
            break;
          case 'chinese':
            _str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
            break;
        }
      }
      return _str;
    },
    /**
     * 格式化处理字符串
     * jsutils.formatText('1234asda567asd890')
     * result："12,34a,sda,567,asd,890"
     * jsutils.formatText('1234asda567asd890',4,' ')
     * result："1 234a sda5 67as d890"
     * jsutils.formatText('1234asda567asd890',4,'-')
     * result："1-234a-sda5-67as-d890"
     */
    formatText: function(str, size, delimiter) {
      var _size = size || 3,
        _delimiter = delimiter || ',';
      var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
      var reg = new RegExp(regText, 'g');
      return str.replace(reg, _delimiter);
    },
    /**
     * 找出最长单词 (Find the Longest word in a String)
     * jsutils.longestWord('Find the Longest word in a String')
     * result：7
     * jsutils.longestWord('Find|the|Longest|word|in|a|String','|')
     * result：7
     */
    longestWord: function(str, splitType) {
      var _splitType = splitType || /\s+/g,
        _max = 0,
        _item = '';
      var strArr = str.split(_splitType);
      strArr.forEach(function(item) {
        if (_max < item.length) {
          _max = item.length;
          _item = item;
        }
      });
      return {
        el: _item,
        max: _max
      };
    },
    /**
     * 句中单词首字母大写 (Title Case a Sentence)
     * jsutils.titleCaseUp('this is a title')
     * result："This Is A Title"
     */
    titleCaseUp: function(str, splitType) {
      var _splitType = splitType || /\s+/g;
      var strArr = str.split(_splitType),
        result = "",
        _this = this;
      strArr.forEach(function(item) {
        result += _this.changeCase(item, 1) + ' ';
      });
      return this.trim(result, 4);
    }
  };
  // 数字工具
  jsutils.numberUtils = {
    //随机返回一个范围的数字
    randomNumber: function(n1, n2) {
      //randomNumber(5,10)
      //返回5-10的随机整数，包括5，10
      if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
      }
      //randomNumber(10)
      //返回0-10的随机整数，包括0，10
      else if (arguments.length === 1) {
        return Math.round(Math.random() * n1);
      }
      //randomNumber()
      //返回0-255的随机整数，包括0，255
      else {
        return Math.round(Math.random() * 255);
      }
    },
    /*随机数范围*/
    random: function(min, max) {
      if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ((max + 1) - min));
      } else {
        return null;
      }
    },
    /**
     *  浮点数取整
     *  @param float_num 传递的小数 如123.456
     *  @returns  int_num 整数 如123
     */
    floatToInt: function(float_num) {
      var temp = float_num;
      // 如果是负数
      if (float_num < 0) {
        temp = Math.abs(float_num);
        return '-' + Math.floor(temp);
      }
      return Math.floor(temp);
    },
    /**
     * 生成4~6位数字验证码
     * @param num 验证码位数
     * @returns code 验证码
     */
    validCode: function(num) {
      if (num < 4 || num > 6 || num == null) {
        console.error('please enter the number between 4 and 6');
      } else {
        return ('000000' + Math.floor(Math.random() * 999999)).slice(-parseInt(num));
      }
    },
    /*将阿拉伯数字翻译成中文的大写数字*/
    numberToChinese: function(num) {
      var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
      var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
      var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
      for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
          case 0:
            re = BB[7] + re;
            break;
          case 4:
            if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
              .test(a[0]))
              re = BB[4] + re;
            break;
          case 8:
            re = BB[5] + re;
            BB[7] = BB[5];
            k = 0;
            break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
          re = AA[0] + re;
        if (a[0].charAt(i) != 0)
          re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
      }

      if (a.length > 1) // 加上小数部分(如果有小数部分)
      {
        re += BB[6];
        for (var j = 0; j < a[1].length; j++)
          re += AA[a[1].charAt(j)];
      }
      if (re == '一十')
        re = "十";
      if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
      return re;
    },
    /*将数字转换为大写金额*/
    changeToChinese: function(Num) {
      //判断如果传递进来的不是字符的话转换为字符
      if (typeof Num == "number") {
        // Num = new String(Num);
        Num = Num.toString();
      }
      Num = Num.replace(/,/g, ""); //替换tomoney()中的“,”
      Num = Num.replace(/ /g, ""); //替换tomoney()中的空格
      Num = Num.replace(/￥/g, ""); //替换掉可能出现的￥字符
      if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return "";
      }
      //字符处理完毕后开始转换，采用前后两部分分别转换
      var part = String(Num).split(".");
      var newchar = "";
      //小数点前进行转化
      for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
          return "";
          //若数量超过拾亿单位，提示
        }
        var tmpnewchar = "";
        var perchar = part[0].charAt(i);
        switch (perchar) {
          case "0":
            tmpnewchar = "零" + tmpnewchar;
            break;
          case "1":
            tmpnewchar = "壹" + tmpnewchar;
            break;
          case "2":
            tmpnewchar = "贰" + tmpnewchar;
            break;
          case "3":
            tmpnewchar = "叁" + tmpnewchar;
            break;
          case "4":
            tmpnewchar = "肆" + tmpnewchar;
            break;
          case "5":
            tmpnewchar = "伍" + tmpnewchar;
            break;
          case "6":
            tmpnewchar = "陆" + tmpnewchar;
            break;
          case "7":
            tmpnewchar = "柒" + tmpnewchar;
            break;
          case "8":
            tmpnewchar = "捌" + tmpnewchar;
            break;
          case "9":
            tmpnewchar = "玖" + tmpnewchar;
            break;
        }
        switch (part[0].length - i - 1) {
          case 0:
            tmpnewchar = tmpnewchar + "元";
            break;
          case 1:
            if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
            break;
          case 2:
            if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
            break;
          case 3:
            if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
            break;
          case 4:
            tmpnewchar = tmpnewchar + "万";
            break;
          case 5:
            if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
            break;
          case 6:
            if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
            break;
          case 7:
            if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
            break;
          case 8:
            tmpnewchar = tmpnewchar + "亿";
            break;
          case 9:
            tmpnewchar = tmpnewchar + "拾";
            break;
        }
        newchar = tmpnewchar + newchar;
      }
      //小数点之后进行转化
      if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
          // alert("小数点之后只能保留两位,系统将自动截断");
          part[1] = part[1].substr(0, 2);
        }
        for (i = 0; i < part[1].length; i++) {
          var tmpnewchar2 = "";
          var perchar2 = part[1].charAt(i);
          switch (perchar2) {
            case "0":
              tmpnewchar2 = "零" + tmpnewchar2;
              break;
            case "1":
              tmpnewchar2 = "壹" + tmpnewchar2;
              break;
            case "2":
              tmpnewchar2 = "贰" + tmpnewchar2;
              break;
            case "3":
              tmpnewchar2 = "叁" + tmpnewchar2;
              break;
            case "4":
              tmpnewchar2 = "肆" + tmpnewchar2;
              break;
            case "5":
              tmpnewchar2 = "伍" + tmpnewchar2;
              break;
            case "6":
              tmpnewchar2 = "陆" + tmpnewchar2;
              break;
            case "7":
              tmpnewchar2 = "柒" + tmpnewchar2;
              break;
            case "8":
              tmpnewchar2 = "捌" + tmpnewchar2;
              break;
            case "9":
              tmpnewchar2 = "玖" + tmpnewchar2;
              break;
          }
          if (i == 0) tmpnewchar2 = tmpnewchar2 + "角";
          if (i == 1) tmpnewchar2 = tmpnewchar2 + "分";
          newchar = newchar + tmpnewchar2;
        }
      }
      //替换所有无用汉字
      while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
      newchar = newchar.replace("零亿", "亿");
      newchar = newchar.replace("亿万", "亿");
      newchar = newchar.replace("零万", "万");
      newchar = newchar.replace("零元", "元");
      newchar = newchar.replace("零角", "");
      newchar = newchar.replace("零分", "");
      if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整";
      }
      return newchar;
    }
  };
  // 数组工具
  jsutils.arrayUtils = {
    /**
     *
     * @desc 判断两个数组是否相等
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {Boolean}
     */
    arrayEqual: function(arr1, arr2) {
      if (arr1 === arr2) return true;
      if (arr1.length != arr2.length) return false;
      for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    },
    /*判断一个元素是否在数组中*/
    contains: function(arr, val) {
      return arr.indexOf(val) != -1 ? true : false;
    },
    /**
     * @param  {arr} 数组
     * @param  {fn} 回调函数
     * @return {undefined}
     */
    each: function(arr, fn) {
      fn = fn || Function;
      var a = [];
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < arr.length; i++) {
        var res = fn.apply(arr, [arr[i], i].concat(args));
        if (res != null) a.push(res);
      }
    },
    /**
     * @param  {arr} 数组
     * @param  {fn} 回调函数
     * @param  {thisObj} this指向
     * @return {Array}
     */
    map: function(arr, fn, thisObj) {
      var scope = thisObj || window;
      var a = [];
      for (var i = 0, j = arr.length; i < j; ++i) {
        var res = fn.call(scope, arr[i], i, this);
        if (res != null) a.push(res);
      }
      return a;
    },
    /**
     * @param  {arr} 数组
     * @param  {type} 1：从小到大   2：从大到小   3：随机
     * @return {Array}
     */
    sort: function(arr, type) {
      return arr.sort(function(a, b) {
        switch (type) {
          case 1:
            return a - b;
          case 2:
            return b - a;
          case 3:
            return Math.random() - 0.5;
          default:
            return arr;
        }
      });
    },
    /*去重*/
    unique: function(arr) {
      if (Array.hasOwnProperty('from')) {
        return Array.from(new Set(arr));
      } else {
        var n = {},
          r = [];
        for (var i = 0; i < arr.length; i++) {
          if (!n[arr[i]]) {
            n[arr[i]] = true;
            r.push(arr[i]);
          }
        }
        return r;
      }
      // 注：上面 else 里面的排重并不能区分 2 和 '2'，但能减少用indexOf带来的性能
      /* 正确排重
      if ( Array.hasOwnProperty('from') ) {
          return Array.from(new Set(arr))
      }else{
          var r = [], NaNBol = true
          for(var i=0; i < arr.length; i++) {
              if (arr[i] !== arr[i]) {
                  if (NaNBol && r.indexOf(arr[i]) === -1) {
                      r.push(arr[i])
                      NaNBol = false
                  }
              }else{
                  if(r.indexOf(arr[i]) === -1) r.push(arr[i])
              }
          }
          return r
      }
       */
    },
    /*求两个集合的并集*/
    union: function(a, b) {
      var newArr = a.concat(b);
      return this.unique(newArr);
    },
    /*求两个集合的交集*/
    intersect: function(a, b) {
      var _this = this;
      a = this.unique(a);
      return this.map(a, function(o) {
        return _this.contains(b, o) ? o : null;
      });
    },
    /*删除其中一个元素*/
    remove: function(arr, ele) {
      var index = arr.indexOf(ele);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    },
    /*将类数组转换为数组的方法*/
    formArray: function(ary) {
      var arr = [];
      if (Array.isArray(ary)) {
        arr = ary;
      } else {
        arr = Array.prototype.slice.call(ary);
      }
      return arr;
    },
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
    // 对数组进行去重操作方法3
    uniqueArray3: function(arr) {
      return arr.filter(function(item, index, self) {
        return self.indexOf(item) === index;
      });
      //es6
      //return Array.from(new Set(arr))
    },
    //数组顺序打乱
    upsetArr: function(arr) {
      return arr.sort(function() {
        return Math.random() - 0.5;
      });
    },
    //数组最大值
    //这一块的封装，主要是针对数字类型的数组
    maxArr: function(arr) {
      return Math.max.apply(null, arr);
    },
    //数组最小值
    minArr: function(arr) {
      return Math.min.apply(null, arr);
    },
    //这一块的封装，主要是针对数字类型的数组
    //数组求和
    sumArr: function(arr) {
      return arr.reduce(function(pre, cur) {
        return pre + cur;
      });
    },
    //数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    covArr: function(arr) {
      return this.sumArr(arr) / arr.length;
    },
    //从数组中随机获取元素
    randomOne: function(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    //回数组（字符串）一个元素出现的次数
    //getEleCount('asd56+asdasdwqe','a')
    //result：3
    //getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    //result：2
    getEleCount: function(obj, ele) {
      var num = 0;
      for (var i = 0, len = obj.length; i < len; i++) {
        if (ele === obj[i]) {
          num++;
        }
      }
      return num;
    },
    //返回数组（字符串）出现最多的几次元素和出现次数
    //arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    //返回值：el->元素，count->次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
    //默认情况，返回所有元素出现的次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
    //传参（rank=3），只返回出现次数排序前三的
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
    //传参（ranktype=1,rank=null），升序返回所有元素出现次数
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
    //传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
    getCount: function(arr, rank, ranktype) {
      var obj = {},
        k, arr1 = [];
      //记录每一元素出现的次数
      for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
          obj[k]++;
        } else {
          obj[k] = 1;
        }
      }
      //保存结果{el-'元素'，count-出现次数}
      for (var o in obj) {
        arr1.push({
          el: o,
          count: obj[o]
        });
      }
      //排序（降序）
      arr1.sort(function(n1, n2) {
        return n2.count - n1.count;
      });
      //如果ranktype为1，则为升序，反转数组
      if (ranktype === 1) {
        arr1 = arr1.reverse();
      }
      var rank1 = rank || arr1.length;
      return arr1.slice(0, rank1);
    },
    //得到n1-n2下标的数组
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
    //result：[5, 6, 7, 8, 9]
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
    //result：[2, 3, 4, 5, 6, 7, 8, 9]
    getArrayNum: function(arr, n1, n2) {
      return arr.slice(n1, n2);
    },
    //筛选数组
    //删除值为'val'的数组元素
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
    //result：["aaa"]   带有'test'的都删除
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
    //result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
    removeArrayForValue: function(arr, val, type) {
      return arr.filter(function(item) {
        return type ? item.indexOf(val) === -1 : item !== val;
      });
    },
    //获取对象数组某些项
    //var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //getOptionArray(arr,'a,c')
    //result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
    //getOptionArray(arr,'b',1)
    //result：[2, 3, 9, 2, 5]
    getOptionArray: function(arr, keys) {
      var newArr = [];
      if (!keys) {
        return arr;
      }
      var _keys = keys.split(','),
        newArrOne = {};
      //是否只是需要获取某一项的值
      if (_keys.length === 1) {
        for (var k = 0, len2 = arr.length; k < len2; k++) {
          newArr.push(arr[k][keys]);
        }
        return newArr;
      }
      for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var j = 0, len1 = _keys.length; j < len1; j++) {
          newArrOne[_keys[j]] = arr[i][_keys[j]];
        }
        newArr.push(newArrOne);
      }
      return newArr;
    },
    //排除数组某些项
    //var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //filterOptionArray(arr,'a')
    //result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
    //filterOptionArray(arr,'a,c')
    //result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
    filterOptionArray: function(arr, keys) {
      var newArr = [];
      var _keys = keys.split(','),
        newArrOne = {};
      for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var key in arr[i]) {
          //如果key不存在排除keys里面,添加数据
          if (_keys.indexOf(key) === -1) {
            newArrOne[key] = arr[i][key];
          }
        }
        newArr.push(newArrOne);
      }
      return newArr;
    },
    //对象数组的排序
    //var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //ecDo.arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
    //result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
    arraySort: function(arr, sortText) {
      if (!sortText) {
        return arr;
      }
      var _sortText = sortText.split(',').reverse(),
        _arr = arr.slice(0);
      for (var i = 0, len = _sortText.length; i < len; i++) {
        _arr.sort(function(n1, n2) {
          return n1[_sortText[i]] - n2[_sortText[i]];
        });
      }
      return _arr;
    },
    //数组扁平化
    steamroller: function(arr) {
      var newArr = [],
        _this = this;
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          // 如果是数组，调用(递归)steamroller 将其扁平化
          // 然后再 push 到 newArr 中
          newArr.push.apply(newArr, _this.steamroller(arr[i]));
        } else {
          // 不是数组直接 push 到 newArr 中
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    //另一种写法
    //steamroller([1,2,[4,5,[1,23]]])
    //[1, 2, 4, 5, 1, 23]
    /*
     * i=0 newArr.push(arr[i])  [1]
     * i=1 newArr.push(arr[i])  [1,2]
     * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArr.push(arr[i]);  [4]
     * 第一次i=2进入后 i=1, newArr.push(arr[i]);  [4，5]
     *  * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArr.push(arr[i]);  [1]
     * 第二次i=2进入后 i=1, newArr.push(arr[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArr = newArr.concat(steamroller(arr[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     */
    //  steamroller: function (arr) {
    //      var newArr = [];
    //      for (var i = 0; i < arr.length; i++) {
    //          if (Array.isArray(arr[i])) {
    //              // 如果是数组，调用(递归)steamroller 将其扁平化
    //              // 然后再 push 到 newArr 中
    //              newArr = newArr.concat(steamroller(arr[i]));
    //          } else {
    //              // 不是数组直接 push 到 newArr 中
    //              newArr.push(arr[i]);
    //          }
    //      }
    //      return newArr;
    //  },
    // 深拷贝
    deepCopy: function(obj) {
      if (typeof obj !== 'object') return;
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    },
    /**
     * @desc 深拷贝，支持常见类型
     * @param {Any} values
     */
    deepClone: function(values) {
      var copy;

      // Handle the 3 simple types, and null or undefined
      if (null == values || "object" != typeof values) return values;

      // Handle Date
      if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
      }

      // Handle Array
      if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
          copy[i] = deepClone(values[i]);
        }
        return copy;
      }

      // Handle Object
      if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
          if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
      }

      throw new Error("Unable to copy values! Its type isn't supported.");
    },
    // deepCopy: function(obj) {
    //   var copy = obj;
    //   // 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题（不是真正的clone引用变量）
    //   // 对于 Date
    //   if (obj instanceof Date) {
    //     copy = new Date(obj.getDate());
    //     return copy;
    //   }
    //   // 对于Object和Array的遍历，可以使用for in，这样可以保证在在Array对象上扩展的属性也可以正确复制
    //   // 对于 数组
    //   if (obj instanceof Array) {
    //     copy = [];
    //     for (var key in obj) {
    //       copy[key] = deepCopy(obj[key]);
    //     }
    //     return copy;
    //   }
    //   // 对于 Object
    //   if (obj instanceof Object) {
    //     copy = {};
    //     for (var key in obj) {
    //       //判断属性是否是原型链上的,本身属性才copy
    //       if (obj.hasOwnProperty(key)) {
    //         copy[key] = deepCopy(obj[key]);
    //       }
    //     }
    //     return copy;
    //   }
    //   // 对于 数字 字符串 布尔 null undefined
    //   return obj;
    // },
    // 复制数组内容
    duplicator: function(arr) {
      return arr.concat(arr);
    }
  };
  // DOM工具
  jsutils.domUtils = {
    /**
     *
     * @desc 获取滚动条距顶部的距离
     */
    getScrollTop: function() {
      return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    },
    /**
     *
     * @desc 设置滚动条距顶部的距离
     */
    setScrollTop: function(value) {
      window.scrollTo(0, value);
      return value;
    },
    /**
     *
     * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
     * @param {HTMLElement} ele
     * @returns { {left: number, top: number} }
     */
    offset: function(ele) {
      var pos = {
        left: 0,
        top: 0
      };
      while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
      }
      return pos;
    },
    requestAnimFrame: function(callback) {
      window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    },
    /**
     *
     * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
     * @param {Number} to
     * @param {Number} duration
     */
    scrollTo: function(to, duration) {
      if (duration < 0) {
        this.setScrollTop(to);
        return;
      }
      var diff = to - this.getScrollTop();
      if (diff === 0) return;
      var step = diff / duration * 10;
      requestAnimationFrame(
        function() {
          if (Math.abs(step) > Math.abs(diff)) {
            this.setScrollTop(this.getScrollTop() + diff);
            return;
          }
          this.setScrollTop(this.getScrollTop() + step);
          if (diff > 0 && this.getScrollTop() >= to || diff < 0 && this.getScrollTop() <= to) {
            return;
          }
          scrollTo(to, duration - 16);
        }
      );
    },
    /**
     *
     * @desc H5软键盘缩回、弹起回调
     * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
     * @param {Function} downCb 当软键盘弹起后，缩回的回调
     * @param {Function} upCb 当软键盘弹起的回调
     */
    windowResize: function(downCb, upCb) {
      var clientHeight = window.innerHeight;
      downCb = typeof downCb === 'function' ? downCb : function() {};
      upCb = typeof upCb === 'function' ? upCb : function() {};
      window.addEventListener('resize', function() {
        var height = window.innerHeight;
        if (height === clientHeight) {
          downCb();
        }
        if (height < clientHeight) {
          upCb();
        }
      });
    },
    $: function(selector) {
      var type = selector.substring(0, 1);
      if (type === '#') {
        if (document.querySelecotor) return document.querySelector(selector);
        return document.getElementById(selector.substring(1));
      } else if (type === '.') {
        if (document.querySelecotorAll) return document.querySelectorAll(selector);
        return document.getElementsByClassName(selector.substring(1));
      } else {
        return document['querySelectorAll' ? 'querySelectorAll' : 'getElementsByTagName'](selector);
      }
    },
    /*检测类名*/
    hasClass1: function(ele, name) {
      return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
    },
    //检测对象是否有哪个类名
    hasClass2: function(obj, classStr) {
      if (obj.className && this.trim(obj.className, 1) !== "") {
        var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
        return (arr.indexOf(classStr) == -1) ? false : true;
      } else {
        return false;
      }
    },
    /*添加类名*/
    addClass1: function(ele, name) {
      if (!this.hasClass(ele, name)) ele.className += " " + name;
    },
    //添加类名
    addClass2: function(obj, classStr) {
      if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
        for (var i = 0, len = obj.length; i < len; i++) {
          if (!this.hasClass(obj[i], classStr)) {
            obj[i].className += " " + classStr;
          }
        }
      } else {
        if (!this.hasClass(obj, classStr)) {
          obj.className += " " + classStr;
        }
      }
    },
    /*删除类名*/
    removeClass1: function(ele, name) {
      if (this.hasClass(ele, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
      }
    },
    //删除类名
    removeClass2: function(obj, classStr) {
      if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
        for (var i = 0, len = obj.length; i < len; i++) {
          if (this.hasClass(obj[i], classStr)) {
            var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
            obj[i].className = obj[i].className.replace(reg, '');
          }
        }
      } else {
        if (this.hasClass(obj, classStr)) {
          var reg1 = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
          obj.className = obj.className.replace(reg1, '');
        }
      }
    },
    //替换类名("被替换的类名","替换的类名")
    replaceClass: function(obj, newName, oldName) {
      this.removeClass(obj, oldName);
      this.addClass(obj, newName);
    },
    /*获取兄弟节点*/
    siblings1: function(ele) {
      console.log(ele.parentNode);
      var chid = ele.parentNode.children,
        eleMatch = [];
      for (var i = 0, len = chid.length; i < len; i++) {
        if (chid[i] != ele) {
          eleMatch.push(chid[i]);
        }
      }
      return eleMatch;
    },
    //获取兄弟节点
    //ecDo.siblings(obj,'#id')
    siblings2: function(obj, opt) {
      var a = []; //定义一个数组，用来存o的兄弟元素
      var p = obj.previousSibling;
      while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
        if (p.nodeType === 1) {
          a.push(p);
        }
        p = p.previousSibling; //最后把上一个节点赋给p
      }
      a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
      var n = obj.nextSibling; //再取o的弟弟
      while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
        if (n.nodeType === 1) {
          a.push(n);
        }
        n = n.nextSibling;
      }
      if (opt) {
        var _opt = opt.substr(1);
        var b = []; //定义一个数组，用于储存过滤a的数组
        if (opt[0] === '.') {
          b = a.filter(function(item) {
            return item.className === _opt;
          });
        } else if (opt[0] === '#') {
          b = a.filter(function(item) {
            return item.id === _opt;
          });
        } else {
          b = a.filter(function(item) {
            return item.tagName.toLowerCase() === opt;
          });
        }
        return b;
      }
      return a;
    },
    /**
     * 获取相邻的元素节点
     * @param {*} node 传入节点
     */
    getNextElement: function(node) {
      var nextSibling = node.nextSibling;
      if (nextSibling) {
        return function() {
          if (nextSibling.nodeType === 1) {
            return nextSibling;
          }
          if (nextSibling.nextSibling) {
            return getNextElement(nextSibling);
          }
          return null;
        }();
      }
      return null;
    },
    /**
     * 在指定节点后插入节点(摘自 JavaScript DOM 编程艺术)
     * @param {*} newNode 新节点
     * @param {*} referenceNode 指定节点
     */
    insertAfter: function(newNode, referenceNode) {
      var parent = referenceNode.parentNode;
      if (referenceNode === parent.lastChild) { // 检测目标元素是不是 parent 的最后一个子元素
        parent.appendChild(newNode);
      } else {
        parent.insertBefore(newNode, referenceNode.nextSibling);
      }
    },
    /*获取行间样式属性*/
    getByStyle: function(obj, name) {
      if (obj.currentStyle) {
        return obj.currentStyle[name];
      } else {
        return getComputedStyle(obj, false)[name];
      }
    },
    //设置样式
    css: function(obj, json) {
      for (var attr in json) {
        obj.style[attr] = json[attr];
      }
    },
    //设置HTML内容
    html: function(obj) {
      if (arguments.length === 1) {
        return obj.innerHTML;
      } else if (arguments.length === 2) {
        obj.innerHTML = arguments[1];
      }
    },
    //设置HTML内容
    text: function(obj) {
      if (arguments.length === 1) {
        return obj.innerHTML;
      } else if (arguments.length === 2) {
        obj.innerHTML = this.filterStr(arguments[1], 'html');
      }
    },
    //显示隐藏
    show: function(obj) {
      var blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', ''];
      if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
        obj.style.display = 'inline';
      } else {
        obj.style.display = 'block';
      }
    },
    hide: function(obj) {
      obj.style.display = "none";
    }
  };
  // 日期工具
  jsutils.dateUtils = {
    //是否闰年
    isLeapYear: function(year) {
      return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    },
    /**
     * @desc   格式化${startTime}距现在的已过时间
     * @param  {Date} startTime
     * @return {String}
     */
    formatPassTime: function(startTime) {
      var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
      if (year) return year + "年前";
      if (month) return month + "个月前";
      if (day) return day + "天前";
      if (hour) return hour + "小时前";
      if (min) return min + "分钟前";
      else return '刚刚';
    },
    /**
     *
     * @desc   格式化现在距${endTime}的剩余时间
     * @param  {Date} endTime
     * @return {String}
     */
    formatRemainTime: function(endTime) {
      var startDate = new Date(); //开始时间
      var endDate = new Date(endTime); //结束时间
      var t = endDate.getTime() - startDate.getTime(); //时间差
      var d = 0,
        h = 0,
        m = 0,
        s = 0;
      if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
      }
      return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
    },
    /**
     * @desc   判断是否为同一天
     * @param  {Date} date1
     * @param  {Date} date2 可选／默认值：当天
     * @return {Boolean}
     */
    isSameDay: function(date1, date2) {
      if (!date2) {
        date2 = new Date();
      }
      var date1_year = date1.getFullYear(),
        date1_month = date1.getMonth() + 1,
        date1_date = date1.getDate();
      var date2_year = date2.getFullYear(),
        date2_month = date2.getMonth() + 1,
        date2_date = date2.getDate();
      return date1_date === date2_date && date1_month === date2_month && date1_year === date2_year;
    },
    /**
     * 格式化时间
     *
     * @param  {time} 时间
     * @param  {cFormat} 格式
     * @return {String} 字符串
     *
     * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
     */
    formatTime: function(time, cFormat) {
      if (arguments.length === 0) return null;
      if ((time + '').length === 10) {
        time = +time * 1000;
      }
      var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}',
        date;
      if (typeof time === 'object') {
        date = time;
      } else {
        date = new Date(time);
      }
      var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function(result, key) {
        var value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
          value = '0' + value;
        }
        return value || 0;
      });
      return time_str;
    },
    /**
     * 返回指定长度的月份集合
     *
     * @param  {time} 时间
     * @param  {len} 长度
     * @param  {dire} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
     * @return {Array} 数组
     *
     * @example   getMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
     */
    getMonths: function(time, len, dire) {
      var mm = new Date(time).getMonth(),
        yy = new Date(time).getFullYear(),
        direction = isNaN(dire) ? 3 : dire,
        index = mm;
      var cutMonth = function(index) {
        if (index <= len && index >= -len) {
          return direction === 1 ? formatPre(index).concat(cutMonth(++index)) :
            direction === 2 ? formatNext(index).concat(cutMonth(++index)) : formatCurr(index).concat(cutMonth(++index));
        }
        return [];
      };
      var formatNext = function(i) {
        var y = Math.floor(i / 12),
          m = i % 12;
        return [yy + y + '-' + (m + 1)];
      };
      var formatPre = function(i) {
        var y = Math.ceil(i / 12),
          m = i % 12;
        m = m === 0 ? 12 : m;
        return [yy - y + '-' + (13 - m)];
      };
      var formatCurr = function(i) {
        var y = Math.floor(i / 12),
          yNext = Math.ceil(i / 12),
          m = i % 12,
          mNext = m === 0 ? 12 : m;
        return [yy - yNext + '-' + (13 - mNext), yy + y + '-' + (m + 1)];
      };
      // 数组去重
      var unique = function(arr) {
        if (Array.hasOwnProperty('from')) {
          return Array.from(new Set(arr));
        } else {
          var n = {},
            r = [];
          for (var i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
              n[arr[i]] = true;
              r.push(arr[i]);
            }
          }
          return r;
        }
      };
      return direction !== 3 ? cutMonth(index) : unique(cutMonth(index).sort(function(t1, t2) {
        return new Date(t1).getTime() - new Date(t2).getTime();
      }));
    },
    /**
     * 返回指定长度的天数集合
     *
     * @param  {time} 时间
     * @param  {len} 长度
     * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
     * @return {Array} 数组
     *
     * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
     */
    getDays: function(time, len, diretion) {
      var tt = new Date(time);
      var getDay = function(day) {
        var t = new Date(time);
        t.setDate(t.getDate() + day);
        var m = t.getMonth() + 1;
        return t.getFullYear() + '-' + m + '-' + t.getDate();
      };
      var arr = [];
      if (diretion === 1) {
        for (var i = 1; i <= len; i++) {
          arr.unshift(getDay(-i));
        }
      } else if (diretion === 2) {
        for (var k = 1; k <= len; k++) {
          arr.push(getDay(k));
        }
      } else {
        for (var j = 1; j <= len; j++) {
          arr.unshift(getDay(-j));
        }
        arr.push(tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate());
        for (var n = 1; n <= len; n++) {
          arr.push(getDay(n));
        }
      }
      return diretion === 1 ? arr.concat([tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()]) :
        diretion === 2 ? [tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()].concat(arr) : arr;
    },
    /**
     * @param  {s} 秒数
     * @return {String} 字符串
     *
     * @example formatHMS(3610) // -> 1h0m10s
     */
    formatHMS: function(s) {
      var str = '';
      if (s > 3600) {
        str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's';
      } else if (s > 60) {
        str = Math.floor(s / 60) + 'm' + s % 60 + 's';
      } else {
        str = s % 60 + 's';
      }
      return str;
    },
    /*获取某月有多少天*/
    getMonthOfDay: function(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var mouth = date.getMonth() + 1;
      var days;

      //当月份为二月时，根据闰年还是非闰年判断天数
      if (mouth == 2) {
        days = (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) ? 28 : 29;
      } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
      } else {
        //其他月份，天数为：30.
        days = 30;
      }
      return days;
    },
    /*获取某年有多少天*/
    getYearOfDay: function(time) {
      var firstDayYear = this.getFirstDayOfYear(time);
      var lastDayYear = this.getLastDayOfYear(time);
      var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
      return Math.ceil(numSecond / (24 * 3600));
    },
    /*获取某年的第一天*/
    getFirstDayOfYear: function(time) {
      var year = new Date(time).getFullYear();
      return year + "-01-01 00:00:00";
    },
    /*获取某年最后一天*/
    getLastDayOfYear: function(time) {
      var year = new Date(time).getFullYear();
      var dateString = year + "-12-01 00:00:00";
      var endDay = this.getMonthOfDay(dateString);
      return year + "-12-" + endDay + " 23:59:59";
    },
    /*获取某个日期是当年中的第几天*/
    getDayOfYear: function(time) {
      var firstDayYear = this.getFirstDayOfYear(time);
      var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
      return Math.ceil(numSecond / (24 * 3600));
    },
    /*获取某个日期在这一年的第几周*/
    getDayOfYearWeek: function(time) {
      var numdays = this.getDayOfYear(time);
      return Math.ceil(numdays / 7);
    },
    /*距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
     * 如-1表示昨天的日期，0表示今天，2表示后天
     */
    fromToday: function(days) {
      var today = new Date();
      today.setDate(today.getDate() + days);
      var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      return date;
    },
    //到某一个时间的倒计时
    //getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime: function(endTime) {
      var startDate = new Date(); //开始时间，当前时间
      var endDate = new Date(endTime); //结束时间，需传入时间参数
      var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
      var d = 0,
        h = 0,
        m = 0,
        s = 0;
      if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
      }
      return {
        d: d,
        h: h,
        m: m,
        s: s
      };
    }
  };
  // HTTP工具
  jsutils.httpUtils = {
    /* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
    //  ajax({
    //  	type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    //  })
    ajax1: function(obj) {
      obj = obj || {};
      obj.type = obj.type.toUpperCase() || 'POST';
      obj.url = obj.url || '';
      obj.async = obj.async || true;
      obj.data = obj.data || null;
      obj.success = obj.success || function() {};
      obj.error = obj.error || function() {};
      var xmlHttp = null;
      if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
      } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
      }
      var params = [];
      for (var key in obj.data) {
        params.push(key + '=' + obj.data[key]);
      }
      var postData = params.join('&');
      if (obj.type.toUpperCase() === 'POST') {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
      } else if (obj.type.toUpperCase() === 'GET') {
        xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
        xmlHttp.send(null);
      }
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          obj.success(xmlHttp.responseText);
        } else {
          obj.error(xmlHttp.responseText);
        }
      };
    },
    /*
        let url = 'http://demo.com/api'
        例:
            ajax({
                url: url,
                success: function(data) {

                }
            })
    */
    ajax2: function(setting) {
      //设置参数的初始值
      var opts = {
        method: (setting.method || "GET").toUpperCase(), //请求方式
        url: setting.url || "", // 请求地址
        async: setting.async || true, // 是否异步
        dataType: setting.dataType || "json", // 解析方式
        data: setting.data || "", // 参数
        success: setting.success || function() {}, // 请求成功回调
        error: setting.error || function() {} // 请求失败回调
      };

      // 参数格式化
      function params_format(obj) {
        var str = '';
        for (var i in obj) {
          str += i + '=' + obj[i] + '&';
        }
        return str.split('').slice(0, -1).join('');
      }

      // 创建ajax对象
      var xhr = new XMLHttpRequest();

      // 连接服务器open(方法GET/POST，请求地址， 异步传输)
      if (opts.method == 'GET') {
        xhr.open(opts.method, opts.url + "?" + params_format(opts.data), opts.async);
        xhr.send();
      } else {
        xhr.open(opts.method, opts.url, opts.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(opts.data);
      }

      /*
       ** 每当readyState改变时，就会触发onreadystatechange事件
       ** readyState属性存储有XMLHttpRequest的状态信息
       ** 0 ：请求未初始化
       ** 1 ：服务器连接已建立
       ** 2 ：请求已接受
       ** 3 : 请求处理中
       ** 4 ：请求已完成，且相应就绪
       */
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
          switch (opts.dataType) {
            case "json":
              var json = JSON.parse(xhr.responseText);
              opts.success(json);
              break;
            case "xml":
              opts.success(xhr.responseXML);
              break;
            default:
              opts.success(xhr.responseText);
              break;
          }
        }
      };

      xhr.onerror = function(err) {
        opts.error(err);
      };
    }
    /*
        let url = 'http://demo.com/api'
        例:
            fetchHttp(url).
                then( res => {
                    console.log(res)
                }).catch( e => {
                    console.log(e)
                })
            fetchHttp(url, {
                method: 'POST',
            })
    */
    // fetchHttp: function(url, setting) {
    //   //设置参数的初始值
    //   let opts = {
    //     method: (setting.method || 'GET').toUpperCase(), //请求方式
    //     headers: setting.headers || {}, // 请求头设置
    //     credentials: setting.credentials || true, // 设置cookie是否一起发送
    //     body: setting.body || {},
    //     mode: setting.mode || 'cors', // 可以设置 cors, no-cors, same-origin
    //     redirect: setting.redirect || 'follow', // follow, error, manual
    //     cache: setting.cache || 'default' // 设置 cache 模式 (default, reload, no-cache)
    //   };
    //   let dataType = setting.dataType || "json", // 解析方式
    //     data = setting.data || ""; // 参数
    //
    //   // 参数格式化
    //   function params_format(obj) {
    //     var str = '';
    //     for (var i in obj) {
    //       str += `${i}=${obj[i]}&`;
    //     }
    //     return str.split('').slice(0, -1).join('');
    //   }
    //
    //   if (opts.method === 'GET') {
    //     url = url + (data ? `?${params_format(data)}` : '');
    //   } else {
    //     setting.body = data || {};
    //   }
    //   return new Promise(function(resolve, reject) {
    //     fetch(url, opts).then(async res => {
    //       let data = dataType === 'text' ? await res.text() :
    //         dataType === 'blob' ? await res.blob() : await res.json()
    //       resolve(data);
    //     }).catch(e => {
    //       reject(e);
    //     })
    //   });
    // }
  };
  // 存储工具
  jsutils.storageUtils = {
    ls: window.localStorage,
    ss: window.sessionStorage,
    //设置cookie
    setCookie: function(name, value, day) {
      var setting = arguments[0];
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (var i in setting) {
          var oDate1 = new Date();
          oDate1.setDate(oDate1.getDate() + day);
          document.cookie = i + '=' + setting[i] + ';expires=' + oDate1;
        }
      } else {
        var oDate2 = new Date();
        oDate2.setDate(oDate2.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + oDate2;
      }
    },
    //获取cookie
    getCookie: function(name) {
      var arr = document.cookie.replace(/\s/g, "").split('; ');
      for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
          return decodeURIComponent(tempArr[1]);
        }
      }
      return '';
    },
    //删除cookie
    removeCookie: function(name) {
      this.setCookie(name, 1, -1);
    },
    // 检查是否含有某cookie
    hasCookie: function(name) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    /*设置localStorage*/
    setLocal: function(key, val) {
      var setting = arguments[0];
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (var i in setting) {
          this.ls.setItem(i, JSON.stringify(setting[i]));
        }
      } else {
        this.ls.setItem(key, JSON.stringify(val));
      }
    },
    /*获取localStorage*/
    getLocal: function(key) {
      if (key) return JSON.parse(this.ls.getItem(key));
      return null;
    },
    /*移除localStorage*/
    removeLocal: function(key) {
      this.ls.removeItem(key);
    },
    /*移除所有localStorage*/
    clearLocal: function() {
      this.ls.clear();
    },
    /*设置sessionStorage*/
    setSession: function(key, val) {
      var setting = arguments[0];
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
        for (var i in setting) {
          this.ss.setItem(i, JSON.stringify(setting[i]));
        }
      } else {
        this.ss.setItem(key, JSON.stringify(val));
      }
    },
    /*获取sessionStorage*/
    getSession: function(key) {
      if (key) return JSON.parse(this.ss.getItem(key));
      return null;
    },
    /*移除sessionStorage*/
    removeSession: function(key) {
      this.ss.removeItem(key);
    },
    /*移除所有sessionStorage*/
    clearSession: function() {
      this.ss.clear();
    }
  };
  // 普通工具
  jsutils.commonUtils = {
    keyCodeMap: {
      8: 'Backspace',
      9: 'Tab',
      13: 'Enter',
      16: 'Shift',
      17: 'Ctrl',
      18: 'Alt',
      19: 'Pause',
      20: 'Caps Lock',
      27: 'Escape',
      32: 'Space',
      33: 'Page Up',
      34: 'Page Down',
      35: 'End',
      36: 'Home',
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down',
      42: 'Print Screen',
      45: 'Insert',
      46: 'Delete',

      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',

      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',

      91: 'Windows',
      93: 'Right Click',

      96: 'Numpad 0',
      97: 'Numpad 1',
      98: 'Numpad 2',
      99: 'Numpad 3',
      100: 'Numpad 4',
      101: 'Numpad 5',
      102: 'Numpad 6',
      103: 'Numpad 7',
      104: 'Numpad 8',
      105: 'Numpad 9',
      106: 'Numpad *',
      107: 'Numpad +',
      109: 'Numpad -',
      110: 'Numpad .',
      111: 'Numpad /',

      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',

      144: 'Num Lock',
      145: 'Scroll Lock',
      182: 'My Computer',
      183: 'My Calculator',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    },
    /**
     * @desc 根据keycode获得键名
     * @param  {Number} keycode
     * @return {String}
     */
    getKeyName: function(keycode) {
      if (this.keyCodeMap[keycode]) {
        return this.keyCodeMap[keycode];
      } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
      }
    },
    //适配rem
    getFontSize: function(_client) {
      var doc = document,
        win = window;
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
          if (clientWidth > _client) {
            clientWidth = _client;
          }
          //设置根元素font-size大小
          docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
        };
      //屏幕大小改变，或者横竖屏切换时，触发函数
      win.addEventListener(resizeEvt, recalc, false);
      //文档加载完成时，触发函数
      doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    /*获取十六进制随机颜色*/
    getRandomColor: function() {
      return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h;
      })((Math.random() * 0x1000000 << 0).toString(16));
    },
    //随进产生颜色
    randomColor: function() {
      //randomNumber是下面定义的函数
      //写法1
      //return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';

      //写法2
      return '#' + Math.random().toString(16).substring(2).substr(0, 6);

      //写法3
      //var color='#',_index=this.randomNumber(15);
      //for(var i=0;i<6;i++){
      //color+='0123456789abcdef'[_index];
      //}
      //return color;

      // 写法4
      // return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },
    /*图片加载*/
    imgLoadAll: function(arr, callback) {
      var arrImg = [];
      for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = arr[i];
        img.onload = function() {
          arrImg.push(this);
          if (arrImg.length == arr.length) {
            // callback && callback();
            if (callback) {
              callback();
            }
          }
        };
      }
    },
    /*音频加载*/
    loadAudio: function(src, callback) {
      var audio = new Audio(src);
      audio.onloadedmetadata = callback;
      audio.src = src;
    },
    /*DOM转字符串*/
    domToStirng: function(htmlDOM) {
      var div = document.createElement("div");
      div.appendChild(htmlDOM);
      return div.innerHTML;
    },
    /*字符串转DOM*/
    stringToDom: function(htmlString) {
      var div = document.createElement("div");
      div.innerHTML = htmlString;
      return div.children[0];
    },
    /**
     * 光标所在位置插入字符，并设置光标位置
     *
     * @param {dom} 输入框
     * @param {val} 插入的值
     * @param {posLen} 光标位置处在 插入的值的哪个位置
     */
    setCursorPosition: function(dom, val, posLen) {
      var cursorPosition = 0;
      if (dom.selectionStart) {
        cursorPosition = dom.selectionStart;
      }
      this.insertAtCursor(dom, val);
      dom.focus();
      console.log(posLen);
      dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length));
    },
    /*光标所在位置插入字符*/
    insertAtCursor: function(dom, val) {
      if (document.selection) {
        dom.focus();
        sel = document.selection.createRange();
        sel.text = val;
        sel.select();
      } else if (dom.selectionStart || dom.selectionStart == '0') {
        var startPos = dom.selectionStart;
        var endPos = dom.selectionEnd;
        var restoreTop = dom.scrollTop;
        dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
        if (restoreTop > 0) {
          dom.scrollTop = restoreTop;
        }
        dom.focus();
        dom.selectionStart = startPos + val.length;
        dom.selectionEnd = startPos + val.length;
      } else {
        dom.value += val;
        dom.focus();
      }
    },
    /**
     * 重定向到 URL
     * @param {*} url 待跳转 URL
     * @param {*} aslink 默认为 true, 传 false 时，你不能通过 “前进” 和 “后退” 来访问已经被替换的 URL
     */
    redirect: function(url, aslink) {
      if (aslink) {
        window.location.href = url;
      } else {
        window.location.replace(url);
      }
      // aslink ? window.location.href = url : window.location.replace(url);
    },
    // 获取域名主机
    getHost: function(url) {
      var host = "null";
      if (typeof url == "undefined" || null == url) {
        url = window.location.href;
      }
      var regex = /^\w+\:\/\/([^\/]*).*/;
      var match = url.match(regex);
      if (typeof match != "undefined" && null != match) {
        host = match[1];
      }
      return host;
    },
    //设置url参数
    //setUrlPrmt({'a':1,'b':2})
    //result：a=1&b=2
    setUrlPrmt: function(obj) {
      var _rs = [];
      for (var p in obj) {
        if (obj[p] != null && obj[p] != '') {
          _rs.push(p + '=' + obj[p]);
        }
      }
      return _rs.join('&');
    },
    /*获取网址参数*/
    getURL: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = decodeURI(window.location.search).substr(1).match(reg);
      if (r != null) return r[2];
      return null;
    },
    /*
     * 获取URL地址里的指定参数
     * @param name 需要获取到的参数
     * 如：www.xxx.com?code="abc"------getUrlParam('code')--->'abc'
     * */
    getUrlParam: function(name) {
      var isParam = window.location.hash.split('?')[1];
      if (isParam) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var param = isParam.match(reg);
        if (param != null) return decodeURIComponent(param[2]);
        return null;
      }
    },
    //获取全部url参数,并转换成json对象
    //getUrlPrmt('segmentfault.com/write?draftId=122000011938')
    //result：Object{draftId: "122000011938"}
    getUrlAllParams: function(url) {
      url = url ? url : window.location.href;
      var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
      for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
          continue;
        }
        var name = _arrS[i].substring(0, pos),
          value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
      }
      return _rs;
    },
    /**
     *
     * @desc   url参数转对象
     * @param  {String} url  default: window.location.href
     * @return {Object}
     */
    parseQueryString: function(url) {
      url = url == null ? window.location.href : url;
      var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
      if (search === '') return {};
      search = search.split('&');
      var query = {};
      for (var i = 0; i < search.length; i++) {
        var pair = search[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
      return query;
    },
    /**
     *
     * @desc   对象序列化
     * @param  {Object} obj
     * @return {String}
     */
    stringfyQueryString: function(obj) {
      if (!obj) return '';
      var pairs = [];

      for (var key in obj) {
        var value = obj[key];

        if (value instanceof Array) {
          for (var i = 0; i < value.length; ++i) {
            pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
          }
          continue;
        }

        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return pairs.join('&');
    },
    /*删除url指定参数，返回url*/
    delParamsUrl: function(url, name) {
      var baseUrl = url.split('?')[0] + '?';
      var query = url.split('?')[1];
      if (query.indexOf(name) > -1) {
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split("=");
          obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        var result = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
        return result;
      } else {
        return url;
      }
    },
    //现金额大写转换函数
    //upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
    upDigit: function(n) {
      var fraction = ['角', '分', '厘'];
      var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ];
      var head = n < 0 ? '欠人民币' : '人民币';
      n = Math.abs(n);
      var s = '';
      for (var k = 0; k < fraction.length; k++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, k)) % 10] + fraction[k]).replace(/零./, '');
      }
      s = s || '整';
      n = Math.floor(n);
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        //s = p + unit[0][i] + s;
      }
      return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    filterParams: function(obj) {
      var _newPar = {};
      for (var key in obj) {
        if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
          _newPar[key] = obj[key];
        }
      }
      return _newPar;
    },
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
    //图片没加载出来时用一张图片代替
    // aftLoadImg: function (obj, url, errorUrl,cb) {
    //     var oImg = new Image(), _this = this;
    //     oImg.src = url;
    //     oImg.onload = function () {
    //         obj.src = oImg.src;
    //         if (cb && _this.istype(cb, 'function')) {
    //             cb(obj);
    //         }
    //     }
    //     oImg.onerror=function () {
    //         obj.src=errorUrl;
    //         if (cb && _this.istype(cb, 'function')) {
    //             cb(obj);
    //         }
    //     }
    // },
    //图片滚动懒加载
    //@className {string} 要遍历图片的类名
    //@num {number} 距离多少的时候开始加载 默认 0
    //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
    //html代码
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
    //data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    //详细可以查看testLoadImg.html

    //window.onload = function() {
    //	loadImg('load-img',100);
    //	window.onscroll = function() {
    //		loadImg('load-img',100);
    //		}
    //}
    // loadImg: function (className, num, errorUrl) {
    //     var _className = className || 'ec-load-img', _num = num || 0, _this = this,_errorUrl=errorUrl||null;
    //     var oImgLoad = document.getElementsByClassName(_className);
    //     for (var i = 0, len = oImgLoad.length; i < len; i++) {
    //         //如果图片已经滚动到指定的高度
    //         if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
    //             //记录图片是否已经加载
    //             oImgLoad[i].isLoad = true;
    //             //设置过渡，当图片下来的时候有一个图片透明度变化
    //             oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
    //             if (oImgLoad[i].dataset) {
    //                 this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {
    //                     //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
    //                     setTimeout(function () {
    //                         if (o.isLoad) {
    //                             _this.removeClass(o, _className);
    //                             o.style.cssText = "";
    //                         }
    //                     }, 1000)
    //                 });
    //             } else {
    //                 this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), _errorUrl, function (o) {
    //                     //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
    //                     setTimeout(function () {
    //                         if (o.isLoad) {
    //                             _this.removeClass(o, _className);
    //                             o.style.cssText = "";
    //                         }
    //                     }, 1000)
    //                 });
    //             }
    //             (function (i) {
    //                 setTimeout(function () {
    //                     oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
    //                 }, 16)
    //             })(i);
    //         }
    //     }
    // },
    //创建正则字符
    createKeyExp: function(strArr) {
      var str = "";
      for (var i = 0; i < strArr.length; i++) {
        if (i != strArr.length - 1) {
          str = str + strArr[i] + "|";
        } else {
          str = str + strArr[i];
        }
      }
      return "(" + str + ")";
    },
    //关键字加标签（多个关键词用空格隔开）
    //ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
    //"<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
    findKey: function(str, key, el) {
      var arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || 'span';
      arr = key.split(/\s+/);
      //alert(regStr); //    如：(前端|过来)
      regStr = this.createKeyExp(arr);
      content = str;
      //alert(Reg);//        /如：(前端|过来)/g
      Reg = new RegExp(regStr, "g");
      //过滤html标签 替换标签，往关键字前后加上标签
      content = content.replace(/<\/?[^>]*>/g, '');
      return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
    },
    //数据类型判断
    //ecDo.istype([],'array')
    //true
    //ecDo.istype([])
    //'[object Array]'
    istype: function(o, type) {
      var _type;
      if (type) {
        _type = type.toLowerCase();
      }
      switch (_type) {
        case 'string':
          return Object.prototype.toString.call(o) === '[object String]';
        case 'number':
          return Object.prototype.toString.call(o) === '[object Number]';
        case 'boolean':
          return Object.prototype.toString.call(o) === '[object Boolean]';
        case 'undefined':
          return Object.prototype.toString.call(o) === '[object Undefined]';
        case 'null':
          return Object.prototype.toString.call(o) === '[object Null]';
        case 'function':
          return Object.prototype.toString.call(o) === '[object Function]';
        case 'array':
          return Object.prototype.toString.call(o) === '[object Array]';
        case 'object':
          return Object.prototype.toString.call(o) === '[object Object]';
        case 'nan':
          return isNaN(o);
        case 'elements':
          return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
        default:
          return Object.prototype.toString.call(o);
      }
    },
    //手机类型判断
    browserInfo: function(type) {
      switch (type) {
        case 'android':
          return navigator.userAgent.toLowerCase().indexOf('android') !== -1;
        case 'iphone':
          return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        case 'ipad':
          return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
        case 'weixin':
          return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        default:
          return navigator.userAgent.toLowerCase();
      }
    },
    /**
     * @desc   函数节流。
     * 适用于限制`resize`和`scroll`等函数的调用频率
     *
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
     *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
     *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     *
     * @return {Function}  新的节流函数
     */
    throttle: function(delay, noTrailing, callback, debounceMode) {

      // After wrapper has stopped being called, this timeout ensures that
      // `callback` is executed at the proper times in `throttle` and `end`
      // debounce modes.
      var timeoutID;

      // Keep track of the last time `callback` was executed.
      var lastExec = 0;

      // `noTrailing` defaults to falsy.
      if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
      }

      // The `wrapper` function encapsulates all of the throttling / debouncing
      // functionality and when executed will limit the rate at which `callback`
      // is executed.
      var wrapper = function() {
        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
          lastExec = Number(new Date());
          callback.apply(self, args);
        }

        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
          timeoutID = undefined;
        }

        if (debounceMode && !timeoutID) {
          // Since `wrapper` is being called for the first time and
          // `debounceMode` is true (at begin), execute `callback`.
          exec();
        }

        // Clear any existing timeout.
        if (timeoutID) {
          clearTimeout(timeoutID);
        }

        if (debounceMode === undefined && elapsed > delay) {
          // In throttle mode, if `delay` time has been exceeded, execute
          // `callback`.
          exec();

        } else if (noTrailing !== true) {
          // In trailing throttle mode, since `delay` time has not been
          // exceeded, schedule `callback` to execute `delay` ms after most
          // recent execution.
          //
          // If `debounceMode` is true (at begin), schedule `clear` to execute
          // after `delay` ms.
          //
          // If `debounceMode` is false (at end), schedule `callback` to
          // execute after `delay` ms.
          timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }
      };
      // Return the wrapper function.
      return wrapper;
    },
    /**
     * @desc 函数防抖
     * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
     * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
     * @example 适用场景：如在线编辑的自动存储防抖。
     * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}  atBegin       可选，默认为false。
     *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                        如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
     * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                  执行去抖动功能时，，调用`callback`。
     *
     * @return {Function} 新的防抖函数。
     */
    debounce1: function(delay, atBegin, callback) {
      return callback === undefined ? this.throttle(delay, atBegin, false) : this.throttle(delay, callback, atBegin !== false);
    },
    //函数节流
    // var count=0;
    // function fn1(){
    //     count++;
    //     console.log(count)
    // }
    // //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
    // document.onmousemove=delayFn(fn1,100,200)
    delayFn: function(fn, delay, mustDelay) {
      var timer = null;
      var t_start;
      return function() {
        var context = this,
          args = arguments,
          t_cur = +new Date();
        //先清理上一次的调用触发（上一次调用触发事件不执行）
        clearTimeout(timer);
        //如果不存触发时间，那么当前的时间就是触发时间
        if (!t_start) {
          t_start = t_cur;
        }
        //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
        if (t_cur - t_start >= mustDelay) {
          fn.apply(context, args);
          t_start = t_cur;
        }
        //否则延迟执行
        else {
          timer = setTimeout(function() {
            fn.apply(context, args);
          }, delay);
        }
      };
    },
    // 防止高频调用的debounce函数
    // Usage
    // var myEfficientFn = debounce(function() {
    //     // All the taxing stuff you do
    // }, 250);
    // window.addEventListener('resize', myEfficientFn);
    debounce2: function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    // 禁止重复调用、只允许执行一次的once 函数
    // Usage
    // var canOnlyFireOnce = once(function() {
    //     console.log('Fired!');
    // });
    // canOnlyFireOnce(); // "Fired!"
    // canOnlyFireOnce(); // nada
    once: function(fn, context) {
      var result;
      return function() {
        if (fn) {
          result = fn.apply(context || this, arguments);
          fn = null;
        }
        return result;
      };
    },
    // 用JavaScript创建新的CSS规则 insertRule
    // sheet(".stats { position: relative ; top: 0px }") ;
    sheet: function(rule) {
      // Build style
      var style = document.createElement('style');
      style.setAttribute('media', 'screen');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
      style.sheet.insertRule(rule, style.sheet.cssRules.length);
    },
    // 判断网页元素是否具有某种属性和样式 matchesSelector
    // Usage
    // matchesSelector(document.getElementById('myDiv'), 'div.someSelector[some-attribute=true]')
    matchesSelector: function(el, selector) {
      var p = Element.prototype;
      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
      return f.call(el, selector);
    }
  };
  // 事件工具
  jsutils.eventUtils = {
    /**
     * 把在页面加载完毕时执行的函数创建为一个队列(摘自 JavaScript DOM 编程艺术)
     * @param {*} func 需加进队列的函数
     */
    addLoadEvent: function(func) {
      var oldFunc = window.onload;
      if (typeof window.onload !== 'function') {
        window.onload = func;
      } else {
        window.onload = function() { // window.onload 方法是在网页中所有元素完全加载到浏览器后才执行；如果就在这个函数中的话，window.onload 也充当了一个引用的角色；
          oldFunc();
          func();
        };
      }
    },
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
