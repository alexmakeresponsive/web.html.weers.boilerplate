'use strict';

/**
 * Constants
 * */

/*common consts*/
const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const del           = require('del');
const concat        = require('gulp-concat');
const concatUtil    = require('gulp-concat-util');
const runSequence   = require('run-sequence');
const rename        = require("gulp-rename");
/*common consts*/

/*styles consts*/
const stylus          = require('gulp-stylus');
const autoprefixer  = require('gulp-autoprefixer');
const cssnano       = require('gulp-cssnano');
/*styles consts*/

/**
 * Constants
 * */




//Styles tasks
  //Theme

   gulp.task( 'styles:theme:clean', function() {
     del(['./design/theme.styles.css']).then(paths => {
       console.log('Deleted files and folders:\n', paths.join('\n'));
     });
   });


   gulp.task('styles:theme:build', function () {
     return gulp.src(
       [
         './components/theme/Common/index.styl',
         './components/theme/**/*.styl'
       ]
     )
       .pipe(concat('styles.styl'))
       .pipe(stylus().on('error', stylus.logError))
       .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
         .pipe( cssnano() )
         .pipe( rename({
             suffix: ".min"
         }))
       .pipe(gulp.dest('./design'));
   });

   gulp.task( 'styles:theme', function() {
     runSequence(
         'styles:theme:clean',
         'styles:theme:build',
     );
   });


    //Vendor

    gulp.task( 'styles:vendor:clean', function () {
        del([
            './resses/vendor/styles/*.css',
            './resses/vendor/styles/**/*.css'
        ]).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task( 'utility:styles:nano', function() {
        return gulp.src(
            [
                '!./resses/vendor/libs/sample-data/**/*.css',

                './resses/vendor/libs/**/*.css'
            ]
        )
            .pipe( cssnano() )
            .pipe(concatUtil('styles.mins.collection.css', { sep: '\n/*--separator--*/\n' }))
            .pipe( gulp.dest( './resses/vendor/styles' ) );
    });


    gulp.task('utility:styles:build:css', function () {
        return gulp.src(
            [
                './resses/vendor/libs/**/*.css'
            ]
        )
            .pipe(concatUtil('styles.css', { sep: '\n/*--separator--*/\n' }))
            .pipe(gulp.dest('./resses/vendor/styles'));
    });


    gulp.task('utility:styles:build:mincss', function () {
        return gulp.src(
            [
                './resses/vendor/libs/sample-data/**/*.css',

                './resses/vendor/styles/styles.mins.collection.css'
            ]
        )
            .pipe(concatUtil('styles.min.css', { sep: '\n/*--separator--*/\n' }))
            .pipe(gulp.dest('./resses/vendor/styles'))
    });


    gulp.task( 'utility:styles:del:collection', function () {
        del([
            './resses/vendor/styles/styles.mins.collection.css'
        ]).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task( 'utility:styles', function () {
        runSequence(
            'utility:styles:clean',
            'utility:styles:nano',
            [ 'utility:styles:build:css', 'utility:styles:build:mincss' ],
            'utility:styles:del:collection'
        );
    });

    //Vendor


    //Watch
    gulp.task( 'styles:watch', function () {
        gulp.watch( './components/theme/**/*.styl', ['styles:theme'] );
        gulp.watch( './components/vendor/**/*.css', ['styles:vendor'] );
    });
    //Watch

//Styles tasks



//Start tasks
gulp.task( 'start', [
    'styles',
    'styles:watch',
    'liveReload'
] );
//Start tasks