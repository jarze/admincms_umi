
# 路由规则

# Pages | List

## `list` 配置相关

| 参数 | 说明 | 类型 | 组件 | 默认值 |
| --- | --- | --- | --- | --- |
| [`tableConfig` ](#tableConfig)| 表格显示配置 | `object` | `Table` | - |
| [`formConfig` ](#formConfig)| 表格上面搜索项 | `object` | `Form` | - |
| [`pageConfig`](#pageConfig) | 查看显示项 | `object` | `SinglePage` | - |
| [`editConfig`](#editConfig) | 添加编辑配置项 | `object` |`Form`, `ModalForm` | - |
| `actions` | 操作区域配置 | `Function(onItemAction:Function(type:string, payload:object), listProps: object)` | 自定义 |  |


### `tableConfig` 
> `Table`  ->  `antd`[`Table`](https://ant.design/components/table-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `isPush` | 编辑是弹框还是跳转新页面 | `bool` | false |
| `columns` | 表格列配置描述，`ColumnProps`[]同[`antd Column`](https://ant.design/components/table-cn/#Column) | `ColumnProps[] \  Function(onItemAction:Function(type:string, payload:object), listProps:object):ColumnProps[]` | - |
| `rowSelection` | 是否有row select | `true` | - |
| 其他 | 同自定义封装组件Table API |  |  |

### `formConfig` 
> `Form` -> `antd`[`Form`](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | `ItemProps[] \ Function(listProps: object):ItemProps[]` | - |
| `onValuesChange` | 表单值变化，设为true则自动监听变化更新列表 | `true \ Function（changedValues，allValues）` |   |
| 其他 | 同自定义组件Form API |  |  |

### `pageConfig` 
> `SinglePage` -> `antd`[`Descriptions`](https://ant.design/components/descriptions-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | [`PageItemProps`](#PageItemProps)`[]` \ `Function(listProps: object):`[`PageItemProps`](#PageItemProps)`[]` | - |
| 其他 | 同[`SinglePage API`](#SinglePage) |  |  |

### `editConfig` 
> `Form` or `ModalForm` ->  `antd`[`Modal`](https://ant.design/components/modal-cn/),[`Form`](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | `ItemProps[] \ Function(listProps: object):ItemProps[]` | - |
| `onValuesChange` | 表单值变化，设为true则自动监听变化更新列表 | `true \ Function（changedValues，allValues）` |  |
| 其他(根据[`tableConfig`](#tableConfig)的`isPush`参数决定) \ `isPush: true` | 同自定义组件[`Form API`](https://ant.design/components/form-cn/#API) |  |  |
| 其他 \ `isPush: true` | 同自定义组件[`Modal API`](https://ant.design/components/modal-cn/#API) |  |  |





# components

## Table

## Form

## ModalForm

## `SinglePage`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 数据项 | [`PageItemProps`](#PageItemProps) `[]` | - |
| `data` | 数据值 | `object` | - |
| 其他 | 同[`Descriptions API`](https://ant.design/components/descriptions-cn/#API) |  |  |

### `PageItemProps`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ``key`` | key标志唯一 | <font face="monospace">string</font> | - |
| `render` | 渲染组件 | `Function(text, record, data){}` |  |
| <font face="monospace">`other`</font> | 同[`DescriptionItem`](https://ant.design/components/descriptions-cn/#DescriptionItem) |   | - |


