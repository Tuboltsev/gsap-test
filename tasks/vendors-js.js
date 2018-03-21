'use strict'

import gulp 		from 'gulp';
import concat		from 'gulp-concat';
import notify 		from 'gulp-notify';
import uglify 		from 'gulp-uglify';
import gulpIf 		from 'gulp-if';
// import browserify 	from 'browserify';
// import babelify 	from 'babelify';
// import source 		from 'vinyl-source-stream';

let jsVendors = (src, dest, options) => {
	let path = [];
	for (let file of options.files) {
		path.push(src + file);
	}
	return () => gulp.src(path)
	    .pipe(concat(options.output))
	    .on('error', notify.onError({
			title: 'JS error'
		}))
	    .pipe(gulpIf(!options.isDevelopment, uglify()))
	    .pipe(gulp.dest(dest));
	// return () => browserify({
	// 		entries: src,
	// 		// Remove sourcemap for production
	// 		debug: !options.isDevelopment
	// 	})
	// 	.transform('babelify', {
	// 		presets: ['es2015']
	// 	})
	// 	.bundle().on('error', notify.onError({
	// 		title: 'JS error'
	// 	}))
	// 	.pipe(source(options.entry))
	// 	.pipe(gulpIf(!options.isDevelopment, uglify()))
	// 	.pipe(gulp.dest(dest));
};

export default jsVendors;