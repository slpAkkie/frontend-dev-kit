const gulp = require( 'gulp' )

module.exports = function fontsCopy() {
  return gulp.src( 'src/media/**/*.*' )
    .pipe( gulp.dest( 'build/media/' ) )
}
