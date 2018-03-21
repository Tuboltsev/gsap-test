'use strict'

import gulp from 'gulp';

function assets(src, dest) {

	return () => gulp.src(src)
		.pipe(gulp.dest(dest));
};

export default assets;