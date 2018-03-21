'use strict'

import gulp 		from 'gulp';
import sass 		from 'gulp-sass';
import gulpIf 		from 'gulp-if';

let styleVendors = (src, dest, options) => {
	return () => gulp.src(src)
		.pipe(sass(
        	gulpIf(!options.isDevelopment, {outputStyle: 'compressed'})
        ))
		.pipe(gulp.dest(dest));
};

export default styleVendors;