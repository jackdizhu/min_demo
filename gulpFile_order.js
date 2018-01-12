'use strict'

const gulp = require('gulp')
const gulpSequence = require('./gulp-sequence.js')
// const test = require('./gulp.js')

var rootPath = 'public/';

gulp.task('a', function (cb) {
    setTimeout(function () {
      console.log('a')
      cb()
    }, 100)
  })

  gulp.task('b', function (cb) {
    setTimeout(function () {
      console.log('b')
      cb()
    }, 500)
  })

  gulp.task('c', function (cb) {
    setTimeout(function () {
      console.log('c')
      cb()
    }, 200)
  })

  gulp.task('d', function (cb) {
    setTimeout(function () {
      console.log('d')
      cb()
    }, 50)
  })

  gulp.task('e', function (cb) {
    setTimeout(function () {
      console.log('e')
      cb()
    }, 800)
  })

  gulp.task('f', function () {
    return gulp.src('*.js')
  })

  gulp.task('all', gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f'))
  
	gulp.task('test', function () {
	  gulp.watch([rootPath + 'tpl/*.html'], function () {
	  	gulp.run('all')
	  });
	});
	gulp.run('test')
