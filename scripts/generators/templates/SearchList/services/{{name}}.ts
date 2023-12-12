import request, { exportDownload } from '@/utils/request'
import { ListRequest } from '@/pages/_list/list-types'

// Example 通用列表请求
export function getListData(payload): ListRequest {
  return request('/list/1', { method: 'GET', body: payload })
}

export function getItemInfo(payload, routeParams): ListRequest {
  const id = routeParams.id || payload.id
  return request(`/page/${id}`, { method: 'GET', body: payload })
}

export function editItem(payload, routeParams, editId): ListRequest {
  const id = routeParams.id || editId
  // 添加编辑判断
  return request(`/edit/${id}`, { method: id && id !== 'add' ? 'PUT' : 'POST', body: payload })
}

export function deleteListItems(payload): ListRequest {
  return request('/delete/1', { method: 'DELETE', body: payload })
}

export function actionItems(payload, routeParams, action): ListRequest {
  return request(`/action/${routeParams.id}/${action}`, { method: 'POST', body: payload })
}

export function exportData(payload): ListRequest {
  return exportDownload('/export', payload)
}
