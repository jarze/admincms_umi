import request from '@utils/request';

export function getListData(payload) {
	const { matchParams, ...params } = payload;
	console.log('list请求路由参数:', matchParams, payload);

	return request('/list/1', {
		method: 'GET',
		body: params
	});
}

export function getItemInfo(payload) {
	const { matchParams, ...params } = payload;
	console.log('page请求路由参数:', matchParams);
	return request(`/page/${matchParams.modelId}/${matchParams.id}`, {
		method: 'GET',
		body: params
	});
}

export function editItem(payload) {
	const { matchParams, ...params } = payload;
	console.log('edit请求路由参数:', matchParams);
	return request('/edit/1', {
		method: 'POST',
		body: params
	});
}


export function deleteListItems(payload) {
	const { matchParams, ...params } = payload;
	console.log('delete请求路由参数:', matchParams);
	return request('/delete/1', {
		method: 'DELETE',
		body: params
	});
}
