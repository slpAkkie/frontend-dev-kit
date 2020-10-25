const gulp = require( 'gulp' )
const plumber = require( 'gulp-plumber' )
const sass = require( 'gulp-sass' )
const cleanCSS = require( 'gulp-clean-css' )
const sourcemaps = require( 'gulp-sourcemaps' )
const autoprefixer = require( 'gulp-autoprefixer' )
const rename = require( "gulp-rename" )

module.exports = function style() {
  return gulp.src( 'src/styles/*.scss' )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( sass() )
    .pipe( autoprefixer( {
      cascade: false
    } ) )
    .pipe( cleanCSS( {
      debug: true,
      compatibility: '*'
    } ) )
    .pipe( sourcemaps.write() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( 'build/css' ) )
}
