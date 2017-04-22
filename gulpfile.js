let gulp = require('gulp'), // Сообственно Gulp JS
	concat = require('gulp-concat'), // Склейка файлов
	jsmin = require('gulp-minify'), // Js mini
	cssmin = require('gulp-cssmin'); // Мініфикатор

gulp.task('css', () => gulp.src([
		'./static/bower/bootstrap/dist/css/bootstrap.css',
		'./static/bower/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
		'./static/app/app.styles.css'
	])
	.pipe(concat('app.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('./static/app/assets'))
);

gulp.task('jsAsync', () => gulp.src([
		'./static/bower/jquery/dist/jquery.slim.min.js',
		'./static/bower/bootstrap/dist/js/bootstrap.js',
		'./static/bower/moment/min/moment.min.js',
		'./static/bower/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
		'./static/bower/chart.js/dist/Chart.js'
	])
		.pipe(concat('async.js'))
		.pipe(jsmin())
		.pipe(gulp.dest('./static/app/assets'))
);

gulp.task('jsApp', () => gulp.src([
		'./static/app/app.inline.js',
		'./static/app/app.vendor.js',
		'./static/app/app.polyfills.js',
		'./static/app/app.main.js'
	])
		.pipe(concat('app.js'))
		.pipe(jsmin())
		.pipe(gulp.dest('./static/app/assets'))
);
gulp.task('default', ['jsApp']);
