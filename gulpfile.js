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
  root: `./dist`,
  dist: {
    html: `dist/`,
    js: `dist/js/`,
    css: `dist/css/`,
    img: `dist/img/`,
    fonts: `dist/webfonts/`
  },
  src: {
    html: `src/*.html`,
    js: `src/js/*.js`,
    style: `src/style/*.scss`,
    img: `src/img/**/*.*`,
    fonts: `src/webfonts/**/*.*`,
    cssLib: `src/style/libs/*.css`
  },
  watch: {
    html: [ `src/*.html`, `src/templates/*.html` ],
    js: [ `src/js/**/*.js` ],
    style: [ `src/style/**/*.scss` ],
    img: [ `src/img/**/*.*` ],
    fonts: [ `src/webfonts/**/*.*` ],
    cssLib: [ `src/style/libs/*.css` ]
  }
}

const config = {
  server: { baseDir: path.root },
  tunnel: false,
  host: `localhost`,
  port: 9000,
  logPrefix: `slpServer`
}

gulp.task( `server:lunch`, function () {
  return browserSync( config );
} );

gulp.task( `clean`, function ( cb ) {
  return rimraf( path.root, cb );
} );

gulp.task( `html:build`, function () {
  return gulp.src( path.src.html )
    .pipe( includer( { basePath: 'src/' } ) )
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
    .pipe( sass() )
    .pipe( postcss( [ autoprefixer() ] ) )
    .pipe( csso() )
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

gulp.task( `css-lib:copy`, function () {
  return gulp.src( path.src.cssLib )
    .pipe( gulp.dest( path.dist.css ) );
} );

gulp.task( `build`, gulp.series( `html:build`, `js:build`, `style:build`, `css-lib:copy`, `fonts:build`, `image:build` ) );

gulp.task( `watch`, function () {
  gulp.watch( [ ...path.watch.html ], gulp.series( `html:build` ) );
  gulp.watch( [ ...path.watch.style ], gulp.series( `style:build` ) );
  gulp.watch( [ ...path.watch.js ], gulp.series( `js:build` ) );
  gulp.watch( [ ...path.watch.img ], gulp.series( `image:build` ) );
  gulp.watch( [ ...path.watch.fonts ], gulp.series( `fonts:build` ) );
  gulp.watch( [ ...path.watch.cssLib ], gulp.series( `css-lib:copy` ) );
} );

gulp.task( `default`, gulp.series( `clean`, gulp.parallel( `build`, `server:lunch`, `watch` ) ) );
