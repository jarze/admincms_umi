import theme from './theme'
import routes from './routes.js'

import { ENV_MOCK, ENV_DEV, ENV_TEST, ENV_PRO, API_PROXY_TARGET } from './constant'
const resolve = require('path').resolve

// 当前环境相关配置  dev | test | pro
const env = process.env.API_ENV
const API_PROXY = '/api'
const api_proxy_target = API_PROXY_TARGET[env]
// 是否代理访问 测试
const isProxy = env !== ENV_TEST

//gh-pages test配置二级目录
const env_test_params = env === ENV_TEST && {
  base: '/admincms_umi/',
  publicPath: '/admincms_umi/'
  // history: 'hash',
}

export default {
  ...env_test_params,
  treeShaking: true,
  hash: true,
  plugins: [
    //  // npm 依赖
    //  'umi-plugin-react',
    //  // 相对路径
    //  './plugin',
    //  // 绝对路径
    //  `${__dirname}/plugin.js`,

    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading/index'
        },
        title: 'AdminCms_umi',
        // dll: true,
        locale: {
          enable: true,
          default: 'zh-CN'
        },

        // 路由
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//
          ]
        }
      }
    ]
  ],

  // 路由 优先使用配置式路由，且约定式路由会不生效
  routes,
  // 禁用 redirect 上提
  // disableRedirectHoist: true,
  // 指定 history 类型，可选 browser、hash 和 memory; 默认browser。
  // history: 'browser',
  // outputPath
  // 类型：String
  // 默认值：./dist
  // 指定输出路径。

  // # base
  // 类型：String
  // 默认值：/
  // 指定 react-router 的 base，部署到非根目录时需要配置。

  // # publicPath
  // 类型：String
  // 默认值：/
  // 指定 webpack 的 publicPath，指向静态资源文件所在的路径。

  // 配置浏览器最低版本，会自动引入 polyfill 和做语法转换，配置的 targets 会和合并到默认值，所以不需要重复配置。
  // Default: { chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 }
  targets: {
    ie: 11
  },
  // 	context
  // 类型：Object
  // 默认值：{}
  // 配置全局 context，会覆盖到每个 pages 里的 context。
  mock: {
    exclude: env === ENV_MOCK ? [] : ['mock/*']
  },
  // 配置主题
  theme: theme,

  define: {
    API_ENV: env,
    API_PROXY,
    API_PREFIX: !isProxy ? api_proxy_target : API_PROXY,
    API_ENV_MOCK: ENV_MOCK,
    API_ENV_DEV: ENV_DEV,
    API_ENV_TEST: ENV_TEST,
    API_ENV_PRO: ENV_PRO
  },

  // 配置 react 和 react-dom 不打入代码
  // "externals": {
  //   "react": "window.React",
  //   "react-dom": "window.ReactDOM"
  // }
  alias: {
    '@': resolve(__dirname, '../src/')
  },

  proxy: {
    [API_PROXY]: {
      target: api_proxy_target,
      changeOrigin: true,
      pathRewrite: { [`^${API_PROXY}`]: '' }
    }
  },
  block: {
    closeFastGithub: true
    // defaultGitUrl: 'https://github.com/jarze/umi-blocks.git',
    // defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  }
}
