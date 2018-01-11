
var gulp = require('gulp'),//基础库
    htmlmin = require('gulp-htmlmin'),//html压缩
    cssmin = require('gulp-minify-css'),//css压缩
    // jshint = require('gulp-jshint'),//js检查
    uglify = require('gulp-uglify'),//js压缩
    babel = require("gulp-babel"),
    rev = require("gulp-rev"),
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

  // 生成版本号清单  
  gulp.task('rev', () => {  
    gulp.src([basePath + '**/*.*'])  
      .pipe(rev())  
      .pipe(revFormat({  
        prefix: '.', // 在版本号前增加字符  
        suffix: '.cache', // 在版本号后增加字符  
        lastExt: false  
      }))  
      .pipe(rev.manifest())  
      .pipe(gulp.dest(basePath + 'rev/all'));  
  });
  // 添加版本号 
  gulp.task('addVersion', ['rev'], function() {  
    var manifest = gulp.src([basePath + 'rev/all/' + 'rev-manifest.json']);  
    function modifyUnreved(filename) {  
      return filename;  
    }  
    function modifyReved(filename) {  
      // filename是：admin.69cef10fff.cache.css的一个文件名  
      // 在这里才发现刚才用gulp-rev-format的作用了吧？就是为了做正则匹配，  
      if (filename.indexOf('.cache') > -1) {  
        // 通过正则和relace得到版本号：69cef10fff  
        const _version = filename.match(/\.[\w]*\.cache/)[0].replace(/(\.|cache)*/g,"");  
        // 把版本号和gulp-rev-format生成的字符去掉，剩下的就是原文件名：admin.css  
        const _filename = filename.replace(/\.[\w]*\.cache/,"");  
        // 重新定义文件名和版本号：admin.css?v=69cef10fff  
        filename = _filename + "?v=" + _version;  
        // 返回由gulp-rev-replace替换文件名  
        return filename;  
      }  
      return filename;  
    }  
    gulp.src([basePath + 'tpl/**.html'])   
      // 删除原来的版本   
      .pipe(replace(/(\.[a-z]+)\?(v=)?[^\'\"\&]*/g,"$1"))   
      .pipe(revReplace({  
      manifest: manifest,  
      modifyUnreved: modifyUnreved,  
      modifyReved: modifyReved  
    }))    
    .pipe(gulp.dest(basePath + 'html/'));  
  }); 

  gulp.task('start',['rev', 'addVersion']);
  gulp.task('default',['clean'], function () {
    gulp.start('start');
  });

  gulp.run('default');

