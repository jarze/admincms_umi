
# 路由规则

# logic 

## list 配置相关

| 参数 | 说明 | 类型 | antd组件 | 默认值 |
| --- | --- | --- | --- | --- |
| [`tableConfig` ](#tableConfig)| 表格显示配置 | `object` | [Table](https://ant.design/components/table-cn/) | - |
| [`formConfig` ](#formConfig)| 表格上面搜索项 | `object` | [Form](https://ant.design/components/form-cn/)， [Modal](https://ant.design/components/modal-cn/) | - |
| pageConfig | 查看显示项 | `object` | [Descriptions](https://ant.design/components/descriptions-cn/) | - |
| editConfig | 添加编辑配置项 | `object` | [Form](https://ant.design/components/form-cn/) | - |
| actions | 操作区域配置 | `Function(onItemAction:Function(type:string, payload:object), listProps: object)` | 自定义 |  |


### tableConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `isPush` | 编辑是弹框还是跳转新页面 | `bool` | false |
| `columns` | 表格列配置描述，`ColumnProps`[]同[antd Column](https://ant.design/components/table-cn/#Column) | `ColumnProps[] \  Function(onItemAction:Function(type:string, payload:object), listProps:object):ColumnProps[]` | - |
| `rowSelection` | 是否有row select | `true` | - |
| 其他 | 同自定义封装组件Table API |  |  |

### formConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | `ItemProps[] \ Function(listProps: object):ItemProps[]` | - |
| `onValuesChange` | 表单值变化，设为true则自动监听变化更新列表 | `true \ Function（changedValues，allValues）` |   |
| 其他 | 同自定义组件Form API |  |  |

### pageConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | `PageItemProps[] \ Function(listProps: object):PageItemProps[]` | - |
| 其他 | 同自定义组件SinglePage API |  |  |





# pages

## list

## singlePage

# components

## Table

## Form

## ModalForm

## SearchList

## SinglePage

