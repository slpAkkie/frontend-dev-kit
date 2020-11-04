const gulp = require( 'gulp' )

module.exports = function mediaCopy() {
  return gulp.src( 'src/media/**/*.*' )
    .pipe( gulp.dest( 'build/media/' ) )
}
