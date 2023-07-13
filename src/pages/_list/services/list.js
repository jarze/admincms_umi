import request, { exportDownload } from '@/utils/request'
// Example 通用列表请求
export function getListData(payload) {
  return request('/list/1', { method: 'GET', params: payload })
}

export function getItemInfo(payload, routeParams) {
  const id = routeParams.id || payload.id || '1'
  return request(`/page/${id}`, { method: 'GET', params: payload })
}

export function editItem(payload, routeParams, editId) {
  const id = routeParams.id || editId
  // 添加编辑判断
  return request(`/edit/${id}`, { method: id && id !== 'add' ? 'PUT' : 'POST', data: payload })
}

export function deleteListItems(payload) {
  return request('/delete/1', { method: 'DELETE', data: payload })
}

export function actionItems(payload, routeParams, action) {
  return request(`/action/${routeParams.id}/${action}`, { method: 'POST', data: payload })
}

export function exportData(payload) {
  return exportDownload('/export', payload)
}
