var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");

gulp.task('browser-sync', function() {
	gutil.log('Browser Sync!');
    browserSync.init({
        server: {
            baseDir: "./src/html/"
        }
    });
});

gulp.task('release', function () {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
	gulp.src('src/html/**/*')
    	.pipe(gulp.dest('dist/html'));
  	return gulp.src('src/js/index.js', {read: false})
    	.pipe(tap(function (file) {
      		gutil.log('bundling ' + file.path);
      		file.contents = browserify(file.path, {debug: true}).transform("babelify", {presets: ["es2015"]}).bundle();
    	}))
    	.pipe(buffer())
    	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(uglify())
    	.pipe(sourcemaps.write('./'))
		.pipe(rename('bundle.js'))
    	.pipe(gulp.dest('dist/js'));
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});