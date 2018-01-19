//引入所需的插件
var gulp = require("gulp");
var sass = require("gulp-sass");
//创建任务（发布任务）
gulp.task("styles",function(){
	return gulp.src("public/sass/*.scss").pipe(sass({style:"nested"})).pipe(gulp.dest("public/stylesheets"));
})
//发布一个监听任务
gulp.task("watch",function(){
	gulp.watch("public/sass/*.scss",["styles"]);
})
