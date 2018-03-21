'use strict'

import gulp 		from 'gulp';
import pug 			from 'gulp-pug';
import htmlhint 	from 'gulp-htmlhint';
import notify 		from 'gulp-notify';
import sourcemaps 	from 'gulp-sourcemaps';
import gulpIf 		from 'gulp-if';
import browserSync 	from 'browser-sync';

// browserSync = browserSync.create();

let htmlBuild = (src, dest, options) => {

	return () => gulp.src(src)
		.pipe(pug({
			pretty: true
		})).on('error', notify.onError({
			title: 'Error pug compile'
		}))
		.pipe(htmlhint({
			'attr-lowercase': ['viewBox']
		}))
		.pipe(htmlhint.reporter('htmlhint-stylish'))
		.pipe(htmlhint.failReporter({
			suppress: true 
		}))
		.on('error', notify.onError({
			title: 'HTML error'
		}))
		.pipe(gulp.dest(dest));
		// .pipe(gulpIf(options.isDevelopment, browserSync.stream()));
};

export default htmlBuild;