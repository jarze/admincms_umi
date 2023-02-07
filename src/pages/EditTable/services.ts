import request from '@/utils/request'
// Example 通用列表请求
export function getListData(payload) {
  return request('/list/editTable', { method: 'GET', body: payload || {} })
}

export function getItemInfo(payload, routeParams) {
  const id = routeParams?.id || payload?.id || '1'
  return request(`/page/${id}`, { method: 'GET', body: payload })
}

export function editItem(payload, routeParams, editId) {
  const id = routeParams?.id || editId || payload?.id
  // 添加编辑判断
  return request(`/edit/${id}`, { method: id && id !== 'add' ? 'PUT' : 'POST', body: payload })
}

export function deleteItem(payload) {
  return request('/delete/1', { method: 'DELETE', body: payload })
}

export function saveItem(payload, routeParams, action) {
  return request(`/action/${routeParams?.id || 'all'}/${action}`, { method: 'POST', body: payload })
}
