const gulp = require("gulp");
var del = require('del');


gulp.task('cleanLib', function(cb) {
    return del(['lib/**/*'], cb);
    console.log("cleaning....")
});
gulp.task('copy', ['cleanLib'], function() {
    console.log("copying....")
    return gulp.src(["src/components/**/*.less", "src/components/**/*.md", "src/components/**/*.svg"]).pipe(gulp.dest("lib"))
});