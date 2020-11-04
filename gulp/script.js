const gulp = require( 'gulp' )
const plumber = require( 'gulp-plumber' )
const sourcemaps = require( 'gulp-sourcemaps' )
const babel = require( 'gulp-babel' )
const rigger = require( 'gulp-rigger' )
const uglify = require( 'gulp-uglify-es' ).default

module.exports = function script() {
  return gulp.src( 'src/js/*.js' )
    .pipe( plumber() )
    .pipe( rigger() )
    .pipe( sourcemaps.init() )
    .pipe( babel( {
      'presets': [ '@babel/env' ],
      'plugins': [ '@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties' ]
    } ) )
    .pipe( uglify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( 'build/js' ) )
}
