import request, { exportDownload } from '@/utils/request'
// Example 通用列表请求
export function getListData(payload) {
  return request('/list/1', {
    method: 'GET',
    body: payload,
  })
}

export function getItemInfo(payload, routeParams) {
  const id = routeParams.id || payload.id
  return request(`/page/${id}`, {
    method: 'GET',
    body: payload,
  })
}

export function editItem(payload, routeParams, editId) {
  const id = routeParams.id || editId
  return request(`/edit/${id}`, {
    method: id && id !== 'add' ? 'PUT' : 'POST', // 添加编辑判断
    body: payload,
  })
}

export function deleteListItems(payload) {
  return request('/delete/1', {
    method: 'DELETE',
    body: payload,
  })
}

export function actionItems(payload, routeParams, action) {
  return request(`/action/${routeParams.id}/${action}`, {
    method: 'POST',
    body: payload,
  })
}

export function exportData(payload) {
  return exportDownload('/export', payload)
}
