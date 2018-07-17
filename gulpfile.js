const gulp = require('gulp')

const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const minifycss = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat')
const path = require('path')
const config = require('./config')

gulp.task('dev', () => {
  browserSync.init({
    server: {
      baseDir: path.join(__dirname, config.dev.source)
    }
  })

  gulp.watch(path.join(__dirname, config.dev.source, 'assets', '**', `*.${config.dev.style.file_type}`), browserSync.reload)
  gulp.watch(path.join(__dirname, config.dev.source, '*.html')).on('change', browserSync.reload)
})

gulp.task('styles', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', `*.${config.dev.style.file_type}`))
    .pipe(concat('all.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(path.join(__dirname, config.build.source, 'assets', 'css')))
})

gulp.task('scripts', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', `*.js`))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(__dirname, config.build.source, 'assets', 'js')))
})

gulp.task('build', ['styles', 'scripts'])
