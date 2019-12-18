import request from '@utils/request';

export function getListData(payload) {
	return request('/menu/55', {
		method: 'GET',
		body: payload
	});
}

