import { BaseHandlerModalFormProps } from '../HandlerModalForm';
import { TableProps } from 'antd/es/table';
import { BaseFormProps } from '../comm/Form';

/** 配置项增加可通过方法获取 */
type ColumnItemGetter<T extends object, K extends keyof T> = Omit<T, K> & {
  [key in K]: ((props: any, onItemAction?: ActionFunction) => T[K]) | T[K];
};

/* 替换字段 */
type ReplaceKeys<T, P> = {
  [key in keyof T]: key extends keyof P ? P[key] : T[key];
};

/* 插入参数 */
type InsertArgument<T extends (...args: any) => any, P> = T extends (...args: infer A) => infer R
  ? (...args: [params: P, ...rest: A]) => R
  : any;

export type ActionType = 'add' | 'edit' | 'refresh' | 'reload';

/** 搜索列表自定义操作方法（onItemAction） */
export type ActionFunction = {
  (
    /** 操作方法标记 */
    type: ActionType,
    payload?: Record<string, any>,
  ): void;
};

/** 列表搜索项表单配置 */
export interface ListPageConfig<T> {
  /** 列表搜索项配置 */
  formConfig?: ColumnItemGetter<ReplaceKeys<BaseFormProps, { onValuesChange?: boolean }>, 'items'>;
  /** 列表配置 */
  tableConfig?: ColumnItemGetter<
    ReplaceKeys<
      TableProps<T>,
      {
        title: InsertArgument<
          TableProps<T>['title'],
          { onItemAction: ActionFunction; props?: any }
        >;
      }
    >,
    'columns'
  > & {
    /* 单行超过宽度...显示 */
    ellipsis?: boolean;
  };
  /** 弹窗或新页面添加/编辑表单配置，取决于isPush */
  editConfig?: ColumnItemGetter<BaseHandlerModalFormProps, 'items'>;
  /** 其他操作区域配置 */
  actions?: (onItemAction: ActionFunction, props: any) => React.ReactNode;
  /** 网络请求 */
  S?: {
    /* 获取列表数据 */
    getList: (params: any) => Promise<({ data?: Array<T> } & Record<string, any>) | Array<T>>;
    /* 添加编辑 */
    editItem?: (
      /* 表单值 */ params: Partial<T>,
      /* 表单初始数据 */ current: Partial<T>,
    ) => Promise<any>;
    [k: string]: any;
  };
}

/** 搜索列表hook */
export type SearchListHooks<T> = {
  (props: ListPageConfig<T>): {
    /* 添加编辑弹窗表单配置 */
    modalFormProps?: BaseHandlerModalFormProps;
    /* 表格配置 */
    tableProps?: TableProps<T>;
    /* 搜索项配置 */
    formProps?: BaseFormProps;
    onItemAction: ActionFunction;
    /* 其他数据 */
    other?: any;
  };
};

export type SearchListHooksReturn<T> = ReturnType<SearchListHooks<T>>;
