var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('build', function () {
    process.env.NODE_ENV = 'development';
    return browserify({entries: './js/main.js', extensions: ['.jsx'], debug: false})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	return gulp.src('./css/sass/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concat("main.css"))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions',
				'android 4',
				'opera 12',
				'safari 8'
			]
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		files: ['{dist}/*.js', '{css}/*.css'],
		proxy: "poke-igniter.dev",
		snippetOptions: {
			whitelist: ['/wp-admin/admin-ajax.php'],
			blacklist: ['/wp-admin/**']
		}
	})
})

gulp.task('watch', ['build', 'sass', 'browser-sync'], function () {
    gulp.watch( ['./js/*.js', './js/*.jsx'], ['build']);
    gulp.watch( ['./js/**/*.js', './js/**/*.jsx'], ['build']);
    gulp.watch( ['./js/**/**/*.js', './js/**/**/*.jsx'], ['build']);
    gulp.watch( ['./css/sass/*.scss'], ['sass']);
});

gulp.task('default', ['watch']);