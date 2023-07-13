import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Storage, CODE_MESSAGES, WY_SUCCESS_CODE, Request_Error, toast } from './constant';

const instance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  baseURL: API_PREFIX,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
});

// 初始化设置
instance.defaults.headers.common['Authorization'] = Storage.getToken();

instance.saveToken = function (res) {
  console.log('saveToken------', res);
  const { token } = res.data || {};
  Storage.saveToken(token);
  this.defaults.headers.common['Authorization'] = token;
};

instance.clearToken = function () {
  console.log('clearToken------');
  Storage.clearToken();
  this.defaults.headers.common['Authorization'] = null;
};

instance.checkLogin = function () {
  return !!this.defaults.headers.common['Authorization'];
};

instance.tokenRequest = function (url: string, config: AxiosRequestConfig) {
  config.url = url;
  return instance.request(config).then((res) => {
    this.saveToken(res);
    return res;
  });
};

instance.clearTokenRequest = function (url: string, config: AxiosRequestConfig) {
  config.url = url;
  return instance.request(config).then((res) => {
    this.clearToken();
    return res;
  });
};

instance.interceptors.response.use(
  function (response) {
    const { data = {}, request } = response;
    const { code, message } = data;
    if (code && code !== WY_SUCCESS_CODE) {
      var error = new Request_Error(message, code, response);
      throw error;
    }
    return (request.responseType || 'json') !== 'json' ? response : data;
  },
  function (error) {
    const { response } = error;
    if (response && response.status === 401) {
      const error = new Request_Error(
        response?.data?.message || CODE_MESSAGES[response.status] || response.statusText,
        response.status,
        response,
      );
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { message } = error;
    if (error.status === 401) {
      instance.clearToken();
      //TODO: 跳转登录
    } else if (message) {
      //TODO: 业务错误处理
      toast(message);
    }
    return Promise.reject(error);
  },
);

export default instance;
