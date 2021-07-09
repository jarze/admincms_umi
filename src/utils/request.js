import { fetch } from 'dva'
import { stringify } from 'qs'
import { message } from 'antd'
import { CODE_LOGIN_INVALID, CODE_SUCCESS, CODE_MESSAGES } from '@/config/constant'

const File_Buffer = 'arrayBuffer'
// function parseJSON(response) {
// 	return response.json();
// }

function checkStatus(response) {
  let status = response.status || response.statusCode;
  if (status >= 200 && status < 300) {
    return response
  }
  const error = new Error(CODE_MESSAGES(status) || response.statusText)
  error.response = response
  error.status = status
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}, errToast = false) {
  // 携带网站cookie信息，用于登录验证
  // options = { ...options, credentials: 'include' };
  if (options) {
    const { method = 'GET', body } = options
    if (body) {
      if (method.toUpperCase() === 'GET') {
        url = `${url}?${stringify(body)}`
        delete options.body
      } else {
        options.body = JSON.stringify(body)
        // options.body = convertObjToFormData(body);
      }
    }
  }

  return fetch(`${API_PREFIX}${url}`, options)
    .then(checkStatus)
    .then(response => {
      if (options && options.type === File_Buffer) return response
      if (response.status === 204) {
        return response.text()
      }
      return response.json()
    })
    .then(res => checkResponse(res, (options || {}).method), options.type)
    .then(data => data)
    .catch(err => {
      // 请求失败处理 返回undefined
      handleError(err, errToast)
    })
}

// 返回数据处理
function checkResponse(response, method, type) {
  if (typeof response !== 'object' || type === File_Buffer) return response
  let { code, message: msg, data } = response
  if (code === CODE_SUCCESS) {
    if (['DELETE', 'POST'].includes(method) && msg) {
      message.success(msg)
    }
    return data
  }

  const error = new Error(msg || CODE_MESSAGES[code])
  error.response = response
  error.status = code
  throw error
}

function handleError(err, errToast = true) {
  console.log('❌', err)
  errToast && err.message && message.error(err.message)
  // TODO: 登录失效处理
  if (err.status === CODE_LOGIN_INVALID) {
    // TODO： 处理登录失效
    console.log('登录失效=========')
  }
}

/* JSON To FormData */
export function convertObjToFormData(object) {
  const data = new FormData()
  for (var key in object) {
    data.append(key, object[key])
  }
  return data
}

// 导出下载
export const exportDownload = (url, payload) => {
  return request(`${url}`, {
    method: 'GET',
    body: payload,
    type: File_Buffer
  })
    .then(download)
    .catch(e => handleError(e))
}

export const formatDownloadRequest = (url, params) => {
  return params ? `${API_PREFIX}${url}?${stringify(params)}` : `${API_PREFIX}${url}`
}

/**
 * @export
 * @param {*} response 注意不要传入url，将request.js 返回的 response直接传入。
 */
export async function download(response) {
  if (!response.headers) {
    throw new Error('文件有误！！')
  }
  const fileName = response.headers.get('content-disposition') && response.headers.get('content-disposition').match(/filename=(.*)/)[1]
  const res = await response.blob()
  downloadFile(res, fileName)
}

export function downloadFile(data, filename) {
  var blob = new Blob([data])
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, decodeURI(filename))
  } else {
    var blobURL = window.URL.createObjectURL(blob)
    var tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(filename))
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }
}
