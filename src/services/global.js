import request from '@/utils/request'

export async function fetchMenu() {
  return request(`/menu`)
}

export async function fetchUserInfo() {
  return request(`/userInfo`)
}

// 修改密码
export async function modifyPassword(params) {
  return request(`/users/password`, {
    isFullReturn: true,
    method: 'PUT',
    body: params,
  })
}

// 获取当前用户权限
export async function fetchPrivileges() {
  return request('/users/privileges')
}
