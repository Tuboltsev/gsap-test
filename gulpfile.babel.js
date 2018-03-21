'use strict'

import cfg 			from './gulp.config';

import gulp 		from 'gulp';
import gulpIf 		from 'gulp-if';
import watch 		from 'gulp-watch';
import browserSync 	from 'browser-sync';
import del 			from 'del';

/**
 * Tasks
 */
import assets 		from './tasks/assets';
import images 		from './tasks/images';
import html 		from './tasks/html-build';
import style 		from './tasks/style-build';
import js 			from './tasks/js-build';
import jsVendors 	from './tasks/vendors-js';
import styleVendors from './tasks/vendors-style';

browserSync.create();

const path = cfg.path();

// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const isDevelopment = true;



gulp.task('clean', () => {
	return del([cfg.folder.build, cfg.folder.prod]);
});

gulp.task('assets:build', assets(path.src.assets, path.build.assets));

gulp.task('images:build', images(path.src.img, path.build.img, {
	isDevelopment: isDevelopment,
	optimizationLevel: cfg.imagesOptimizationLevel
}));

gulp.task('html:build', html(path.src.html, path.build.html, {
	isDevelopment: isDevelopment
}));

gulp.task('style:build', style(path.src.style, path.build.style, {
	isDevelopment: isDevelopment,
	versions: cfg.versions
}));

gulp.task('js:build', js(path.src.js, path.build.js, {
	isDevelopment: isDevelopment,
	entry: cfg.entries.js
}));

gulp.task('js:vendor', jsVendors(path.src.vendorJs, path.build.js, {
	isDevelopment: isDevelopment,
	files: cfg.libs,
	output: cfg.entries.vendorJs
}));

gulp.task('style:vendor', styleVendors(path.src.vendorScss, path.build.style, {
	isDevelopment: isDevelopment
}));

function webserver() {
	browserSync.init({
		server: "./build"
	});
}

function watcher() {
	gulp.watch(path.watch.html, gulp.series('html:build'));
	gulp.watch(path.watch.style, gulp.series('style:build'));
	gulp.watch(path.watch.js, gulp.series('js:build'));
	gulp.watch(path.watch.img, gulp.series('images:build'));
	gulp.watch(path.watch.assets, gulp.series('assets:build'));
	gulp.watch(path.watch.vendorJs, gulp.series('js:vendor'));
	gulp.watch(path.watch.vendorScss, gulp.series('style:vendor'));
}

gulp.task('build', gulp.parallel(
	'assets:build',
	'images:build',
	'html:build',
	'js:vendor',
	'js:build',
	'style:build',
	'style:vendor'
));

gulp.task('dev', gulp.series(
	'build',
	watcher,
	webserver
));

gulp.task('default', gulp.series(
	'clean',
	'build'
));