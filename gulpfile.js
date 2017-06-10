var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('server', function() {
  connect.server({
    root: './',
    port: 4000
  });
});

gulp.task('default', ['server']);
