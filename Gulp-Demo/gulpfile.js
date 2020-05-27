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
const htmlmin = require('gulp-htmlmin');
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
  js: devPath + '/js/*.js',
  assets: devPath + '/assets/**/*.{png,jpg,gif,mp4}',
};

// 环境变量
const env = {
  development: require(`./config/development.json`),
  staging: require(`./config/staging.json`),
  production:  require(`./config/production.json`),
}

const Vinyl = require('vinyl');
const stringSrc = (filename, string) => {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new Vinyl({ cwd: "", base: null, path: filename, contents: new Buffer(string) }));
    this.push(null);
  }
  return src;
}

function getEnvTask(envName, releasePath) {
  if(!envName) return function() {
    let myConfig = env.development;
    var result = `window.$env = ${JSON.stringify(myConfig)}`;
    return stringSrc("env.js", result)
      .pipe(dest(`${releasePath}/js`))
  }
  return function() {
    let myConfig = env[envName];
    var result = `window.$env = ${JSON.stringify(myConfig)}`;
    return stringSrc("env.js", result)
      .pipe(dest(`${releasePath}/js`))
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
const resourceDev = [ `${devPath}/**/*`, `!${devPath}/**/*.html`, `!${devPath}/**/*.less` ];
//将除了css,js,html 的资源先移入至目标目录
const moveResourceDev = () => {
    return src(resourceDev)
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
  getEnvTask(null, tempPath)();
  serve();
  watch([ paths.html, paths.css, paths.js, paths.less ], reload);
  watch(paths.less, lessCompilerDev);
  watch(paths.html, fileIncludeDev);
  watch(resourceDev, moveResourceDev);
});


/**
 * Release Start
 */
const resource = [ `${devPath}/**/*`, `!${devPath}/**/*.html`, `!${devPath}/**/*.less`,  `!${paths.js}`, `!${paths.assets}` ];

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
      .pipe(dest(`${releasePath}/js`))
      .pipe(rev.manifest())
      .pipe(dest('rev/js'));
  }
  
  const revAssets = () => {
    return src(paths.assets)
      .pipe(rev())
      .pipe(dest(`${releasePath}/assets`))
      .pipe(rev.manifest())
      .pipe(dest('rev/img'));
  }
  
  //Html替换css、js文件版本
  const revHtml = () => {
    return src(['rev/**/*.json', `${releasePath}/**/*.html`])
        .pipe(revCollector())
        .pipe(dest(releasePath));  
  }

  const revCss = () => {
    return src(['rev/**/*.json', `${releasePath}/**/*.css`])
        .pipe(revCollector())
        .pipe(dest(releasePath));  
  }
  
  const htmlMini = () => {
    return src(`${releasePath}/**/*.html`)
    .pipe(htmlmin({ 
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(dest(releasePath));
  }

  let envName = name.split('-')[1];
  let envTask = getEnvTask(envName, devPath);
  task(name, series((cb) => { del.sync(releasePath); cb(); }, lessCompiler, moveResource, envTask, revJs, revAssets, fileInclude, revHtml, revCss, htmlMini));
}


releaseWrapper('release-staging', stagingPath, env.staging);
releaseWrapper('release-production', productionPath, env.production);
