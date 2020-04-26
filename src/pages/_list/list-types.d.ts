import { BaseModalFormProps } from './../../components/comm/ModalForm/index'
import { BaseFormProps, BaseFormItemProps } from '@components/comm/Form'
import { BaseTableProps, ColumnProps } from '@components/comm/TableSelect'
export { BaseModalFormProps } from '@components/comm/ModalForm'
export { BaseFormProps } from '@components/comm/Form'
export { BaseTableProps } from '@components/comm/TableSelect'
import RouterTypes from 'umi/routerTypes'
import { DispatchProp } from 'react-redux'
import { Model, Effect, EffectWithType } from 'dva'
import { ReactNode } from 'react'

// ---------- Logic Config ----------
// 列表搜索项表单配置
export interface SearchListFormConfig extends Omit<BaseFormProps, 'items' | 'onValuesChange'> {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
}
// 列表table配置
export interface SearchListTableConfig extends Omit<BaseTableProps<any>, 'columns'> {
  columns?: (onItemAction: ActionFunction, props: any) => ColumnProps<any>[] | ColumnProps<any>[]
}
// 跳转表单配置
export interface EditFormConfig extends Omit<BaseFormProps, 'items' | 'onValuesChange'> {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
  handleFormValues?: (values: { [k: string]: any }) => null | { [k: string]: any }
}
// 弹窗表单配置
export interface EditModalFormConfig extends Omit<BaseModalFormProps, 'items' | 'onValuesChange'> {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
  isFetchData?: boolean // 弹窗Edit是否请求ItemInfo
}

// 列表通用配置
export interface ListPageConfig {
  tableConfig?: SearchListTableConfig // 列表配置
  formConfig?: SearchListFormConfig // 列表搜索项配置
  editConfig?: EditModalFormConfig | EditFormConfig // 弹窗或新页面，取决于isPush
  actions?: (props: any, onItemAction: ActionFunction) => ReactNode // 其他操作区域配置
  isPush?: boolean // 添加编辑是否跳转新页面或弹窗
  NS?: string // 绑定model名，默认list，绑定的Model必须是ListModel
  otherModels?: string[] // 其他绑定的model，可以在配置是从参数里获取到其他model的sto
}

// ---------- Model ----------
// list model state
export interface ListModelState {
  dataSource?: object[] // 列表数据
  filterParams?: {} // 搜索条件
  pagination?: {
    // 分页数据
    current?: any
    pageSize?: any
    [key: string]: any
  }
  selectedRowKeys?: any[] // 列表选择
  menuId?: string // 列表唯一标记key
  editId?: null | 'add' | string // 当前编辑
  preEditId?: null | string
  itemInfo?: {} // 当前编辑数据
  others?: {} // 其他数据， 列表请求返回的而外数据会存在other里面
  [key: string]: any
}

// list service 请求方法名
export type ListModelServers = 'getListData' | 'getItemInfo' | 'editItem' | 'deleteListItems' | 'actionItems' | 'exportData'
// list model effects 方法名
export type ListModelServersEffects = 'fetchData' | 'fetchItemInfo' | 'editItem' | 'deleteItem' | 'actionItem' | 'exportData' | 'updateMatchParams'
// list model reducers 方法名
export type ListModelServersReducers = 'save' | 'restPageFilter'
// list model
export interface ListModel extends Model {
  state?: ListModelState
  effects?: {
    [key in ListModelServersEffects | string]: Effect | EffectWithType
  }
  // reducers?:
}

// ---------- HOOKS ----------
// 搜索列表自定义操作方法Type
export type ActionType = 'detail' | 'add' | 'edit' | 'delete' | 'export' | 'search' | 'refresh' | 'update'
export interface ActionFunction {
  (
    type: ActionType | string,
    payload?: {},
    props?: {
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
