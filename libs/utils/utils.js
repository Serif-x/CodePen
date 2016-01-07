/*!
 * JavaScript Struct Board
 * A JavaScript library for common use or certain function.
 *
 * Copyright (c) 2015 Serifx Xiao
 * Licensed under the [MIT] license
 *
 * Version: 2.0.1
 * Date: 2015/11/07
 */


/*!
 * JavaScript Console 函数功能扩展
 * ==========================================================================
 */


// Avoid `console` errors in browsers that lack a console.
;(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

/**
 * disableConsoleAPI
 * @description Disable console API
 * @method
 * @static
 */
function disableConsoleAPI(){
  try {
    var $_console$$ = console;
    Object.defineProperty(window, 'console', {
      get: function(){
        if ($_console$$)
          throw 'Sorry, for security, the \'console\' API has been disbaled.';
        return $_console$$
      },
      set: function($val$_$){
        $_console$$ = $val$_$;
      }
    });
  } catch ($ignore$$) {
    throw $ignore$$;
  }
}

/*!
 * JavaScript Object 函数功能扩展
 * ==========================================================================
 */

/**
 * isJQueryObject
 * @description Check if an object is jQuery object
 * @returns {boolean}
 * @param {*} obj
 * @method
 * @static
 */
function isJQueryObject(obj){
  return obj instanceof jQuery;
}

/**
 * Assign all own properties from source to target
 * @param {object} target
 * @param {object} source
 * @param {boolean} [deep] If deep clone
 * @return {Object}
 * @method
 * #static
 */
function extendOwnProps(target, source, deep){
  for (var p in source) {
    if (source.hasOwnProperty(p)) {
      if (deep) {
        target[p] = ('object' === typeof target[p]) ? extendOwnProps(target[p], source[p], deep) : source[p];
      } else {
        target[p] = source[p];
      }
    }
  }
  return target;
}

/**
 * Check if object is a true number
 * @returns {boolean}
 * @param {*} obj
 * @method
 * @static
 */
function isNumberType(obj){
  return obj.constructor === Number && !isNaN(this) && isFinite(this);
}

/*!
 * JavaScript String 函数功能扩展
 * ==========================================================================
 */

/**
 * trim 删除字符串首尾空格或指定字符串
 * trimStart 删除字符串首部空格或指定字符串
 * trimEnd 删除字符串尾部空格或指定字符串
 * occurs 统计指定字符出现的次数
 * isDigit 检查是否由数字组成
 * isAlpha 检查是否由数字字母和下划线组成
 * isNumber 检查是否为纯数字
 * lenBytes 返回字节数
 * containsChinese 检查是否包含汉字
 */

/**
 * 删除首尾空格或指定字符串
 * @param {string} [str]
 * @returns {string}
 */
String.prototype.trim = function(str){
  if (str) {
    return this.replace(new RegExp('(^(' + str + ')*)|((' + str + ')*$)', 'g'), '');
  } else {
    return this.replace(/(^\s*)|(\s*$)/g, '');
  }
};
/**
 * 删除首部空格或指定字符串
 * @param {string} [str]
 * @returns {string}
 */
String.prototype.trimStart = function(str){
  if (str) {
    return this.replace(new RegExp('(^(' + str + ')*)', 'g'), '');
  } else {
    return this.replace(/(^\s*)/g, '');
  }
};
/**
 * 删除尾部空格或指定字符串
 * @param {string} [str]
 * @returns {string}
 */
String.prototype.trimEnd = function(str){
  if (str) {
    return this.replace(new RegExp('((' + str + ')*$)', 'g'), '');
  } else {
    return this.replace(/(\s*$)/g, '');
  }
};
/**
 * 统计指定字符出现的次数
 * @param {string} character
 * @returns {number}
 */
String.prototype.occurs = function(character){
  return this.split(character).length - 1;
};
/**
 * 检查是否为纯数字(无符号)
 * @returns {boolean}
 */
String.prototype.isDigit = function(){
  //var s = this.trim();
  return (this.replace(/\d/g, '').length === 0);
};
/**
 * 检查是否为数字(含符号)
 * @returns {boolean}
 */
String.prototype.isNumber = function(){
  //var s = this.trim();
  return (this.search(/^[+-]?[0-9.]*$/) >= 0);
};
/**
 * 检查是否由数字字母和下划线组成
 * @returns {boolean}
 */
String.prototype.isAlpha = function(){
  return (this.replace(/\w/g, '').length === 0);
};
/**
 * 获取字节数
 * @returns {number}
 */
String.prototype.lenBytes = function(){
  return this.replace(/[^\x00-\xff]/g, '**').length;
};
/**
 * 检查是否包含汉字
 * @returns {boolean}
 */
String.prototype.containsChinese = function(){
  return (this.length !== this.replace(/[^\x00-\xff]/g, '**').length);
};

/*!
 * JavaScript Array 函数功能扩展
 * ==========================================================================
 */


/**
 * 去除数组中重复元素
 * @method unique
 * @returns {Array}
 */
Array.prototype.unique = function(){
  var rest = [];
  for (var i = 0, l = this.length; i < l; i++) {
    if (i === this.indexOf(this[i])) {
      rest.push(this[i]);
    }
  }
  return rest;
};

/**
 * Polyfill
 * =============================
 */

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
/*!
 * JavaScript Exception 函数功能扩展
 * ==========================================================================
 */


/**
 * BaseException
 * @constructor
 */
function BaseException(){ }
BaseException.prototype = new Error;
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString  = function(){
  return this.message;
};

/**
 * OutOfRangeException
 * @constructor
 */
function OutOfRangeException(){
  this.name = 'OutOfRangeException';
  this.message = 'The value is out of range.';
}
OutOfRangeException.prototype = new BaseException;
OutOfRangeException.prototype.constructor = BaseException;

/*!
 * JavaScript Event 函数功能扩展
 * ==========================================================================
 */


/**
 * preventDefaultEvent
 * @description PreventDefaultEvent
 * @param {Event} e Event object
 * @method
 * @static
 */
function preventDefaultEvent(e){
  if(e && e.preventDefault) {
    e.preventDefault();
    return;
  }
  var _e = window.event || arguments.callee.caller.arguments[0];
  if (_e && _e.preventDefault) { //W3C
    _e.preventDefault();
  }
  else {//IE
    window.event.returnValue = false;
  }
}


/**
 * add event
 * @param {object} el
 * @param {string} type
 * @param {function} func
 */
function addEvent(el, type, func){
  var types = type.split(/[\s|,]+/);
  for(var i = 0, l = types.length; i < l; i++){
    if(types[i]){
      if (el.addEventListener) {
        el.addEventListener(types[i], func, false);
      } else if (el.attachEvent) {
        el.attachEvent("on" + types[i], func);
      } else {
        el["on" + types[i]] = func;
      }
    }
  }
}


/*!
 * JavaScript JSON 函数功能扩展
 * ==========================================================================
 */


/**
 * Convert JSON Object to JSONString
 * @description Convert JSON Object to JSONString
 * @param {JSON} jsonObj JSON object, to be converted
 * @returns {*}
 * @method
 * @static
 */
function convertToJSONString(jsonObj) {
  try {
    if (typeof (window.toJSONString) === 'function') {
      return jsonObj.toJSONString();
    } else if (typeof (JSON.stringify) === 'function') {
      return JSON.stringify(jsonObj);
    } else {
      return '';
    }
  } catch (e) {
    return e;
  }
}

/*!
 * JavaScript User Agent 功能扩展
 * ==========================================================================
 */


;(function(window){

  var ua    = navigator.userAgent.toLowerCase(),
      match = /(msie) ([\w.]+)/.exec(ua) ||
              /(trident)[\/]([\w.]+)/.exec(ua) ||
              /(edge)[\/]([\w.]+)/.exec(ua) ||
              /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
              /(chrome)[ \/]([\w.]+)/.exec(ua) ||
              /(safari)[\/]([\w.]+)/.exec(ua) ||
              /(webkit)[ \/]([\w.]+)/.exec(ua) ||
              ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];

  var bs_name = match[1],
      bs_version = match[2];

  if(bs_name === 'trident'){
    // switch IE version
    bs_name = 'msie';
    switch (bs_version) {
      case '4.0':
        bs_version = '8.0';
        break;
      case '5.0':
        bs_version = '9.0';
        break;
      case '6.0':
        bs_version = '10.0';
        break;
      case '7.0':
        bs_version = '11.0';
        break;
    }
  }

  var userAgent = {
    /**
     * isPC
     * @returns {boolean}
     */
    isPC: function(){
      var uaInfo = navigator.userAgent.toLowerCase();
      var agents = [
        "android",
        "iphone",
        "symbianos",
        "windows phone",
        "ipad",
        "ipod"
      ];
      var flag = true;
      for (var i = 0, l = agents.length; i < l; i++) {
        if (uaInfo.indexOf(agents[i]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    browser: {
      name: bs_name || '',
      version: bs_version || '0',
      /**
       * check browser name
       * @param {string} name
       * @returns {boolean}
       */
      is: function(name){
        return userAgent.browser.name.toLowerCase() === name.toLowerCase();
      }
    }
  };

  window.ua = userAgent;

})(window);

/*!
 * JavaScript Cookie 函数功能扩展
 * ==========================================================================
 */


/**
 * Cookie Manipulation
 * @type {{get: Function, add: Function, set: Function, remove: Function}}
 */
var cookie = window.cookie = {
  /**
   * addCookie
   * @param {string} name
   * @param {string} value
   * @param {number} [days=30] 30 days by default
   * @param {string} [domain]
   * @param {string} [path]
   * @param {boolean} [secure] Encrypt message when transfer online
   * @method
   * @static
   */
  add   : function(name, value, days, domain, path, secure){
    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    //expire
    if (undefined !== days) { //include 0
      var _days = +days ? +days : (+days === 0) ? 0 : 30;
      var date = new Date();
      date.setTime(date.getTime() + _days * 24 * 3600 * 1000);
      str += ';expires=' + date.toUTCString();
    }
    if (domain && typeof domain === 'string') str += ';domain=' + domain;
    if (path && typeof path === 'string') str += ';path=' + path;
    if (secure) str += ';secure';
    document.cookie = str;
  },
  /**
   * getCookie
   * @param {string} [name] get all cookie if parameter name is omitted
   * @method
   * @static
   * @returns {*}
   */
  get   : function(name){
    var _cookies = {};
    if (document.cookie.length > 0) {
      var cookieArr = document.cookie.split(';');
      for (var i = 0, l = cookieArr.length; i < l; i++) {
        var hash = cookieArr[i].split('=');
        if (hash.length === 2) {
          _cookies[decodeURIComponent(hash[0]).replace(/(^\s*)/g, '')] = decodeURIComponent(hash[1]);
        }
      }
    }

    //get
    if (name && typeof name === 'string') {
      if (_cookies[name]) {
        return _cookies[name];
      } else {
        return '';
      }
    } else {
      return _cookies;
    }
  },
  /**
   * setCookie
   * @description Note that if new cookie doesn't exist it will be created
   * @param {string} name
   * @param {string} value
   * @param {number} [days=30] 30 days by default
   * @param {string} [domain]
   * @param {string} [path]
   * @param {boolean} [secure=false] Encrypt message when transfer online
   * @method
   * @static
   */
  set   : function(name, value, days, domain, path, secure){
    if (!cookie.get(name)) return; //check if it already exists

    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    //expire
    if (undefined !== days) { //include 0
      var _days = +days ? +days : (+days === 0) ? 0 : 30;
      var date = new Date();
      date.setTime(date.getTime() + _days * 24 * 3600 * 1000);
      str += ';expires=' + date.toUTCString();
    }
    if (domain && typeof domain === 'string') str += ';domain=' + domain;
    if (path && typeof path === 'string') str += ';path=' + path;
    if (secure) str += ';secure';
    document.cookie = str;
  },
  /**
   * removeCookie
   * @param {string} [name] remove all cookie if parameter name is omitted
   * @method
   * @static
   */
  remove: function(name){
    if (name && typeof name === 'string') {
      if(!cookie.get(name)) return; //check if it already exists

      cookie.set(name, '', -1);
    } else {
      //clear all cookies
      var cookies = cookie.get();
      for (var c in cookies) {
        if (cookies.hasOwnProperty(c)) {
          cookie.remove(c);
        }
      }
    }
  }
};


/*!
 * JavaScript File API 函数功能扩展
 * ==========================================================================
 */


/**
 * getFileAPI
 * @method
 * @static
 * @returns {*}
 */
function getFileAPI() {
  return (window.File && window.FileReader && window.FileList && window.Blob);
}

/**
 * handleFileSelected
 * @description Handle File Selected
 * @return {boolean}
 * @param {object} options
 */
function handleFileSelected(options){
  if (!getFileAPI()) {
    alert('Error: 您的浏览器不支持FileAPI，暂无法实现图片预览！');
    return;
  }
  var _options = {
    obj: null,
    maxSize: 1024, //kilobytes
    success: function(){ return true; },
    error: function(err){  _options.obj.value = ''; console.log('Load file error!'); alert(err); }
  };

  for (var p in options) {
    if (options.hasOwnProperty(p)) {
      _options[p] = options[p];
    }
  }

  var curfile = _options.obj.target ? _options.obj.target.files[0] : _options.obj.files[0];
  if (curfile) {
    readDataFile(curfile, {
      success: function(dataUrl, file){
        if(curfile.size > _options.maxSize * 1024 - 4){
          _options.obj.value = '';
          alert('Error: 文件大小请勿超过 '+ _options.maxSize + 'KB！');
          return false;
        }
        _options.success(dataUrl, file);
      },
      error: function(e){
        alert(e);
        return false;
      }
    });
  } else {
    alert('Error: 未选择任何文件！');
    return false;
  }
}

/**
 * readDataFile
 * @method
 * @static
 * @description Read file
 * @param {*} file
 * @param {function} callback
 */
function readDataFile(file, callback){
  var fileExt   = [
    'jpg', 'jpeg', 'png', 'gif'
  ];
  var reader    = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (function(theFile){
    return function(e){
      var suffix = theFile.name.split('.').pop();
      var regx   = new RegExp('^' + fileExt.join('|') + '$', 'i');
      if (regx.test(suffix)) {
        callback.success(e.target.result, theFile); //Data URL
      } else {
        alert('Error: 非标准图像文件，请重新选择！');
        return false;
      }
    };
  })(file);
  reader.onerror = function(e){
    callback.error(e);
  }
}

/*!
 * JavaScript load Script 功能扩展
 * ==========================================================================
 */


/**
 * @method loadScript
 * @description Load script asynchronously
 * @param {string} url
 * @param {function} [callback]
 */
function loadScript(url, callback){
  var script = document.createElement('script');
  script.type = 'text/javascript';

  // callback
  if(callback && 'function' === typeof callback){
    if(script.readyState){ // IE
      script.onreadystatechange = function(){
        if(script.readyState === 'loaded' || script.readyState === 'complete'){
          script.onreadystatechange = null;
          callback();
        }
      }
    } else { // firefox, safari, chrome, opera, etc.
      script.onload = function(){
        callback();
      }
    }
  }

  script.src = url;
  document.body.appendChild(script);
}

/*!
 * JavaScript DOM 函数功能扩展
 * ==========================================================================
 */


/**
 * getInnerHeight
 * @method
 * @static
 * @return {number}
 * @param {string|object} wrap
 */
function getInnerHeight(wrap){
  var _wrap       = (typeof wrap === 'string') ? document.querySelector(wrap) : wrap;
  _wrap           = (_wrap instanceof jQuery) ? _wrap[0] : _wrap;
  var wrap_height = 0;
  var childs      = _wrap.children;
  for (var i = 0; i < childs.length; i++) {
    wrap_height += childs[i].clientHeight;
  }
  return wrap_height;
}

/*!
 * JavaScript Request 函数功能扩展
 * ==========================================================================
 */


;(function(window){

  var req = {
    /**
     * request.getQueryString
     * @description Get query string
     * @param {string} str
     * @returns {*}
     */
    getQueryString: function(str){
      var qstr = decodeURIComponent(window.location.search.replace(/(^\?+)|(#\S+$)/g, ''));
      qstr = qstr.match(new RegExp('(^|&)' + str + '=([^&]*)(&|$)'));
      return !qstr ? '' : qstr[2];
    },
    /**
     * request.getQueryObject
     * @description Get query string Object
     * @returns {object}
     */
    getQueryObject: function(){
      var qstr = decodeURIComponent(window.location.search.replace(/(^\?+)|(#\S+$)/g, ''));
      var q = {};
      var qstrArr = qstr.split('\u0026'); // split string by '&'
      for (var i = 0, l = qstrArr.length; i < l; i++) {
        var hash = qstrArr[i].split('=');
        if (hash.length === 2) {
          q[(hash[0])] = hash[1];
        }
      }
      return q;
    }
  };

  window.request = req;
})(window);
/*!
 * JavaScript Window 函数功能扩展
 * ==========================================================================
 */


/**
 * addToBookmark
 * @method
 * @static
 */
function addToBookmark(){
  var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
  var errMsg = '添加失败，您可以尝试通过快捷键 ' + ctrl + ' + D 加入到收藏夹。';
  try {
    if (document.all) { //IE
      try {
        window.external.toString(); //360浏览器不支持window.external，无法收藏
        window.alert(errMsg);
      }
      catch (e) {
        try {
          window.external.addFavorite(window.location, document.title);
        }
        catch (e) {
          window.external.addToFavoritesBar(window.location, document.title);  //IE8
        }
      }
    }
    else if (window.sidebar) { //firefox, etc.
      window.sidebar.addPanel(document.title, window.location, '');
    }
    else {
      alert(errMsg);
    }
  }
  catch (e) {
    window.alert(errMsg);
  }
}
