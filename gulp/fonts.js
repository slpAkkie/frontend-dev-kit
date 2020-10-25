const gulp = require( 'gulp' )

module.exports = function fontsCopy() {
  return gulp.src( 'src/fonts/*' )
    .pipe( gulp.dest( 'build/fonts' ) )
}
