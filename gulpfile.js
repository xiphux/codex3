var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var CacheBuster = require('gulp-cachebust');
var htmlReplace = require('gulp-html-replace');
var minifyCss = require('gulp-minify-css');

var cacheBust = new CacheBuster();

gulp.task('clean', function(cb) {
	del([
		'dist'
	], cb);
});

gulp.task('build-css', function() {
	return gulp.src([
		'app/bower_components/html5-boilerplate/dist/css/main.css',
		'app/codex.css'
	])
	.pipe(concat('codex.min.css'))
	.pipe(cacheBust.resources())
	.pipe(sourcemaps.init())
	.pipe(minifyCss())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist'));
});

gulp.task('build-browse-templates', function() {
	return gulp.src('app/browse/*.html')
		.pipe(templateCache('browsetemplates.js',{
			module: 'codex.browse',
			transformUrl: function(url) {
				return 'browse/' + url;
			}
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('build-read-templates', function() {
	return gulp.src('app/read/*.html')
		.pipe(templateCache('readtemplates.js',{
			module: 'codex.read',
			transformUrl: function(url) {
				return 'read/' + url;
			}
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('build-js', ['build-browse-templates','build-read-templates'], function() {
	return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js', '!app/**/*.test.js', 'dist/browsetemplates.js','dist/readtemplates.js'])
		.pipe(concat('codex.min.js'))
		.pipe(cacheBust.resources())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'build-css', 'build-js'], function() {
	del([
		'dist/browsetemplates.js',
		'dist/readtemplates.js'
	]);
	
	return gulp.src('app/index.html')
		.pipe(htmlReplace({
			css: {
				src: [
					'//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
					'//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
					'//storage.googleapis.com/code.getmdl.io/1.0.0/material.indigo-pink.min.css',
					'//fonts.googleapis.com/icon?family=Material+Icons',
					'codex.min.css'
				],
				tpl: '<link rel="stylesheet" href="%s">'
			},
			jshead: [
				'//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js'
			],
			jsbody: [
				'//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular.min.js',
				'//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-route.min.js',
				'//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-resource.min.js',
				'//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.0/lodash.min.js',
				'//storage.googleapis.com/code.getmdl.io/1.0.0/material.min.js',
				'codex.min.js'
			]
		}))
		.pipe(cacheBust.references())
		.pipe(gulp.dest('dist'));
});