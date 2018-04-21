const fs = require('fs');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
// const babel = require("gulp-babel");

// gulp.task('babel', function() {
// 	gulp.src('src/csdutils.js')
//   .pipe(babel({
//     presets: ['es2015']
//   }))
// 	.pipe(gulp.dest('src/csdutils-es5'))
// });

gulp.task('mini', function() {
  gulp.src('src/csdutils.js')
  .pipe(uglify())    //uglify
  .pipe(rename("csdutils.min.js"))
  .pipe(gulp.dest('dist/'))
});

// var gulp=require('gulp');
// var concat=require('gulp-concat');
// var rename=require('gulp-rename');
// var uglify=require('gulp-uglify');
// var notify=require('gulp-notify');
//
// gulp.task('js',function(){
// 	return gulp.src('index.js')
// 		.pipe(concat('laoUtils.js'))
// 		.pipe(gulp.dest('dist'))
// 		.pipe(rename({suffix:'.min'}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('dist'))
// 		.pipe(notify({message:'js task ok!'}));
// });
//
// gulp.task('default',function(){
// 	gulp.run('js');
// 	gulp.watch('index.js',function(){
// 		gulp.run('js');
// 	});
// });
