/*
 * @Autor: jarze
 * @Date: 2019-08-29 10:00:23
 * @Desc: Do not edit
 */
import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
	treeShaking: true,
	plugins: [
		//  // npm 依赖
		//  'umi-plugin-react',
		//  // 相对路径
		//  './plugin',
		//  // 绝对路径
		//  `${__dirname}/plugin.js`,

		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
			antd: true,
			dva: true,
			dynamicImport: { webpackChunkName: true },
			title: 'AdminCms_umi',
			dll: true,
			locale: {
				enable: true,
				default: 'zh-CN',
			},

			// 路由
			routes: {
				exclude: [
					/models\//,
					/services\//,
					/model\.(t|j)sx?$/,
					/service\.(t|j)sx?$/,
					/components\//,
				],
			},
		}],
	],


	// 路由 优先使用配置式路由，且约定式路由会不生效
	// routes: [],
	// 禁用 redirect 上提
	disableRedirectHoist: true,
	// 指定 history 类型，可选 browser、hash 和 memory; 默认browser。
	history: 'browser',
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
		ie: 11,
	},
	// 	context
	// 类型：Object
	// 默认值：{}
	// 配置全局 context，会覆盖到每个 pages 里的 context。

}

export default config;
