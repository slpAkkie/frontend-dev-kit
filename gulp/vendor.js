const gulp = require( 'gulp' )

module.exports = function vendor() {
  return gulp.src( 'vendor/**/*.*' )
    .pipe( gulp.dest( 'build/' ) )
}
