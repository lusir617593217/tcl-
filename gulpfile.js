// 导入 gulp 模块
const gulp = require('gulp');

// 导入 gulp-cssmin 模块，压缩 css 文件
const cssmin = require('gulp-cssmin');

// 导入 gulp-autoprefixer 模块   用于 css 自动在浏览器 前缀
const autoprefixer = require('gulp-autoprefixer');

// 导入 gulp-sass 模块， 用于 将 .scss 文件编译成 css 文件
const sass = require('gulp-sass');    // 如果是用 sass 写的 css 文件就需要这个模块来转化 

// 导入 gulp-uglify  用来压缩 js 文件
const uglify = require('gulp-uglify');

// 导入 gulp-babel  用来 转换 es6 语法, 这个包导入后，会自动导入 @babel/core 和 @babel/preset-env 这两个包
const babel = require('gulp-babel');

// 导入 gulp-htmlmin  用来压缩 html 文件, 这个包需要配置参数
const htmlmin = require('gulp-htmlmin')

// 导入 del 模块  用来删除 目录
const del = require('del')

// 导入 gulp-webserver 模块  用来开启一个服务
const webserver = require('gulp-webserver')

// 压缩 css 文件
var cssHandler = function(){
  return gulp.src('./src/css/*.css')   // 找到 src 目录下所有的 css 文件
      .pipe(autoprefixer())   // css 代码加前缀兼容不同版本浏览器，参数可以写在 package.json 里面
      .pipe(cssmin())    // 压缩 css 代码
      .pipe(gulp.dest('./dist/css'))
}

// 压缩 sass 文件
var sassHandler = function(){
  return gulp.src('./src/sass/*.scss')   // 找到 src 目录下所有的 css 文件
      .pipe(sass())
      .pipe(autoprefixer())   // css 代码加前缀兼容不同版本浏览器，参数可以写在 package.json 里面
      .pipe(cssmin())    // 压缩 css 代码
      .pipe(gulp.dest('./dist/sass'))
}

// 压缩 js 文件
var jsHandler = function(){
  return gulp.src('./src/js/*.js')  // 找到所有 js 文件
             .pipe(babel({          // 转换 es6 语法 ，需要配置参数
              presets: ['@babel/env']
             }))
             .pipe(uglify())    // 压缩 js 代码
             .pipe(gulp.dest('./dist/js'))  // 将压缩好的代码放入 ./dist/js 这个目录下
}

// 压缩 html 文件
var htmlHandler = function(){
  return gulp.src('./src/pages/*.html')
             .pipe(htmlmin({  // 这个模块 需要配置参数才可以对 html 文件进行压缩
               removeAttributeQuotes: true,  // 移除属性上面的双引号
               removeComments: true,   // 移除注释
               collapseBooleanAttributes: true,  // 简写属性值为布尔的
               collapseWhitespace: true, // 移除所有空格
               minifyCSS: true,  // 压缩 页面里面 style 标签里的 css 样式
               minifyJS: true  // 压缩页面里面 script 标签里的 js 代码
             }))
             .pipe(gulp.dest('./dist/pages'))
}

// 移动 images 里面的图片
var imgHandler = function(){
  return gulp.src('./src/images/**')
             .pipe(gulp.dest('./dist/images'))
}

// 移动 lib 文件
var libHandler = function(){
  return gulp.src('./src/lib/**')
             .pipe(gulp.dest('./dist/lib'))
}

// 删除目录
var delHandler = function(){
  return del(['./dist'])
}

// 开启一个服务
var serverHandler = function(){
  return gulp.src('./dist')   // 进入 dist 目录
             .pipe(webserver({
               host: "localhost",
               port: 3000,   // 端口号
              //  open: "./html/index.html",  // 默认的打开页
               livereload: true,  // 自动刷新页面
               proxies: [  // 可以配置代理服务器
                
               ]
             }))
} 

// 自动监控文件
var watchHandler = function(){
  // gulp.watch('./src/css/*.css',cssHandler)
  gulp.watch('./src/js/*.js',jsHandler)
  gulp.watch('./src/pages/*.html',htmlHandler)
  gulp.watch('./src/images/**',imgHandler)
  gulp.watch('./src/lib/**',libHandler)
  gulp.watch('./src/sass/*.scss',sassHandler)
}

// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.img = imgHandler
// module.exports.lib = libHandler

module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(sassHandler,jsHandler,htmlHandler,imgHandler,libHandler),
  serverHandler,
  watchHandler
)