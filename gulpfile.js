const gulp = require( 'gulp' )
const del = require( 'del' )

const server = require( './gulp/server' )
const pug2html = require( './gulp/pug2html' )
const styles = require( './gulp/styles' )
const script = require( './gulp/script' )
const fonts = require( './gulp/fonts' )
const imageMinify = require( './gulp/imageMinify' )
const clean = require( './gulp/clean' )
const media = require( './gulp/media' )


const build = gulp.parallel( pug2html, styles, script, fonts, imageMinify, media )

const cleanBuild = gulp.series( clean, build )

module.exports.cleanDev = gulp.series( cleanBuild, server )
module.exports.dev = server

module.exports.build = cleanBuild

module.exports.imgMin = gulp.series( ( cb ) => {
	return del( 'build/img' ).then( () => cb() )
}, imageMinify )
