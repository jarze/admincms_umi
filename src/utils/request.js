import fetch from 'dva/fetch';
import { stringify } from 'qs';
import { message } from 'antd';
import { CODE_LOGIN_INVALID, CODE_SUCCESS, CODE_MESSAGES, MSG } from '../config/constant';

function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
	let status = response.status;
	if (status >= 200 && status < 300) {
		return response;
	}
	const error = new Error(CODE_MESSAGES(status) || response.statusText);
	error.response = response;
	throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
	// 携带网站cookie信息，用于登录验证
	// options = { ...options, credentials: 'include' };
	if (options) {
		const { method = "GET", body } = options;
		if (body) {
			if (method.toUpperCase() === 'POST') {
				// options.body = JSON.stringify(body);
				options.body = convertObjToFormData(body);
			} else {
				url = `${url}?${stringify(body)}`;
				delete options.body;
			}
		}
	}

	return fetch(`${API_PREFIX}${url}`, options)
		.then(checkStatus)
		.then(parseJSON)
		.then(checkResponse)
		.then(data => data)
		.catch(err => {
			// 请求失败处理 返回undefined
			err.message && message.error(err.message);
			return;
		});
}

// 返回数据处理
function checkResponse(data) {
	let code = data.code;
	if (code === CODE_SUCCESS) return data.data;
	if (code === CODE_LOGIN_INVALID) {
		// TODO： 处理登录失效
		console.log('登录失效=========');

	}
	const error = new Error(data[MSG] || CODE_MESSAGES[code]);
	error.response = data;
	throw error;
}


function handleError(err) {
	console.log('❌', err);
	err.message && message.error(err.message);
	// return { err };
}

/* JSON To FormData */
function convertObjToFormData(object) {
	const data = new FormData();
	for (var key in object) {
		data.append(key, object[key]);
	}
	return data;
}
