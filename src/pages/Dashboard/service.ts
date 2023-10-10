import { message, notification } from 'antd'
import request from '@/utils/request'
import { ScreenComponentsTypes } from './_config'

export const fetchComponentData = ({ component, id }, url = '/big-screen/data') => {
  const key = `${component}-${id}`
  return request(url, {
    params: { component, id }
  }).catch(m => {
    message.destroy()
    notification.error({
      key,
      message: `${ScreenComponentsTypes.find(i => i.value === component)?.label || ''}配置错误`,
      description: m,
      placement: 'topLeft'
    })
  })
}

export const fetchDetail = id => {
  return request(`/big-screen/page/detail/${id}`)
}

export const fetchUpdateData = data => {
  return request(`/big-screen/page`, { data, method: 'PUT' })
}
