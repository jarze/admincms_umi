import { BaseFormProps, BaseFormItemProps } from '@components/comm/Form'
import { BaseTableProps, ColumnProps } from '@components/comm/TableSelect'
export { BaseModalFormProps } from '@components/comm/ModalForm'
export { BaseFormProps } from '@components/comm/Form'
export { BaseTableProps } from '@components/comm/TableSelect'
import RouterTypes from 'umi/routerTypes'
import { DispatchProp } from 'react-redux'
import { Model, EffectsMapObject, Effect, EffectWithType } from 'dva'
import React, { ReactNode } from 'react'
// import { Action, ActionCreator, AnyAction, Dispatch, Store } from 'redux'
// declare interface ListModel {
//   namespace: string
//   currentTime: Date
//   // tick(): any
// }
// export class DigitalClock implements ListModel {
// 	constructor(h: number, m: number) { }
// 	tick() {
// 			console.log("beep beep");
// 	}
// }
// export type ListConfigKeys = 'tableConfig' | 'formConfig'
// interface StringArray {
//   [configKey: ListConfigKeys]: SearchListFormConfig | SearchListTableConfig | SearchListActionConfig;
// }

// config
interface SearchListFormConfig extends BaseFormProps {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
  handleFormValues?: (values: { [k: string]: any }) => null | { [k: string]: any }
  isFetchData?: boolean // 弹窗Edit是否请求ItemInfo
}

interface SearchListTableConfig extends BaseTableProps<any> {
  columns?: (onItemAction: ActionFunction, props: any) => ColumnProps<any>[] | ColumnProps<any>[]
}

// interface SearchListActionConfig {
//   (props: any, onItemAction: ActionFunction): ReactNode
// }

export interface ListPageConfig {
  tableConfig?: SearchListTableConfig
  formConfig?: SearchListFormConfig
  editConfig?: SearchListFormConfig
  actions?: (props: any, onItemAction: ActionFunction) => ReactNode
  otherModels?: string[] // 其他绑定的model
  isPush?: boolean // 添加编辑是否跳转新页面
  NS?: string // 绑定model名，默认list
}

// Model
export interface ListModelState {
  dataSource?: object[]
  filterParams?: {}
  pagination?: {
    current?: any
    pageSize?: any
    [key: string]: any
  }
  selectedRowKeys?: any[]
  menuId?: string
  editId?: null | 'add' | string
  preEditId?: null | string
  itemInfo?: {}
  others?: {}
  [key: string]: any
}

// declare enum ListModelEffect {
//   getListData,
//   getItemInfo,
//   editItem,
//   deleteListItems,
//   actionItems,
//   exportData,
// }

export type ListModelServers = 'getListData' | 'getItemInfo' | 'editItem' | 'deleteListItems' | 'actionItems' | 'exportData'

// export declare enum ListModelFunc {
//   fetchData = 'fetchData',
//   fetchItemInfo = 'fetchItemInfo',
//   editItem = 'editItem',
//   deleteItem = 'deleteItem',
//   actionItem = 'actionItem',
//   exportData = 'exportData',
//   updateMatchParams = 'updateMatchParams',
//   save = 'save',
//   restPageFilter = 'restPageFilter',
// }

// ListModelFunc.actionItem

// export declare type ListModelFuncC = (typeof ListModelFunc)[]

// export interface EffectsMapObject {
//   [key: string]: Effect | EffectWithType,
// }

export type ListEffectsMapObject = {
  [key in ListModelServers]: Effect | EffectWithType
  // getListData: Effect | EffectWithType
}
export interface ListModel extends Model {
  state?: ListModelState
  effects?: ListEffectsMapObject
  // reducers?:
}

// HOOKS
// 搜索列表自定义操作方法Type
export type ActionType = 'detail' | 'add' | 'edit' | 'delete' | 'export' | 'search' | 'refresh' | 'update' | string
export interface ActionFunction {
  (
    type: ActionType,
    payload: {},
    props: {
      breadcrumb?: string | null | undefined // 面包屑
      callback?: Function // 回调函数
      id?: string
    },
  ): void
}

export interface BaseListHooksProps extends ListPageConfig, ListModelState, RouterTypes, DispatchProp {
  loadingEffects?: {}
  otherFilterParams?: {}
}

// export interface ListHooksProps extends BaseListHooksProps {}

// // export interface SearchHooks<T> {
// //   (props: ListHooksProps): [BaseTableProps<T>, BaseFormProps, ActionFunction]
// // }

// export interface ListEditHooksProps extends BaseListHooksProps {}
