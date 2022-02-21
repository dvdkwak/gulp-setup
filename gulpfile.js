const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function serve(cb) {
  browserSync.init({
    server: './build'
  });
  cb();
}

function reload(done) {
  browserSync.reload();
  done();
}

function buildHtml(cb) {
  src('./index.html')
    .pipe(dest('./build'));
  cb();
}

function compileSass(cb) {
  src('./style/**/*.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(dest('./build/style'));
    cb();
}

function watchSass(cb) {
  watch(['./style/**/*.scss'], series(compileSass, reload));
  cb();
}

function watchHtml(cb) {
  watch(['./index.html'], series(buildHtml, reload));
  cb();
}

exports.default = parallel(serve, watchHtml, watchSass);
exports.build = parallel(buildHtml, compileSass);
exports.watcher = parallel(watchHtml, watchSass);
exports.serve = serve;