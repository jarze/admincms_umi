import request from '@/utils/request'
import { notification } from 'antd'

export const getDict = () => {
  return request('/big-screen/source/dict')
}

export const getTreeData = queryType => {
  return request(`/big-screen/source/${queryType}/tree`)
}

export const getDataPoints = queryParams => {
  let str = ''
  queryParams?.forEach(item => (str += `id=${item}&`))
  return request(`/big-screen/source/data-points?${str}`)
}

export const getConfig = id => {
  return request(`/big-screen/source/config/${id}`)
}

const putConfig = (id, data) => {
  return request(`/big-screen/source/config/${id}`, {
    method: 'PUT',
    data
  }).then((resp: any) => {
    if (resp.code === 1002) {
      notification.error({
        message: `出现错误`,
        description: resp.message
      })
      return
    }
    return resp.data
  })
}

export const postConfig = (params, sourceId?) => {
  const data = { dataSourceType: 'API', ...params }
  if (sourceId) return putConfig(sourceId, data)
  return request(`/big-screen/source/config`, {
    method: 'POST',
    data
  }).then((resp: any) => {
    if (resp.code === 1002) {
      notification.error({
        message: `出现错误`,
        description: resp.message
      })
      return
    }
    return resp.data
  })
}
