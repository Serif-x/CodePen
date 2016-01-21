/*!
 * Load Image by Base64 format
 *
 * Author: Serifx
 * Further changes: Serifx
 * Date: 2015/12/18
 *
 * Copyright (c) 2015 Serifx
 * Licensed under the MIT license
 */


;(function(){

  /**
   * getFileAPI
   * @method
   * @static
   * @returns {*}
   */
  var getFileAPI = function() {
    return (window.File && window.FileReader && window.FileList && window.Blob);
  };

  /**
   * readDataFile
   * @method
   * @static
   * @description Read file
   * @param {*} file
   * @param {object} callback
   */
  var readDataFile = function(file, callback){
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
          alert('错误： 非标准图像文件，请重新选择！');
          return false;
        }
      };
    })(file);
    reader.onerror = function(e){
      callback.error(e);
    }
  };

  /**
   * handleFileSelected
   * @description Handle File Selected
   * @return {boolean}
   * @param {object} options
   */
  var handleFileSelected = window.handleFileSelected = function(options){
    if (!getFileAPI()) {
      alert('错误： 您的浏览器不支持FileAPI，暂无法实现图片预览！');
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
            alert('错误： 文件大小请勿超过 '+ _options.maxSize + 'KB！');
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
      alert('错误： 未选择任何文件！');
      return false;
    }
  };

})(window);
