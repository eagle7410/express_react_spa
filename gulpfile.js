let gulp = require('gulp'), // Сообственно Gulp JS
	concat = require('gulp-concat'), // Склейка файлов
	cssmin = require('gulp-cssmin'); // Мініфикатор

gulp.task('css', () => gulp.src([
		'./static/bower/bootstrap/dist/css/bootstrap.css',
		'./static/css/main.b8c9ea9f.css'
	])
	.pipe(concat('app.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('./static/css'))
);

gulp.task('default', ['css']);
