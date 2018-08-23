const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss')
const clearfix = require('postcss-clearfix')
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const Plumber = require('gulp-plumber'); //错误处理

gulp.task('serve', ['sass', 'js'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./src/scss/*.scss", ['sass']);
  gulp.watch("./src/states/*.js", ['js']);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./src/**/*.js").on('change', browserSync.reload);
});


gulp.task('js', function() {
  return gulp.src(['./src/states/*.js'])
    .pipe(Plumber())
    .pipe(concat('state.all.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./src/'));
})

/* sass */
gulp.task('sass', function() {
  return 
    gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 8'], cascade: false }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
