var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var CacheBuster = require('gulp-cachebust');
var htmlReplace = require('gulp-html-replace');
var minifyCss = require('gulp-minify-css');
var iife = require('gulp-iife');
var shell = require('gulp-shell');
var install = require('gulp-install');

var cacheBust = new CacheBuster();


/*
 * CSS/JS urls
 */
var cssDev = [
	'bower_components/html5-boilerplate/dist/css/normalize.css',
	'bower_components/html5-boilerplate/dist/css/main.css',
	'bower_components/material-design-lite/material.css',
	'RobotoFont.css',
	'MaterialIcons.css',
	'codex.css'
];
var cssPrd = [
	'//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
	'//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
	'//storage.googleapis.com/code.getmdl.io/1.0.0/material.indigo-pink.min.css',
	'//fonts.googleapis.com/icon?family=Material+Icons',
	'codex.min.css'
];
var jsHeadDev = [
	'bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js'
];
var jsHeadPrd = [
	'//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js'
];
var jsBodyDev = [
	'bower_components/angular/angular.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/angular-resource/angular-resource.js',
	'bower_components/lodash/lodash.js',
	'bower_components/material-design-lite/material.js',
	'codex.js'
];
var jsBodyPrd = [
	'//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-route.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-resource.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.0/lodash.min.js',
	'//storage.googleapis.com/code.getmdl.io/1.0.0/material.min.js',
	'codex.min.js'
];


/*
 * General tasks
 */

gulp.task('clean', function(cb) {
	del([
		'dist/*'
	], cb);
});

gulp.task('clean-dev', function(cb) {
	del([
		'dev/*',
		'!dev/bower_components'
	], cb);
});

/*
 * Production build tasks
 */

gulp.task('build-css', ['bower'], function() {
	return gulp.src([
		'dev/bower_components/html5-boilerplate/dist/css/main.css',
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
	return gulp.src([
			'app/**/*.module.js',
			'app/**/*.js',
			'!app/**/*.test.js',
			'dist/browsetemplates.js',
			'dist/readtemplates.js'
		])
		.pipe(iife())
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
				src: cssPrd,
				tpl: '<link rel="stylesheet" href="%s">'
			},
			jshead: jsHeadPrd,
			jsbody: jsBodyPrd
		}))
		.pipe(cacheBust.references())
		.pipe(gulp.dest('dist'));
});

/*
 * Dev build tasks
 */

gulp.task('bower', function() {
	return gulp.src('./bower.json')
		.pipe(install());
});

gulp.task('build-js-dev', function() {
		return gulp.src([
			'app/**/*.module.js',
			'app/**/*.js',
			'!app/**/*.test.js'
		])
		.pipe(iife())
		.pipe(concat('codex.js'))
		.pipe(gulp.dest('dev'));
});

gulp.task('build-static-dev', function() {
	// piping fonts through gulp corrupts the font data
	gulp.src('')
		.pipe(shell([
			'cp app/*.ttf app/*.eot app/*.woff app/*.woff2 dev/'
		]));
	
	return gulp.src(['app/**/*.css', 'app/**/*.html'])
		.pipe(htmlReplace({
			css: cssDev,
			jshead: jsHeadDev,
			jsbody: jsBodyDev
		}))
		.pipe(gulp.dest('dev'));
});

gulp.task('build-dev', ['clean', 'bower', 'build-js-dev', 'build-static-dev']);

gulp.task('watch-js-dev', function() {
	return gulp.watch([
		'app/**/*.js',
		'!app/**/*.test.js'
	], [
		'build-js-dev'
	]);
});

gulp.task('watch-static-dev', function() {
	return gulp.watch([
		'app/**/*.ttf',
		'app/**/*.eot',
		'app/**/*.woff',
		'app/**/*.woff2',
		'app/**/*.css',
		'app/**/*.html'
	], [
		'build-static-dev'
	]);
});

/*
 * Serve tasks
 */

gulp.task('serve-dev', ['build-dev', 'watch-js-dev', 'watch-static-dev'], function() {
	del([
		'public'
	]);
	
	return gulp.src('')
		.pipe(shell([
			'ln -s dev public',
			'bundle exec rackup'
		]));
});

gulp.task('serve-build', ['build'], function() {
	del([
		'public'
	]);
	
	return gulp.src('')
		.pipe(shell([
			'ln -s dist public',
			'bundle exec rackup'
		]));
});