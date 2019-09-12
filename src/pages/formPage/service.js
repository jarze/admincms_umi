import request from '@utils/request';

export function getPageData(payload) {
	const { matchParams, ...params } = payload;

	console.log('page请求路由参数:', matchParams);
	return request(`/page/${matchParams.modelId}/${matchParams.id}`, {
		method: 'GET',
		body: params
	});
}

