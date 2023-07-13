import Cookies from 'js-cookie';
import { message } from 'antd';

export const CODE_MESSAGES = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户未登录或session失效（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const WY_SUCCESS_CODE = 1001;

export class Request_Error extends Error {
  constructor(message, status?: any, response?: any) {
    super(message);
    this.name = 'WY_Error';
    this.status = status;
    this.response = response;
  }
  response?: any;
  status?: any;
}

const getLocationQuery = () => {
  return (window.location.search
    .split('?')?.[1]
    ?.split('&')
    .reduce((s, i) => {
      const [k, v] = i?.split('=');
      return { ...s, [k]: v };
    }, {}) || {}) as any;
};

// 存储相关
export class Storage {
  static AUTH_KEY = 'Authorization';
  static REDIRECT_URL_KEY = 'redirect_url';
  static saveToken(token, expires = null) {
    Cookies.set(Storage.AUTH_KEY, token, { expires });
  }
  static clearToken() {
    Cookies.remove(Storage.AUTH_KEY);
  }
  static getToken() {
    const t = getLocationQuery().t;
    if (t) {
      Storage.saveToken(t);
      return t || null;
    }
    return Cookies.get(Storage.AUTH_KEY) || null;
  }
  static saveRedirectUrl(url) {
    if (!url) return;
    // const redirect_url = url || Storage.getRedirectUrl() || '';
    sessionStorage.setItem(Storage.REDIRECT_URL_KEY, url);
  }
  static getRedirectUrl() {
    return sessionStorage.getItem(Storage.REDIRECT_URL_KEY);
  }
  static toRedirectUrl() {
    const redirect_url = Storage.getRedirectUrl();
    if (!redirect_url) {
      // 没有返回redirect_url的时候;
      // if (window.location.pathname !== location.pathname) {
      //   window.location.href = '/';
      // }
      return false;
    } else {
      // 跳转redirect_url增加参数t=_token
      let redirect = decodeURIComponent(redirect_url);
      redirect = `${redirect}${redirect.indexOf('?') > -1 ? '&' : '?'}t=${Storage.getToken()}`;
      window.location.href = redirect;
      return true;
    }
  }
}

message.config({
  prefixCls: `${ANT_PREFIX}-message`,
  maxCount: 1,
});
export const toast = (msg: string, type: 'error' | 'success' = 'error') => {
  if (!msg) return;
  message[type](msg);
};
