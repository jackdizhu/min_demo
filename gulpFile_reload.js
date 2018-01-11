var gulp = require('gulp'),//基础库
    connect = require('gulp-connect');

  var rootPath = 'public';
  var basePath = rootPath + '/';
  gulp.task('clean', () => {
    return gulp.src([basePath + 'dist/**/*', basePath + 'rev/**/*', basePath + 'html/**/*'], {read:false})
      .pipe(clean());
  });

  // 启动 dev server 
  gulp.task('connectDev', function () {
    connect.server({
      root: rootPath,
      port: 9000,
      livereload: true
    });
  });// 关闭 server 
  gulp.task('serverClose', function () {
    connect.serverClose();
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
  // setTimeout(() => {
  //   gulp.run('serverClose');
  // },10000);
