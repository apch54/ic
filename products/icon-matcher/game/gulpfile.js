var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src(["src/**/!(boot)*.coffee", "src/boot.coffee"])
      .pipe(coffee())
      .pipe(concat('game.js'))
      .pipe(gulp.dest('build/'));
});

gulp.task('default', ['coffee', 'watch']);

gulp.task('coffee', function(){
  return gulp.src(["src/**/!(boot)*.coffee", "src/boot.coffee"])
      .pipe(coffee())
      .pipe(concat('game.js'))
      .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch("src/**/*.coffee", ['coffee']);
});
