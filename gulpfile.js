var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');
var plungins = gulpLoadPlugins();

var pngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var gulpif = require('gulp-if')

var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');  //同步任务，执行完会回调，再执行下个任务
var del = require('del');
var browserSync = require('browser-sync').create();

//定义文件目录路径
var appDir = 'app';
var distDir = 'www';
var paths = {
    css: ['app/css/*'],
    js: ['app/js/*'],
    img: ['app/img/*.*'],
    html: ['app/html/**/*.html']
}

// // // // // // // // // // // // // // // // // // //具体的优化生产任务// // // // // // // // // // // // // // // // // // 

// css压缩
gulp.task('css' , function() {
    return gulp.src(paths.css)
        .pipe(plungins.autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false, //是否美化属性值(对齐) 默认：true
        }))    
        .pipe(plungins.minifyCss())
        .pipe(gulp.dest(distDir + '/css/'))
        .pipe(browserSync.reload({stream:true}));
});

// js压缩
gulp.task('js' , function() {
    return gulp.src(paths.js)    
        .pipe(plungins.uglify())
        .pipe(gulp.dest(distDir + '/js/'))
        .pipe(browserSync.reload({stream:true}));
});

// img压缩
gulp.task('image' , function() {
     var jpgmin = imageminJpegRecompress({
            accurate: true,//高精度模式
            quality: "high",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        })
    return gulp.src(paths.img)
        .pipe(plungins.cache(plungins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            use: [jpgmin, pngquant()]
        })))
        .pipe(gulp.dest(distDir + '/img/'))
        .pipe(browserSync.reload({stream:true}));
});

// 导入html模块，并进行首页的请求合并
gulp.task('fileinclude' , function () {
    // var options = {
    //     removeComments: ture,//清除HTML注释
    //     collapseWhitespace: true,//压缩HTML
    //     collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    //     removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    //     removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    //     removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    //     minifyJS: true,//压缩页面JS
    //     minifyCSS: true//压缩页面CSS
    // };
    return gulp.src(paths.html) 
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(plungins.htmlmin(options))
        .pipe(plungins.useref())             //只对html中有规定注释的<!-- build:js ..>起作用
        .pipe(gulpif('*.css' , plungins.minifyCss()))  
        .pipe(gulpif('*.js' , plungins.uglify()))  
        .pipe(gulp.dest(distDir + '/html/'))
        .pipe(browserSync.reload({stream:true}));
});

//复制vendor目录到www/
gulp.task('vendor' , function(){
    return gulp.src(appDir + '/vendor/**/*')
           .pipe(gulp.dest(distDir + '/vendor')); 
})

// 删除生成目录 'www/' 
gulp.task('del' , function(cb) {
    return  del(distDir , cb);
});


// // // // // // // // // // // // // // // // // // 服务器，实时监听自动刷新网页任务// // // // // // // // // // // // // // // // // // // 

// 创建静态服务器
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: [distDir, appDir],
            index: 'html/index.html'
        }
    });
});

// 监听文件改变
gulp.task('watch' , function () {
    gulp.watch(paths.html , ['fileinclude']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']); 
    gulp.watch(paths.img, ['image']); 
});

// // // // // // // // // // // // // // // // // //任务的工作流启动// // // // // // // // // // // // // // // // // // // 

//step1 --build 生产目录 www/
gulp.task('build', function(cb){
    runSequence('del' , 'fileinclude' , ['css' , 'vendor' , 'js' , 'image'] , cb);
});

//step2 --开启服务器，实时监听自动刷新网页
gulp.task('default', function(cb){
    runSequence('server' , 'watch' , cb);
});

