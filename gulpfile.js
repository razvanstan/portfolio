var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var responsive = require('gulp-responsive');
var svgSprite = require("gulp-svg-sprites");

gulp.task('sprites', function () {
    return gulp.src('images/icons/*.svg')
        .pipe(svgSprite({
            baseSize: 160,
            templates: { scss: true },
            layout: 'diagonal',
            svgPath: 'assets/svg/sprite.svg'
        }))
        .pipe(gulp.dest("assets"));
});

gulp.task('responsive', function () {
    return gulp.src('images/*.jpg')
        .pipe(responsive({
            '*.jpg': [
                {
                    width: 200,
                    rename: { suffix: '-200px' }
                },{
                    width: 400,
                    rename: { suffix: '-400px' }
                }
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("jade", function() {
    return gulp.src(['./templates/index.jade'])
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src(['./styles/style.scss', './styles/assets.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {

    gulp.watch([
        './templates/*.jade'
    ], ['jade']);

    gulp.watch([
        './styles/*.scss'
    ], ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sprites', 'jade', 'sass']);