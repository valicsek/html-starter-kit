const gulp = require('gulp')

const browserSync = require('browser-sync').create()
const uglifyes = require('gulp-uglify-es').default
const uglifycss = require('gulp-uglifycss')
const minifycss = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
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

gulp.task('assets', ['styles', 'scripts'])

gulp.task('styles', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', `*.${config.dev.style.file_type}`))
    .pipe(concat('all.css'))
    .pipe(minifycss())
    .pipe(uglifycss())
    .pipe(gulp.dest(path.join(__dirname, config.build.source, 'assets', 'css')))
})

gulp.task('scripts', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', `*.js`))
    .pipe(concat('all.js'))
    .pipe(uglifyes())
    .pipe(gulp.dest(path.join(__dirname, config.build.source, 'assets', 'js')))
})

gulp.task('html', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', `*.html`))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path.join(__dirname, config.build.source)))
})

gulp.task('build', ['assets', 'html'])
