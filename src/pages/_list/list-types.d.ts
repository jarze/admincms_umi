import { BaseModalFormProps } from './../../components/comm/ModalForm/index'
import { BaseFormProps, BaseFormItemProps } from '@/components/comm/Form'
import { BaseTableProps, ColumnProps } from '@/components/comm/TableSelect'
import { BasePageProps, PageItemProps } from '@/components/comm/SinglePage'
export { BaseModalFormProps } from '@/components/comm/ModalForm'
export { BaseFormProps } from '@/components/comm/Form'
export { BaseTableProps } from '@/components/comm/TableSelect'
import RouterTypes from 'umi/routerTypes'
import { DispatchProp } from 'react-redux'
import { Model, Effect, EffectWithType } from 'dva'
import { ReactNode } from 'react'

// ---------- Logic Config ----------
/** 列表搜索项表单配置 */
export interface SearchListFormConfig extends Omit<BaseFormProps, 'items' | 'onValuesChange'> {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
}
/** 列表table配置 */
export interface SearchListTableConfig extends Omit<BaseTableProps<any>, 'columns'> {
  columns?: ((onItemAction: ActionFunction, props: any) => ColumnProps<any>[]) | ColumnProps<any>[]
}
/** 跳转表单配置 */
export interface EditFormConfig extends Omit<BaseFormProps, 'items' | 'onValuesChange'> {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
  handleFormValues?: (values: { [k: string]: any }) => null | { [k: string]: any }
}
/** 弹窗表单配置 */
export interface EditModalFormConfig extends Omit<BaseModalFormProps, 'items' | 'onValuesChange'> {
  items?: ((props: any, onItemAction?: ActionFunction) => BaseFormItemProps[]) | BaseFormItemProps[]
  onValuesChange?: ((changedValues: any, allValues: any, props: any) => null | { values: { [k: string]: any } }) | boolean
  /** 弹窗Edit是否请求ItemInfo */
  isFetchData?: boolean
}

/** 详情展示页面配置 */
export interface DescPageConfig extends Omit<BasePageProps, 'items'> {
  items?: ((props: any) => PageItemProps[]) | PageItemProps[]
}

/** 列表通用配置 */
export interface ListPageConfig {
  /** 列表配置 */
  tableConfig?: SearchListTableConfig
  /** 列表搜索项配置 */
  formConfig?: SearchListFormConfig
  /** 弹窗或新页面添加/编辑表单配置，取决于isPush */
  editConfig?: EditModalFormConfig | EditFormConfig
  /** 其他操作区域配置 */
  actions?: (onItemAction: ActionFunction, props: any) => ReactNode
  /** 添加编辑是否跳转新页面或弹窗 */
  isPush?: boolean
  /** 绑定model名，默认list，绑定的Model必须是ListModel */
  NS?: string
  /** 其他绑定的model，可以从参数里获取到其他model的sto */
  otherModels?: string[]
  /** 跳转详情页展示 */
  pageConfig?: DescPageConfig
}

// ---------- Model ----------
/** list model state */
export interface ListModelState {
  /** 列表数据 */
  dataSource?: object[]
  /** 搜索条件 */
  filterParams?: { [key: string]: any }
  pagination?: {
    /** 分页数据 */
    current?: any
    pageSize?: any
    [key: string]: any
  }
  /** 列表选择 */
  selectedRowKeys?: any[]
  /** 列表唯一标记key */
  menuId?: null | string
  /** 当前编辑 */
  editId?: null | 'add' | string
  preEditId?: null | string
  /** 当前编辑数据 */
  itemInfo?: { [key: string]: any }
  /** 其他数据， 列表请求返回的以外数据会存在other里面 */
  others?: { [key: string]: any }
  /** 缓存数据 */
  cached?: { [key: string]: any }
}

/** list model effects 方法名 */
export type ListModelServersEffects = 'fetchData' | 'fetchItemInfo' | 'editItem' | 'deleteItem' | 'actionItem' | 'exportData' | 'updateMatchParams'
// list model reducers 方法名
// export type ListModelServersReducers = 'save' | 'restPageFilter'
/** list model */
export interface ListModel extends Model {
  state?: ListModelState
  effects?: {
    [key in ListModelServersEffects | string]: Effect | EffectWithType
  }
}

// ---------- List Service ----------
/** 定义列表基础service方法名 */
export type ListModelServices = 'getListData' | 'getItemInfo' | 'editItem' | 'deleteListItems' | 'actionItems' | 'exportData'
/** 请求service */
export type ListService = (type: ListModelServices, payload?: { [key: string]: any }, action?: any) => Promise<any>

// ---------- HOOKS ----------
/** 搜索列表自定义操作方法Type */
export type ActionType = 'detail' | 'add' | 'edit' | 'delete' | 'export' | 'search' | 'refresh' | 'update'
/** 搜索列表自定义操作方法（onItemAction） */
export interface ActionFunction {
  (
    type: ActionType | string,
    payload?: { [key: string]: any },
    props?: {
      /** 面包屑 */
      breadcrumb?: string | null | undefined
      /** 回调函数 */
      callback?: Function
      /** 当前操作Id（列表默认通过rowKey获取） */
      id?: string
    }
  ): void
}
/** 列表基本Hook */
export interface BaseListHooksProps extends ListPageConfig, ListModelState, RouterTypes, DispatchProp {
  loadingEffects?: { [key: string]: boolean }
  /** 列表其他搜索参数 */
  otherFilterParams?: { [key: string]: any }
}
