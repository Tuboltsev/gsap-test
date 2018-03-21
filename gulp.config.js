const config = {
	folder: {
		tasks: 	'tasks',
		src: 	'src',
		build: 	'build',
		prod: 	'production'
	},
	entries: {
		js: 		'app.js',
		style: 		'main.scss',
		vendorJs: 	'vendors.js',
		vendorScss: 'vendors.scss'
	},
	libs: [
		'jquery.min.js',
		'jquery.disablescroll.min.js',
		'TweenMax.min.js',
		'TimelineMax.min.js'
	],
	path: function() {
		return {
			build: {
				html: 		`./${this.folder.build}/`,
				js: 		`./${this.folder.build}/js/`,
				style: 		`./${this.folder.build}/assets/css/`,
				img: 		`./${this.folder.build}/assets/images/`,
				assets: 	`./${this.folder.build}/assets/`
			},
			src: {
				html:   	`./${this.folder.src}/*.pug`,
				js:     	`./${this.folder.src}/js/${this.entries.js}`,
				style:  	`./${this.folder.src}/scss/${this.entries.style}`,
				img:    	`./${this.folder.src}/images/**/*.*`,
				assets:  	`./${this.folder.src}/assets/**/*.*`,
				vendorJs: 	`./${this.folder.src}/vendors/`,
				vendorScss: `./${this.folder.src}/vendors/${this.entries.vendorScss}`
			},
			watch: {
				html:   	`./${this.folder.src}/**/*.pug`,
				js:     	`./${this.folder.src}/js/**/*.js`,
				style:  	`./${this.folder.src}/scss/**/*.scss`,
				img:    	`./${this.folder.src}/images/**/*.*`,
				assets:  	`./${this.folder.src}/assets/**/*.*`,
				vendorJs: 	`./${this.folder.src}/vendors/${this.entries.vendorJs}`,
				vendorScss: `./${this.folder.src}/vendors/${this.entries.vendorScss}`
			},
			clean: 			`./${this.folder.build}`
		};
	},
	versions: 'last 4 versions',
	imagesOptimizationLevel: 5,

	webserver: {
		server: {
			baseDir: () => `./${this.folder.build}`
		},
		tunnel:      true,
		host:       'localhost',
		port:       9000,
		logPrefix:  "Frontend_Dev"
	}
};

export default config;