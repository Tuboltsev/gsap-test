'use strict'

import gulp 	from 'gulp';
import gulpIf 	from 'gulp-if';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

let imagesBuild = (src, dest, options) => {
	return () => gulp.src(src)
		.pipe(
			gulpIf(!options.isDevelopment, 
				imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()],
					interlaced: true,
					optimizationLevel: options.optimizationLevel
				})
			)
		)
		.pipe(gulp.dest(dest));
};

export default imagesBuild;