const gulp = require( 'gulp' )
const plumber = require( 'gulp-plumber' )
const pug = require( 'gulp-pug' )

module.exports = () => {
  return gulp.src( 'src/pages/*.pug' )
    .pipe( plumber() )
    .pipe( pug( { pretty: true } ) )
    .pipe( gulp.dest( 'build' ) )
}
