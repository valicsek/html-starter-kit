const gulp = require('gulp')

const browserSync = require('browser-sync').create()
const uglifyes = require('gulp-uglify-es').default
const minifycss = require('gulp-clean-css')
const purify = require('gulp-purifycss')
const imagemin = require('gulp-imagemin')
const inject = require('gulp-inject')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const path = require('path')
const config = require('./config')
const run_sequence = require('run-sequence')

gulp.task('dev', () => {
  run_sequence(
    'build'
  )

  browserSync.init({
    server: {
      baseDir: path.join(__dirname, 'build')
    }
  })

  gulp.watch(path.join(__dirname, config.dev.source, '**', `*.*`), () => {
    gulp.start('build')
    browserSync.reload()
  })
})

gulp.task('assets', ['styles', 'scripts', 'resources'])

gulp.task('styles', () => {
  gulp.src(path.join(__dirname, config.dev.source, '**', `*.${config.dev.style.file_type}`))
    .pipe(concat('style.min.css'))
    .pipe(purify([path.join(__dirname, config.dev.source, '**', '*.js'), path.join(__dirname, config.dev.source, '**', '*.html')]))
    .pipe(minifycss())
    .pipe(gulp.dest(path.join(__dirname, config.build.source, 'assets', 'css')))
})

gulp.task('scripts', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', `*.js`))
    .pipe(concat('style-min.js'))
    .pipe(uglifyes({
      mangle: {
        toplevel: config.build.mangle_top_level
      }
    }))
    .pipe(gulp.dest(path.join(__dirname, config.build.source, 'assets', 'js')))
})

gulp.task('resources', () => {
  gulp.src(path.join(__dirname, config.dev.source, '**', '*.+(jpg|jpeg|gif|png|svg)'))
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(__dirname, config.build.source)))
})

gulp.task('html-copy', () => {
  return gulp.src(path.join(__dirname, config.dev.source, '**', '*.html'))
    .pipe(gulp.dest(path.join(__dirname, config.build.source)))
})

gulp.task('html-ref-min', () => {
  return gulp.src(path.join(__dirname, config.build.source, '**', '*.html'))
    .pipe(inject(gulp.src([
      path.join(__dirname, config.build.source, '**', `*.js`),
      path.join(__dirname, config.build.source, '**', `*.css`)
    ], {
      read: false
    }), {
      transform: (path, file) => {
        if (!path.includes('css')) {
          return `<script src="${path}" async></script>`
        } else {
          return `<link rel="stylesheet" href="${path}" media="none" onload="if(media!='all')media='all'">`
        }
      },
      addRootSlash: false,
      relative: true
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path.join(__dirname, config.build.source)))
})

gulp.task('build', () => {
  run_sequence(
    'assets',
    'html-copy',
    'html-ref-min'
  )
})
