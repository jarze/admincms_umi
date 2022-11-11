declare module '*.css'
declare module '*.png'
declare module '*.svg'
declare module '*.less'
declare module '*.js'

declare const API_PREFIX: string
/** 环境 */
declare const API_ENV:
  | 'mock' //mock
  | 'dev' //开发
  | 'test' //测试
  | 'prod' //生产;
