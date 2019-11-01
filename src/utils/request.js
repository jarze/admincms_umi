import { fetch } from 'dva';
import { stringify } from 'qs';
import { message } from 'antd';
import { CODE_LOGIN_INVALID, CODE_SUCCESS, CODE_MESSAGES, MSG } from '@config/constant';

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
	error.status = status;
	throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options, errToast) {
	// 携带网站cookie信息，用于登录验证
	// options = { ...options, credentials: 'include' };
	if (options) {
		const { method = 'GET', body } = options;
		if (body) {
			if (method.toUpperCase() === 'POST') {
				options.body = JSON.stringify(body);
				// options.body = convertObjToFormData(body);
			} else {
				url = `${url}?${stringify(body)}`;
				delete options.body;
			}
		}
	}

	return fetch(`${API_PREFIX}${url}`, options)
		.then(checkStatus)
		.then(parseJSON)
		.then(res => checkResponse(res, (options || {}).method))
		.then(data => data)
		.catch(err => {
			// 请求失败处理 返回undefined
			handleError(err, errToast);
		});
}

// 返回数据处理
function checkResponse(response, method) {
	let { code, message } = response;

	if (code === CODE_SUCCESS) {
		if (['DELETE', 'POST'].includes(method) && message) {
			message.success(message);
		}
		return response.data
	};

	const error = new Error(message || CODE_MESSAGES[code]);
	error.response = response;
	error.status = code;
	throw error;
}

function handleError(err, errToast = true) {
	console.log('❌', err);
	errToast && err.message && message.error(err.message);
	// TODO: 登录失效处理
	if (err.status === CODE_LOGIN_INVALID) {
		// TODO： 处理登录失效
		console.log('登录失效=========');
	}
}

/* JSON To FormData */
function convertObjToFormData(object) {
	const data = new FormData();
	for (var key in object) {
		data.append(key, object[key]);
	}
	return data;
}
