[TOC]

# 路由规则

> <mark>`menuId`</mark> 唯一标志页面

## 路由配置
### [`list`](#list配置相关)

``` javascript
	routes: [
			{
				path: '*/:menuId/list',
				component: './*/$menuId/list/$id$.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:menuId/list/page/:id',
				component: './*/$menuId/list/page/$id.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:menuId/list/edit/:id?',
				component: './*/$menuId/list/edit/$id$.js',
				Routes: ['./src/routes/list.js'],
			},
		],
```


# Pages

## `list` 配置相关

| 参数 | 说明 | 类型 | 组件 | 默认值 |
| --- | --- | --- | --- | --- |
| [`tableConfig` ](#tableConfig)| 表格显示配置 | `object` | [`Table`](#Table) | - |
| [`formConfig` ](#formConfig)| 表格上面搜索项 | `object` | [`Form`](#Form) | - |
| [`pageConfig`](#pageConfig) | 查看显示项 | `object` | [`SinglePage`](#SinglePage) | - |
| [`editConfig`](#editConfig) | 添加编辑配置项 | `object` |[`Form`](#Form), [`ModalForm`](#ModalForm) | - |
| `actions` | 操作区域配置 | `Function(onItemAction:Function(type:string, payload:object), listProps: object)` | 自定义 |  |
| `NS` | 使用`model`名 | `string` |  | `list` |
| `isPush` | 编辑是弹框还是跳转新页面 | `bool`| | `false` |


### `tableConfig` 
> [`Table`](#Table)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |

| `columns` | 表格列配置描述，`ColumnProps`[]同[`antd Column`](https://ant.design/components/table-cn/#Column) | `ColumnProps[] \  Function(onItemAction:Function(type:string, payload:object), listProps:object):ColumnProps[]` | - |
| `rowSelection` | 是否有row select | `true` | - |
| 其他 | 同自定义封装组件[`Table API`](#Table) |  |  |

### `formConfig` 
> [`Form`](#Form) 

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | [`FormItemProps[]`](#FormItemProps)`\ Function(listProps: object):`[`FormItemProps[]`](#FormItemProps) | - |
| `onValuesChange` | 表单值变化，设为true则自动监听变化更新列表 | `true \ Function（changedValues，allValues）` |   |
| 其他 | 同自定义组件[`Form API`](#Form)|  |  |

### `pageConfig` 
> [`SinglePage`](#SinglePage)

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
| 其他 \ `isPush: false` | 同自定义组件[`Modal API`](https://ant.design/components/modal-cn/#API) |  |  |
| `isFetchData` (`isPush: false`) | 是否请求`item`数据 | bool |  |


# components

## `Table`
> ->  `antd`[`Table`](https://ant.design/components/table-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `selectAlert` | 选择`Alert`提示区域 {选择其他区域， 隐藏`Alert`} | `{extraContent: Function(selectedRowKeys:[], listProps: object, hide: bool)}object` |  |

## `EditableTable`


## `Form`
> `antd`[`Form`](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 数据项 | [`FormItemProps`](#FormItemProps) `[]` | - |
| `onSubmit` | 数据验证成功后回调事件 | `Function(values:object)` | - |
| `onReset` | 清除表单数据 | `Function({})` | - |
| `onValuesChange` | 任一表单域的值发生改变时的回调 | `(changedValues:object, allValues:object) => void` | - |
| `data` | 表单初始值 | `object` | - |
| `type` | 表单布局 | `'follow' \ 'col' \ 'center'` |  |
| `okText` | 提交按钮文案 | `string` | `确定` |
| `cancelText` | 清除按钮文案 | `string` | `清除` |
| `col` | 表单布局排版，在`type: col`时有效 | `number` `(0-24)` | 8 |
| `submitCol` | 提交按钮排版 | `number (0-24)` |  |
| 其他 | 同[`Form API`](https://ant.design/components/form-cn/#API) |  |  |

### `FormItemProps`
> 同 `antd` [`FormItem`](https://ant.design/components/form-cn/#FormItem)

## `ModalForm`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 搜索项 | [`FormItemProps[]`](#FormItemProps)`\ Function(listProps: object):`[`FormItemProps[]`](#FormItemProps) | - |
| `onValuesChange` | 表单值变化，设为true则自动监听变化更新列表 | `true \ Function（changedValues，allValues）` |   |
| 其他 | 同自定义组件[`Modal API`](#Modal)|  |  |

## `Modal`

## `SinglePage`
>  -> `antd`[`Descriptions`](https://ant.design/components/descriptions-cn/)

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
| `other` | 同[`DescriptionItem`](https://ant.design/components/descriptions-cn/#DescriptionItem) |   | - |


