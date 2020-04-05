'use strict';

const gulp = require( `gulp` );
const autoprefixer = require( `autoprefixer` );
const browserSync = require( `browser-sync` );
const reload = browserSync.reload;
const sass = require( `gulp-sass` );
const csso = require( `gulp-csso` );
const includer = require( `gulp-file-includer` );
const rename = require( `gulp-rename` );
const sourcemaps = require( `gulp-sourcemaps` );
const uglify = require( `gulp-uglify-es` ).default;
const watch = require( `gulp-watch` );
const imagemin = require( `gulp-imagemin` );
const pngquant = require( `imagemin-pngquant` );
const rimraf = require( `rimraf` );
const postcss = require( `gulp-postcss` )
const rigger = require( `gulp-rigger` )

const path = {
  dist: {
    root: `./dist`,
    html: `dist/`,
    js: `dist/js/`,
    css: `dist/css/`,
    img: `dist/img/`,
    fonts: `dist/fonts/`
  },
  src: {
    html: `src/*.html`,
    js: `src/js/*js`,
    style: `src/style/*.scss`,
    img: `src/img/**/*.*`,
    fonts: `src/fonts/**/*.*`
  }
}

const config = {
  server: { baseDir: path.dist.root },
  tunnel: false,
  host: `localhost`,
  port: 9000,
  logPrefix: `slpServer`
}

gulp.task( `server:lunch`, function () {
  return browserSync( config );
} );

gulp.task( `clean`, function ( cb ) {
  return rimraf( path.dist.root, cb );
} );

gulp.task( `html:build`, function () {
  return gulp.src( path.src.html )
    .pipe( includer() )
    .pipe( gulp.dest( path.dist.html ) )
    .pipe( reload( { stream: true } ) );
} );

gulp.task( `js:build`, function () {
  return gulp.src( path.src.js )
    .pipe( rigger() )
    .pipe( sourcemaps.init() )
    .pipe( uglify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( path.dist.js ) )
    .pipe( reload( { stream: true } ) );
} );

gulp.task( `style:build`, function () {
  return gulp.src( path.src.style )
    .pipe( sourcemaps.init() )
    .pipe( sass( {
      sourceMap: true,
      errLogToConsole: true
    } ) )
    .pipe( postcss( [ autoprefixer() ] ) )
    .pipe( csso( {
      restructure: false,
      sourceMap: true
    } ) )
    .pipe( sourcemaps.write() )
    .pipe( rename( { suffix: `.min` } ) )
    .pipe( gulp.dest( path.dist.css ) )
    .pipe( reload( { stream: true } ) );
} );

gulp.task( `image:build`, function () {
  return gulp.src( path.src.img )
    .pipe( imagemin( {
      progressive: true,
      use: [ pngquant() ],
      interlaced: true
    } ) )
    .pipe( gulp.dest( path.dist.img ) )
    .pipe( reload( { stream: true } ) );
} );

gulp.task( `fonts:build`, function () {
  return gulp.src( path.src.fonts )
    .pipe( gulp.dest( path.dist.fonts ) );
} );

gulp.task( `build`, gulp.series( `html:build`, `js:build`, `style:build`, `fonts:build`, `image:build` ) );

gulp.task( `watch`, function () {
  gulp.watch( [ path.src.html ], gulp.series( `html:build` ) );
  gulp.watch( [ path.src.style ], gulp.series( `style:build` ) );
  gulp.watch( [ path.src.js ], gulp.series( `js:build` ) );
  gulp.watch( [ path.src.img ], gulp.series( `image:build` ) );
  gulp.watch( [ path.src.fonts ], gulp.series( `fonts:build` ) );
} );

gulp.task( `default`, gulp.series( `clean`, gulp.parallel( `build`, `server:lunch`, `watch` ) ) );
