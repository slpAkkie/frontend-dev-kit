const gulp = require( 'gulp' )

module.exports = () => {
  return gulp.src( 'src/fonts/*' )
    .pipe( gulp.dest( 'build/fonts' ) )
}
