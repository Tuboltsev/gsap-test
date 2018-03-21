'use strict'

import gulp 		from 'gulp';
// import notify 		from 'gulp-notify';
// import uglify 		from 'gulp-uglify';
// import browserify 	from 'browserify';
// import babelify 	from 'babelify';
// import source 		from 'vinyl-source-stream';
// import gulpIf 		from 'gulp-if';
// import browserSync 	from 'browser-sync';

// // browserSync = browserSync.create();

// let jsBuild = (src, dest, options) => {
// 	return () => browserify({
// 			entries: src,
// 			// Remove sourcemap for production
// 			debug: options.isDevelopment
// 		})
// 		.transform('babelify', {
// 			presets: ['es2015']
// 		})
// 		.bundle().on('error', notify.onError({
// 			title: 'JS error'
// 		}))
// 		.pipe(source(options.entry))
// 		// .pipe(gulpIf(!options.isDevelopment, uglify()))
// 		.pipe(gulp.dest(dest))
// 		// .pipe(gulpIf(options.isDevelopment, browserSync.stream()));
// };

// export default jsBuild;


function jsBuild(src, dest) {

	return () => gulp.src(src)
		.pipe(gulp.dest(dest));
};

export default jsBuild;