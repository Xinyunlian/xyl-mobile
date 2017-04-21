const gulp = require("gulp");

gulp.task('copy', function() {
    return gulp.src(["src/components/**/*.less", "src/components/**/*.md"]).pipe(gulp.dest("lib"))
});