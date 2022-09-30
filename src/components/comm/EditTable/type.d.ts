import { TableProps, ColumnProps } from 'antd/es/table'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/es/form/Form'

export interface EditColumnProps<T> extends ColumnProps<T> {
  /** 是否可编辑 */
  disableEdit?: boolean

  editRender?: ColumnProps<T>['render']
  options?: GetFieldDecoratorOptions
  optionsFun?: (record: T) => GetFieldDecoratorOptions
  defaultValue?: any
}

interface EditForm<T> {
  isFieldRowTouched: (key: string) => boolean
  validateRowFields: (key: string, rows?: string[]) => Promise<Partial<T>>
  getRowFieldValue: (key: string, record: T) => any
  setRowFieldValue: (key: string, record: T, value?: any) => void
  setRowFieldsValue: (obj: Object, record: T) => void
}

export interface EditTableProps<T extends Record<string, any>>
  extends Omit<TableProps<T>, 'title'> {
  form?: WrappedFormUtils
  /** 默认id */
  rowKey?: string
  /** key编辑拼接， 默认’-‘ */
  split?: string
  /** 表格编辑状态 */
  editable?: boolean
  title?: (props: {
    /** 添加行 */
    handleAdd
    /** 校验保存表格表单 */
    handleSave
    /** 删除行 */
    handleRemove: (keys: string[]) => void
    /** 是否添加状态 */
    isAdding: boolean
    form: WrappedFormUtils
  }) => React.ReactNode
  /** 表格数据 */
  data?: T[]
  /** columns获取 */
  getColumns?: (props: {
    form: WrappedFormUtils
    /** 取消添加 */
    cancelAdd: () => void
    /** 是否添加状态 */
    isAdding: boolean
    editTableForm: EditForm<T>
  }) => EditColumnProps<T>[]
  /** 是否重置表单 */
  shouldResetFields?: boolean
}
