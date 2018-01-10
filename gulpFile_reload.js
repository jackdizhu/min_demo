var gulp = require('gulp'),//基础库
    connect = require('gulp-connect');

  var rootPath = 'public';
  var basePath = rootPath + '/';

  // 启动 dev server 
  gulp.task('connectDev', function () {
    connect.server({
      root: rootPath,
      port: 9000,
      livereload: true
    });
  });
  gulp.task('html', function () {
    gulp.src(basePath + '*.html')
      // 刷新 dev server 
      .pipe(connect.reload());
  });
   
  gulp.task('watch', function () {
    gulp.watch([basePath + '*.html'], ['html']);
  });

  gulp.task('default',['connectDev', 'watch']);
  gulp.run('default');
