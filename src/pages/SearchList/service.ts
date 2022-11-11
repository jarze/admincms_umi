import request from '@/utils/request'

export const getList = params => {
  return request(`/searchList`, {
    method: 'GET',
    body: params
  })
}

export const editItem = (params, current) => {
  return request(`/searchList`, {
    method: current?.id ? 'PUT' : 'POST',
    body: { ...params, id: current?.id }
  })
}

export const deleteItem = id => {
  return request(`/searchList`, {
    method: 'DELETE',
    body: { id }
  })
}
