import request from '@utils/request';

export function getListData(payload) {
	const { matchParams, ...params } = payload;

	console.log('list请求路由参数:', matchParams);
	return request('/list/1', {
		method: 'GET',
		body: params
	});
}
