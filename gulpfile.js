var gulp = require('gulp');

// /gulp 아래에 존재하는 모든 파일을 읽도록 하는 코드
var fs = require('fs');
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/'+task);
});

gulp.task('dev', ['watch:js', 'watch:css','dev:server']);
