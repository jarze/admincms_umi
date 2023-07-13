import 'axios';
declare module 'axios' {
  export interface AxiosInstance {
    /** 将返回token的请求 */
    tokenRequest: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
    /** 将清除token的请求 */
    clearTokenRequest: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
    /** 保存token*/
    saveToken: (res: any) => any;
    clearToken: any;
    /** 校验当前登录状态 */
    checkLogin: () => boolean;
  }
}

// declare global {
//   export interface Window {
//     /** 登录 */
//     wy_login: () => void;
//     /** 登出 */
//     wy_logout: () => void;
//   }
// }
