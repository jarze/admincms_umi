import request, { exportDownload } from '@utils/request';

export function getListData(payload) {
	return request('/list/1', {
		method: 'GET',
		body: payload
	});
}

export function getItemInfo(payload, routeParams) {
	return request(`/page/${routeParams.id}`, {
		method: 'GET',
		body: payload
	});
}

export function editItem(payload, routeParams, editId) {
	return request(`/edit/${routeParams.id}`, {
		method: routeParams.id ? 'PUT' : 'POST',
		body: payload
	});
}

export function deleteListItems(payload) {
	return request('/delete/1', {
		method: 'DELETE',
		body: payload
	});
}

export function actionItems(payload, routeParams, action) {
	return request(`/action/${routeParams.id}/${action}`, {
		method: 'POST',
		body: payload
	});
}

export function exportData(payload) {
	return exportDownload('/export', payload);
}
