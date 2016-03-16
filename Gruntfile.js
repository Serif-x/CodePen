'use strict';

module.exports  = function(grunt){
  grunt.initConfig({
    //pkg: grunt.readJSON('package.json'),
    connect: {
      root: {
        options: {
          port: 8001,
          livereload: 8002,  //声明给 watch 监听的端口
          keepalive: true,
          base: '.',
          hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
          open: true //自动打开网页 http://
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('serve_root', ['connect:root']);
}
