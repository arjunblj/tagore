
var gulp = require('gulp')
var changed = require('gulp-changed')
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')

var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var watchify = require('watchify')
var eslint = require('gulp-eslint')

var config = {
  src: './src/js/main.js',
  dest: './build/js',
  outputName: 'app.js',
  debug: true
}

var handleBrowserifyError = function(err) {
  gutil.log(
      gutil.colors.red("Browserify compile error:"),
      err.message,
      "\n\n",
      err.codeFrame
  )
}

watchify.args.debug = config.debug
var bundler = watchify(browserify(config.src, watchify.args))
bundler.transform("babelify", {
  presets: ["es2015", "stage-0", "react"],
  plugins: ["transform-react-display-name"]
})

gulp.task('browserify', bundle)
bundler.on('update', bundle)

function bundle() {
  return bundler.bundle()
    .on('error', handleBrowserifyError)
    .pipe(source(config.outputName))
    .pipe(gulp.dest(config.dest))
}

gulp.task('sass', function () {
  gulp.src('./src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('markup', function() {
  var dest = './build'

  return gulp.src('src/htdocs/**')
    .pipe(plumber())
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

gulp.task('css', function() {
  var dest = './build/css'

  return gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

gulp.task('lint', function () {
  return gulp.src(['src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('default', ['browserify', 'sass', 'markup', 'css', 'lint'], function() {
  gulp.watch('src/js/**', ['browserify'])
  gulp.watch('src/sass/*.sass', ['sass'])
  gulp.watch('src/htdocs/**', ['markup'])
  gulp.watch('src/css/*.css', ['css'])
  gulp.watch('src/js/*.js', ['lint'])
});
