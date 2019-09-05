import request from '@utils/request';

export function getListData(params) {
	return request('/list/1', {
		method: 'GET',
		body: params
	});
}
