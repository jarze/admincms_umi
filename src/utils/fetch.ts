// import fetch from 'isomorphic-fetch';
import { stringify } from 'qs';
import { CODE_MESSAGES, WY_SUCCESS_CODE, Request_Error, Storage, toast } from './constant';

interface RequestOption {
  method?: string;
  data?: ArrayBuffer | FormData | object;
  /** query */
  params?: object;
  headers?: Record<string, string>;
}

class Request {
  _token?: string | null;
  constructor() {
    this._token = Storage.getToken();
    this.checkStatus = this.checkStatus.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }
  saveToken(res) {
    console.log('saveToken------', res);
    const { token } = res.data || {};
    Storage.saveToken(token);
    this._token = token;
  }
  clearToken() {
    console.log('clearToken------');
    Storage.clearToken();
    this._token = null;
  }
  checkLogin() {
    return !!this._token;
  }
  checkStatus(response) {
    let status = response.status || response.statusCode;
    if (status >= 200 && status < 300) return response;
    const error = new Request_Error(
      response?.data?.message || CODE_MESSAGES[status] || response.statusText,
      status,
      response,
    );
    throw error;
  }
  tokenRequest(url: string, options: any = {}) {
    return this.fetch(url, options).then(res => {
      this.saveToken(res);
      return res;
    });
  }
  clearTokenRequest(url: string, options: any = {}) {
    return this.fetch(url, options).then(res => {
      this.clearToken();
      return res;
    });
  }
  get(url: string, options: RequestOption = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }
  delete(url: string, options: RequestOption = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
  post(url: string, data?: any, options?: RequestOption) {
    return this.fetch(url, { ...options, data, method: 'POST' });
  }
  put(url: string, data?: any, options?: RequestOption) {
    return this.fetch(url, { ...options, data, method: 'PUT' });
  }
  patch(url: string, data?: any, options?: RequestOption) {
    return this.fetch(url, { ...options, data, method: 'PATCH' });
  }
  fetch(url: string, options: any = {}) {
    const d = options.params;
    const search = d ? `?${stringify(d)}` : '';
    url = `${API_PREFIX}${url}${search}`;

    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      credentials: 'include',
      ...options.headers,
    };
    if (this._token) {
      options.headers['Authorization'] = this._token;
    }
    if (
      options.data &&
      !(options.data instanceof FormData || options.data instanceof ArrayBuffer)
    ) {
      options.body = JSON.stringify(options.data);
    } else {
      options.body = options.data;
    }
    return fetch(url, options)
      .then(this.checkStatus)
      .then(response => {
        if (options.type === 'arraybuffer') return response;
        if (response.status === 204) {
          return response.text();
        }
        return response.json();
      })
      .then(response => {
        const { code, message } = response;
        if (code && code !== WY_SUCCESS_CODE) {
          const error = new Request_Error(message, code, response);
          throw error;
        }
        return response;
      })
      .catch(error => {
        const { message } = error;
        if (error.status === 401) {
          this.clearToken();
          //TODO: 跳转登录
        } else if (message) {
          //TODO: 业务错误处理
          toast(message);
        }
        throw error;
      });
  }
}

const request = new Request();

export default request;
