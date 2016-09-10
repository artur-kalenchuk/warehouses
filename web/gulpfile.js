var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    KarmaServer = require('karma').Server,
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust'),
    cachebust = new CacheBuster(),
    buildConfig = require('./build.config.js');


/*
* Cleans the build output
* */

gulp.task('clean', function (cb) {
    del([
        'build'
    ], cb);
});


/*
* Runs bower to install frontend dependencies
* */

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});


/*
* Runs sass, creates css source maps
* */

 gulp.task('build-css', ['clean', 'build-vendor-css'], function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('build-vendor-css', ['clean'], function() {
    var concat = require("gulp-concat"),
        vendorCss = buildConfig.vendor_files.css;

    return gulp.src(vendorCss)
        .pipe(sourcemaps.init())
        .pipe(cachebust.resources())
        .pipe(concat('css_from_vendor.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/css'));
});


/**
* Fills in the Angular template cache, to prevent loading the html templates via
* separate http requests
*/

gulp.task('build-template-cache', ['clean'], function() {

    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat"),
        appTemplate = buildConfig.app_files.atpl;

    return gulp.src(appTemplate)
        .pipe(ngHtml2Js({
            moduleName: "templates-app"
        }))
        .pipe(concat("templatesApp.js"))
        .pipe(gulp.dest("./build"));
});


/**
* Runs jshint
*/

gulp.task('jshint', function() {
    var appJs = buildConfig.app_files.js;
    gulp.src(appJs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/**
* Runs karma tests
*/

 gulp.task('test', ['build-js'], function() {
    var testFiles = buildConfig.app_files.jsunit;
//
     new KarmaServer({
         configFile: __dirname + '/karma.conf.js',
         singleRun: true
     }).start();


//    return gulp.src(testFiles)
//        .pipe(new KarmaServer({
//            configFile: '..karma.conf.js',
//            singleRun: true,
//            action: 'run'
//        }))
//        .on('error', function(err) {
//            console.log('karma tests failed: ' + err);
//            throw err;
//        });
});


/*
* Build a minified Javascript bundle - the order of the js files is determined
* by browserify. Get vendor js.
* */

gulp.task('build-vendor-js', ['clean'], function() {
    var vendorJs = buildConfig.vendor_files.js;

    return gulp.src(vendorJs)
        .pipe(gulp.dest('./build/js/vendor'));
});

gulp.task('build-js', ['clean', 'build-vendor-js'], function() {
    var appJs = buildConfig.app_files.js,
        b = browserify({
        entries: 'src/app/app.js',
        debug: true,
        paths: appJs,
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js/'));
});


/*
* Full build, applies cache busting to the main page css and js bundles
* */

gulp.task('build', [ 'clean', 'bower','build-css','build-template-cache', 'jshint', 'build-js'], function() {
    return gulp.src('src/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('build'));
});


/*
* Watches file system and triggers a build when a modification is detected
* */

 gulp.task('watch', function() {
    var appJs = buildConfig.app_files.js,
        appTemplate = buildConfig.app_files.atpl,
        appScss = 'src/sass/*.scss';

    return gulp.watch(appJs.concat(appTemplate, appScss), ['build']);
});


/*
* Launches a web server that serves files in the current directory
* */

gulp.task('webserver', ['watch','build'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/build/index.html"
        }));
});
