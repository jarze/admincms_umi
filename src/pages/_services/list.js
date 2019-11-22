import request from '@utils/request';
import { notification } from 'antd';


export function getListData(payload) {
	const { matchParams, ...params } = payload;
	devAlert('list请求路由参数:', matchParams, params);
	return request('/list/1', {
		method: 'GET',
		body: params
	});
}

export function getItemInfo(payload) {
	const { matchParams, ...params } = payload;
	devAlert('page请求路由参数:', matchParams, params);
	return request(`/page/${matchParams.modelId}/${matchParams.id}`, {
		method: 'GET',
		body: params
	});
}

export function editItem(payload) {
	const { matchParams, ...params } = payload;
	devAlert('edit请求路由参数:', matchParams, params);
	return request('/edit/1', {
		method: 'POST',
		body: params
	});
}

export function deleteListItems(payload) {
	const { matchParams, ...params } = payload;
	devAlert('delete请求路由参数:', matchParams, params);
	return request('/delete/1', {
		method: 'DELETE',
		body: params
	});
}

export function actionItems(payload, action) {
	const { matchParams, ...params } = payload;
	devAlert(`${action}请求路由参数:`, matchParams, params);
	return request('/action/1', {
		method: 'POST',
		body: params
	});
}

export function exportData(payload) {
  const { matchParams = {}, ...params } = payload;
  devAlert(`请求路由参数:`, matchParams, params);
  const { menuId } = matchParams;
  let url;
  let body;
  switch (menuId) {
    default:
      break;
  }
  return (
    url &&
    request(`${url}`, {
      method: 'POST',
      body: body || params,
      responseType: 'arraybuffer',
    })
      .then(res => {
        return true;
      })
      .catch(err => console.log(err))
  );
}


const devAlert = (title, matchParams, params) => {
	notification.info({
		message: `${title}\n${JSON.stringify(matchParams)}`,
		description: `${JSON.stringify(params)}`,
	});
}