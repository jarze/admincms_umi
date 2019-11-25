import request from '@utils/request';

export function getListData(payload) {
	return request('/list/2', {
		method: 'GET',
		body: payload
	});
}

