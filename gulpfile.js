const gulp = require("gulp");
const util = require('gulp-util');
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const chokidar = require('chokidar');

const glob_pattern = 'Source/**/*.js';

process.env.BABEL_TARGET = 'node';

function handleFile(stream) {
    stream.on('data', function (filePath) {
        let file = filePath.path;
        util.log(
            util.colors.green('File handled : ') +
            util.colors.magenta(file)
        );
    });

    stream
        .pipe(sourcemaps.init())
        .pipe(babel({
            sourceMaps: true
        }))
        .pipe(sourcemaps.write('.', {
            mapSources: function (sourcePath) {
                return '../Sources/' + sourcePath;;
            }
        }))
        .pipe(gulp.dest('bin'));
}

gulp.task('build', function () {
    return handleFile(gulp.src(glob_pattern))
});

gulp.task('watch', function () {
    let watcher = chokidar.watch(glob_pattern, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 100
        }
    });

    let filehandling = (file) => handleFile(gulp.src(file));

    watcher
        .on('change', filehandling)
        .on('add', filehandling)
        .on('unlink', (file) => {
            // delete
        });
});

gulp.task('default', ['build', 'watch']);
