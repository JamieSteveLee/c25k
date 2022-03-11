const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel  = require('gulp-babel');

gulp.task('styles', ()=> {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('.'))
});

gulp.task('scripts', ()=> {
	function createErrorHandler(name) {
		return (err) => {
			console.error('Error from ' + name + ' in scripts task', err.toString());
		};
	}
	return gulp.src(['src/js/**/*.js'])
		.pipe(babel({presets: ['@babel/env']}))
		// .pipe(uglify())
		// .on('error', createErrorHandler('uglify'))
		.pipe(concat('scripts.min.js'))
		.on('error', createErrorHandler('concat'))
		.pipe(gulp.dest('.'));
});

gulp.task('watch', ()=> {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));
	gulp.watch('src/js/**/*.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.series('scripts', 'styles', 'watch'));
