'use strict';
const babel = require('gulp-babel');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const through2 = require('through2');
const mergeStream = require('merge-stream');

gulp.task('default', () => {
  execSync('rm -rf lib');
  const scss = gulp.src(['src/' + '**/' + '*.scss', 'src/index.js'])
    .pipe(through2.obj(function (file, encoding, next) {
      this.push(file.clone());
      next()
    }))
    .pipe(gulp.dest('lib'));
  const js = gulp.src(['src/' + '**/' + '*.js', 'src/' + '**/' + '*.jsx'])
    .pipe(babel({
      presets: [require.resolve('babel-preset-es2015-ie'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
      plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-transform-decorators-legacy')]
    }))
    .pipe(gulp.dest('lib'));
  return mergeStream(scss, js);
})