
var gulp = require('gulp'),
  fs = require('fs'),
  less = require('gulp-less'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  csso = require('gulp-csso'),
  livereload = require('gulp-livereload'),
  uglify = require('gulp-uglify'),
  base64 = require('gulp-base64'),
  babel = require("gulp-babel"),
  minifycss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  replace = require('gulp-replace'),
  revCollector = require('gulp-rev-collector'),
  connect = require('gulp-connect');
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  notify=require('gulp-notify'),
  plumber=require('gulp-plumber'),
  nodemon=require('gulp-nodemon'),
  express=require('gulp-express'),
  clean = require('gulp-clean'),

  gulp_webpack = require('gulp-webpack'),
  webpack= require('webpack'),
  webpack_config = require('./webpack.config.js');

  var basePath = 'app/public/';

  setInterval(() => {
      console.log('less 编译');
      gulp.src(basePath + 'src/less/*.less')
        .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(base64({
            baseDir:        basePath + 'src/img',
            extensions:     ['svg', 'png', 'jpg', 'gif'],
            maxImageSize:   5*1024, // bytes
            debug:          true
        }))
        .pipe(postcss([ autoprefixer({ browsers: [
          // 最新版本添加前缀，市场份额大于0.1%，美国份额>5%，
          "last 2 version", "> 0.1%", "> 5% in US",
          // ie6-ie8，
          "ie >= 8",
          "iOS >= 8",
          "Firefox >= 20",
          "Android > 4.4"
        ] }) ]))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(basePath + 'src/css'))
        .pipe(gulp.dest(basePath + 'dist/css'));
      // express.run(['./app/bin/www']);
  },3000);
