const fs = require('fs');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const babel = require("gulp-babel");

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
