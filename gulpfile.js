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
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var del = require('del');

gulp.task('browser-sync', function() {
	gutil.log('Browser Sync!');
    browserSync.init({
        server: {
            baseDir: "./src/html/"
        }
    });
});

gulp.task('js', function () {
  	return gulp.src('src/js/index.js', {read: false})
    	.pipe(tap(function (file) {
      		gutil.log('bundling ' + file.path);
      		file.contents = browserify(file.path, {debug: true}).transform("babelify", {presets: ["es2015"]}).bundle();
    	}))
    	.pipe(rename('bundle.js'))
    	.pipe(buffer())
    	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(uglify({ mangle: false }))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function(){
	gulp.src('src/html/**/*')
	.pipe(gulp.dest('dist/html'));
})

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

var FAVICON_DATA_FILE = 'faviconData.json';

gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'main_favicon.png',
		dest: 'dist/favicons',
		iconsPath: '/favicons',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '7%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: true,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: true,
						medium: true,
						big: true,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: 'GRE Reminder',
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 70,
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

gulp.task('inject-favicon-markups', function() {
	gulp.src([ 'src/index.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('dist'));
});

gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});

gulp.task('clean', function(){
  return del([
    'dist/**/*',
    '!dist/favicons',
	'!dist/favicons/**'
  ]);
})

gulp.task('release', ['js', 'inject-favicon-markups', 'copy-html'])