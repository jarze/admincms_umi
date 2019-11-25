// export * from '@/pages/_services/list.js';
import { notification } from 'antd';

// webpack require.context
const files = require.context('@/pages/_list/services', false, /\.js$/)
const models = {}
files.keys().forEach(key => {
	const filename = key.replace(/(\.\/|\.js)/g, '')
	models[filename] = { ...files(key) }
})

/**
 * @description: request请求函数
 * @param {string} type 请求函数类型；ex:'getListData'|'getItemInfo'|'editItem'|...
 * @param {object}  payload 请求参数
 * @param {string} action 其他请求actionItems参数
 * @return: 返回对应模块对应请求方式
 */
export default (type, payload, action) => {
	const { matchParams, ...params } = payload;
	// TODO: test
	devAlert('请求路由参数:', matchParams, params);

	const { menuId } = matchParams;
	// 如果没有定义menu services; 使用list公用请求
	const service = (models[menuId] || {})[type] || models.list[type];
	// {请求参数， 路由参数， 其他请求actionItems参数}
	return service && service(params, matchParams, action);
}

export const combineServices = (services) => (type, payload, action) => {
	const { matchParams, ...params } = payload;
	const service = services[type];
	return service && service(params, matchParams, action);
}

const devAlert = (title, matchParams, params) => {
	notification.info({
		message: `${title}\n${JSON.stringify(matchParams)}`,
		description: `${JSON.stringify(params)}`,
	});
}