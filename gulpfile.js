'use strict';

var pkg = require('./package.json');
var config = require('./config.json');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


/* Task
 *
 * 1. HTML
 * 1.1 Prettier
 * 1.2 Deploy
 * 
 * 2. CSS 
 * 2.1 clean
 * 2.2 autoprefixer
 * 2.3 Deploy
 * 
 * 3. SASS
 * 3.1 Compile
 * 3.2 Genetare
 * 
 * 4. Image
 * 4.1 Generate Sprite
 * 4.2 Deploy
 * 
 * 5. JS
 * 5.1 vender
 * 5.2 bundle
 * 5.3 deploy
 * 
 * 6. SVG
 * 6.1 svg-sprite
 * 6.2 svgmin
 * 6.3 svg2png
 * 
 */

/* Deploy */
gulp.task('build', ['build:html', 'build:css', 'css:autoprefixer', 'build:js', 'build:img']); 

/* Build all */
gulp.task('build:svg', ['svg', 'svg:min']); 

// Browser-sync
gulp.task('serve', function() {
    browserSync.init({
        server: {
          baseDir : pkg.paths.src.base
        },
        directory: true
    });

    // gulp.watch(pkg.paths.src.scss + '*.scss', ['build:scss']);
    gulp.watch(pkg.paths.src.css + pkg.globs.css, ['css:autoprefixer']).on('change', reload);
    gulp.watch(pkg.paths.src.js + pkg.globs.js, ['build:js']).on('change', reload);
    gulp.watch(pkg.paths.src.base + pkg.globs.html).on('change', reload);
});

gulp.task('build:html', function() {
  $.fancyLog("** Building HTML **");
  return gulp.src(pkg.paths.src.base + pkg.globs.html)
  .pipe($.htmlhint())
  .pipe($.htmlhint.reporter())
  .pipe(gulp.dest(pkg.paths.dist.base))
});

gulp.task('build:css', function() {
  $.fancyLog("** Building CSS **");
  return gulp.src(pkg.paths.src.css + pkg.globs.css)
  .pipe(gulp.dest(pkg.paths.dist.css))
});

gulp.task('build:js', function () {
  $.fancyLog("** Building JS **");
  return gulp.src(pkg.paths.src.base + pkg.globs.html)
  .pipe($.useref())
  .pipe(gulp.dest('dist'));
});

gulp.task('html:hint', function(){
  return gulp.src(pkg.paths.src.base + pkg.globs.html)
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter())
});

gulp.task('js:vendor', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest(pkg.paths.vendor.js))
});

gulp.task('css:clean', function() {
  return gulp.src(pkg.paths.src.css + pkg.globs.style)
    .pipe($.cleanCss(config.cleanCss))
    .pipe(gulp.dest(pkg.paths.dist.css))
});

gulp.task('css:autoprefixer', function() {
	return gulp.src(pkg.paths.src.css + pkg.globs.style)
		.pipe($.autoprefixer({
			browsers: config.prefix,
			cascade: false
		}))
		.pipe(gulp.dest(pkg.paths.src.css))
});

gulp.task('build:img', function() {
	return gulp.src(pkg.paths.src.img + '*.*')
		.pipe(gulp.dest(pkg.paths.dist.img))
});

gulp.task('svg', function() {
  return gulp.src(pkg.paths.src.svg + pkg.globs.svg)
    .pipe($.svgSprite(config.svg))
    .pipe(gulp.dest(pkg.paths.src.svg));
});

gulp.task('svg:min', function () {
    return gulp.src(pkg.paths.src.img + pkg.globs.svg)
    .pipe($.svgmin())
    .pipe(gulp.dest(pkg.paths.src.img));
});

gulp.task('svg2png', function () {
    return gulp.src(pkg.paths.src.img + 'ico.svg')
      .pipe($.svg2png())
      .pipe(gulp.dest(pkg.paths.src.img));
});


