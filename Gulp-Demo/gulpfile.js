const { series, parallel, dest, src, task } = require('gulp');
const changed = require('gulp-changed');
const browserSync = require('browser-sync').create();  // 启动本地服务
const { reload } = browserSync;  // 启动本地服务
// const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const autoprefixer = require('gulp-autoprefixer'); // 自动为css添加浏览器前缀
const less = require('gulp-less');
const template  = require('gulp-art-include');
const watch = require('gulp-watch');

// hash 后缀
const rev = require('gulp-rev'),
revCollector = require('gulp-rev-collector');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const assetRev = require('gulp-asset-rev');

/**
 * Variables
 */
const tempPath = 'dev_dist';
const productionPath = 'production';
const stagingPath = 'staging';
const devPath = 'src';
const port = 8000;
// 需要匹配的文件地址
const paths = {
  serve: {
    baseDir: devPath
  },
  css: devPath + '/css/*.css',
  less: devPath + '/**/*.less',
  html: devPath + '/**/{*.html,!common}',
  js: devPath + '/**/*.js',
  assets: devPath + '/**/*.png',
};

// 环境变量
const env = {
  development: {
    env: 'development'
  },
  staging: {
    env: 'staging'
  },
  production: {
    env: 'production'
  }
}

/**
 * Utils
 */

const handleErrors = function () {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
      title: 'compile error',
      message: '<%=error.message %>'
  }).apply(this, args);//替换为当前对象
  this.emit();//提交
};

//定义特殊文件(图片，字体文件等,会在任务开始前就移入至dist文件夹)
var resource = [ `${devPath}/**/*`, `!${devPath}/**/*.html`, `!${devPath}/**/*.less`,  `!${devPath}/**/*.js` ];
//将除了css,js,html 的资源先移入至目标目录
const moveResourceDev = () => {
    return src(resource)
        .pipe(changed(tempPath))
        .pipe(dest(tempPath));
};

//编译 less
const lessCompilerDev = () => {
  return src(devPath + '/**/*.less')
      .pipe(autoprefixer({
        add: true,
        cascade: true,
        remove: true
      }))
      .pipe(less())
      .on('error', handleErrors)
      .pipe(dest(tempPath));
};

// 合并公共 html
const fileIncludeDev = function () {
  return src(paths.html)
      .pipe(template(
          {
              data: env.development
          }
      ))
      .on('error', handleErrors)
      .pipe(dest(tempPath));
};

/**
 * Tasks
 */

const serve = () => {
  browserSync.init({
    notify: false,
    port,
    index: 'index.html',
    server: { baseDir: `./${tempPath}` }
  })
}

task('serve', () => {
  del.sync(tempPath);
  lessCompilerDev();
  moveResourceDev();
  fileIncludeDev();
  serve();
  watch([ paths.html, paths.css, paths.js, paths.less ], reload);
  watch(paths.less, lessCompilerDev);
  watch(paths.html, fileIncludeDev);
  watch(resource, moveResourceDev);
});


/**
 * Release Start
 */

function releaseWrapper(name, releasePath, envData) {
  const lessCompiler = () => {
    return src(devPath + '/**/*.less')
        .pipe(autoprefixer({
          add: true,
          cascade: true,
          remove: true
        }))
        .pipe(less())
        .pipe(cleanCSS())
        // .pipe(assetRev())
        .pipe(rev())
        .pipe(dest(releasePath))
        .pipe(rev.manifest())
        .pipe(dest('rev/css'));
  };
  
  const moveResource = () => {
    return src(resource)
        .pipe(changed(releasePath))
        .pipe(dest(releasePath));
  };
  
  // 环境变量 && 注入模板引擎
  const fileInclude = function () {
    return src(paths.html)
        .pipe(template(
            {
                data: envData
            }
        ))
        .on('error', handleErrors)
        .pipe(dest(releasePath));
  };
  
  // js压缩 & 加hash值
  const revJs = () => {
    return src(paths.js)
      .pipe(uglify())
      .pipe(rev())
      .pipe(dest(releasePath))
      .pipe(rev.manifest())
      .pipe(dest('rev/js'));
  }
  
  const revAssets = () => {
    return src(paths.assets)
      .pipe(rev())
      .pipe(dest(releasePath))
  }
  
  //Html替换css、js文件版本
  const revHtml = () => {
    return src(['rev/**/*.json', `${releasePath}/**/*.html`])
        // .pipe(assetRev())
        .pipe(revCollector())
        .pipe(dest(releasePath));  
  }
  
  task(name, series((cb) => { del.sync(releasePath); cb(); }, lessCompiler, moveResource, revJs, fileInclude, revHtml));
}


releaseWrapper('release-staging', stagingPath, env.staging);
releaseWrapper('release-production', productionPath, env.production);
