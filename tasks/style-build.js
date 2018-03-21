'use strict'

import gulp 		from 'gulp';
import sass 		from 'gulp-sass';
import prefixer 	from 'gulp-autoprefixer';
import notify 		from 'gulp-notify';
import sourcemaps 	from 'gulp-sourcemaps';
import gulpIf 		from 'gulp-if';
import browserSync 	from 'browser-sync';

// browserSync = browserSync.create();

let styleBuild = (src, dest, options) => {
	let isDevelopment = options.isDevelopment;

    return () => gulp.src(src)
        .pipe(
        	gulpIf(isDevelopment, sourcemaps.init())
        )
        .pipe(sass(
        	gulpIf(!isDevelopment, {outputStyle: 'compressed'})
        ))
        .on('error', notify.onError({
			title: 'CSS error'
		}))
        .pipe(prefixer(options.versions))
        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        .pipe(gulp.dest(dest))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
};

export default styleBuild;