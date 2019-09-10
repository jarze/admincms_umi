import request from '@utils/request';

export function getListData(params) {
	return request('/list/2', {
		method: 'GET',
		body: params
	});
}
