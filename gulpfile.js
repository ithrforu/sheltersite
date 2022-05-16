import pkg from 'gulp';
const { src, dest, parallel, series, watch } = pkg;

import autoprefixer  from 'gulp-autoprefixer';
import rename        from 'gulp-rename';
import sourcemaps    from 'gulp-sourcemaps';

import dartSass      from 'sass';
import gulpSass      from 'gulp-sass';
const sass = gulpSass(dartSass);

import htmlmin       from 'gulp-htmlmin';
import terser        from 'gulp-terser';

import ttf2woff      from 'gulp-ttf2woff';
import ttf2woff2     from 'gulp-ttf2woff2';
import imagemin      from 'gulp-imagemin';
import del           from 'del';
import browserSync   from 'browser-sync';

import ghPages       from 'gulp-gh-pages';

const autoPrefixOptions = {
	overrideBrowserslist: ['last 10 version'],
	grid: true
};

const sassOptions = {
	outputStyle: 'compressed',
	indentType: 'tab',
	indentWidth: '1',
	allowEmpty: true
};

const stylesScss = () => {
	return src('src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions))
		.pipe(autoprefixer(autoPrefixOptions))
		.pipe(rename((path) => path.basename = 'styles.min'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('build/css'))
		.pipe(browserSync.stream());
};

const scripts = () => {
	return src('src/js/**/*.js')
		// .pipe(terser())
		.pipe(rename((path) => {path.basename += ".min"}))
		.pipe(dest('build/js'))
		.pipe(browserSync.stream());
};

const images = () => {
	return src('src/assets/images/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('build/assets/images'));
};

const fonts = () => {
	src('src/assets/fonts/**/*.ttf')
		.pipe(ttf2woff())
		.pipe(dest('build/assets/fonts'));
		return src('src/assets/fonts/**/*.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('build/assets/fonts'));
};

const copyAssets = () => {
	return src([
		'src/assets/**/*',
		'!src/assets/images/**/*',
		'!src/assets/fonts/**/*',
	], {
		base: 'src'
	})
		.pipe(dest('build'))
		.pipe(browserSync.stream({
			once: true
		}));
};

const copyImages = () => {
	return src('src/assets/images/**/*', {
		base: 'src'
	})
		.pipe(dest('build'))
		.pipe(browserSync.stream({
			once: true
		}));
};

const copyHtml = () => {
	return src('src/*.html')
		.pipe(dest('build'))
};

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(dest('build'));
};

export const cleanMaps = () => {
	return del('build/**/*.map');
};

const cleanDist = () => {
	return del('build');
};


const browserSyncer = () => {
	browserSync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'build',
			watch: true
		}
	});
};

const watching = () => {
	watch('src/scss/**/*.scss', stylesScss);
	watch('src/**/*.html', htmlMinify).on('change', browserSync.reload);
	watch('src/js/**/*.js', scripts);
	watch('src/assets/images/**/*', copyImages);
	watch([
		'src/assets/**/*',
		'!src/assets/images/**/*',
	], copyAssets);
};

const pages = (done) => {
	return src('build/**/*')
		.pipe(ghPages());
	done();
};

export const build = series(
	cleanDist,
	stylesScss,
	htmlMinify,
	scripts,
	images,
	fonts,
	copyAssets
);

export const dev = series(
	cleanDist,
	stylesScss,
	copyHtml,
	scripts,
	copyImages,
	fonts,
	copyAssets,
	parallel(
		browserSyncer,
		watching
	)
);

export const deploy = pages;