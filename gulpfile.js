const gulp = require( 'gulp' )
const del = require( 'del' )

const server = require( './gulp/server' )
const pug2html = require( './gulp/pug2html' )
const styles = require( './gulp/styles' )
const script = require( './gulp/script' )
const fonts = require( './gulp/fonts' )
const imageMinify = require( './gulp/imageMinify' )
const clean = require( './gulp/clean' )


const dev = gulp.parallel( pug2html, styles, script, fonts, imageMinify )

const build = gulp.series( clean, dev )

module.exports.imageMinify = gulp.series( ( cb ) => { return del( 'build/img' ).then( () => cb() ) }, imageMinify )
module.exports.server = gulp.series( server )

module.exports.devMode = gulp.series( build, server )
module.exports.build = gulp.series( build )
