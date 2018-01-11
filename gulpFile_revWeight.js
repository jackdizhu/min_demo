
var gulp = require('gulp'),//基础库
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    htmlmin = require('gulp-htmlmin'),//html压缩
    cssmin = require('gulp-minify-css'),//css压缩
    // jshint = require('gulp-jshint'),//js检查
    uglify = require('gulp-uglify'),//js压缩
    babel = require("gulp-babel"),
    rev = require("gulp-rev"),
    revCollector = require("gulp-rev-collector"),
    revFormat = require("gulp-rev-format"),
    revReplace = require("gulp-rev-replace"),
    imagemin = require('gulp-imagemin'),//图片压缩
    pngquant = require('imagemin-pngquant'),//图片深入压缩
    imageminOptipng = require('imagemin-optipng'),
    imageminSvgo = require('imagemin-svgo'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminJpegtran = require('imagemin-jpegtran'),
    domSrc = require('gulp-dom-src'),
    cheerio = require('gulp-cheerio'),
    processhtml = require('gulp-processhtml'),
    replace = require('gulp-replace'),
    cache = require('gulp-cache'),//图片压缩缓存
    clean = require('gulp-clean'),//清空文件夹
    conCat = require('gulp-concat'),//文件合并
    plumber=require('gulp-plumber'),//检测错误
    gutil=require('gulp-util');//如果有自定义方法，会用到

  var basePath = 'public/';

  gulp.task('clean', () => {
    return gulp.src([basePath + 'dist/**/*', basePath + 'rev/**/*', basePath + 'html/**/*'], {read:false})
      .pipe(clean());
  });

  //CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revCss', function(){
    return gulp.src(basePath+'src/css/*.css')
      .pipe(rev())
      .pipe(gulp.dest(basePath+'dist/css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest(basePath+'rev/css'));
  });

  //js生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revJs', function(){
    return gulp.src(basePath+'src/js/*.js')
      .pipe(rev())
      .pipe(gulp.dest(basePath+'dist/js'))
      .pipe(rev.manifest())
      .pipe(gulp.dest(basePath+'rev/js'));
  });

  //Html替换css、js文件版本
  gulp.task('revHtml', ['revCss', 'revJs'], function () {
    return gulp.src([basePath+'rev/**/*.json', basePath+'tpl/*.html'])
      .pipe(revCollector())
      .pipe(gulp.dest(basePath+'html'));
  });

  gulp.task('start', ['revCss', 'revJs', 'revHtml']);
  gulp.task('default',['clean'], function () {
    gulp.start('start');
    // gulp.start('revCss', 'revJs', 'revHtml');
  });

  gulp.run('default');

