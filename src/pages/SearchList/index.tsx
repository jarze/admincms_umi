import React from 'react'
import { Button, Input, Card } from 'antd'
import SearchList from '@/components/SearchList'
import ClickHandler from '@/components/ClickHandler'
import { ListPageConfig } from '@/components/SearchList/type'
import * as S from './service'

const { TextArea } = Input

export type ItemProps = {
  id?: any
  /* 计入年度 */
  countYear: string
  /* 年度产值  */
  outputValue: string
  /* 年度增加值 */
  addedValue: string
  /* 年度销售收入 */
  salesIncome: string
  /* 备注 */
  remark: string
}

const config: ListPageConfig<ItemProps> = {
  formConfig: {
    items: [
      {
        label: '计入年度',
        key: 'countYear'
      }
    ]
  },
  // 列表
  tableConfig: {
    columns: (props, onItemAction) => [
      // columns: [
      { title: '计入年度', dataIndex: 'countYear', width: 120 },
      { title: '年度产值', dataIndex: 'outputValue', width: 200 },
      { title: '年度增加值', dataIndex: 'addedValue', width: 200 },
      { title: '年度销售收入', dataIndex: 'salesIncome', width: 200 },
      { title: '备注', dataIndex: 'remark' },
      {
        key: 'operation',
        title: '操作',
        width: 180,
        // fixed: 'right',
        render: (_, record) => (
          <>
            <Button type="primary" ghost={true} onClick={() => onItemAction('edit', record)}>
              编辑
            </Button>
            <ClickHandler
              isConfirm={true}
              title="是否确认删除？"
              handler={() => S.deleteItem(record.id)}
              onComplete={() => onItemAction('reload')}
            >
              <Button type="danger" ghost={true}>
                删除
              </Button>
            </ClickHandler>
          </>
        )
      }
    ],
    title: ({ onItemAction }) => (
      <Button icon="plus" type="primary" onClick={() => onItemAction?.('add')}>
        添加
      </Button>
    ),
    rowKey: 'id',
    ellipsis: true
    // pagination: false,
  },
  // 添加编辑表单
  editConfig: {
    // items: (props, onItemAction) => [
    items: [
      {
        label: '计入年度',
        key: 'countYear',
        placeholder: '格式 yyyy',
        options: {
          rules: [
            { required: true, whitespace: true },
            {
              pattern: /^\d{4}$/,
              message: '请输入正确格式（yyyy）'
            }
          ]
        }
      },
      {
        label: '年度产值',
        key: 'outputValue',
        options: {
          rules: [
            { required: true, whitespace: true },
            { type: 'string', max: 10 }
          ]
        }
      },
      {
        label: '年度增加值',
        key: 'addedValue',
        options: {
          rules: [
            { required: true, whitespace: true },
            { type: 'string', max: 10 }
          ]
        }
      },
      {
        label: '年度销售收入',
        key: 'salesIncome',
        options: {
          rules: [
            { required: true, whitespace: true },
            { type: 'string', max: 10 }
          ]
        }
      },
      {
        label: '备注',
        key: 'remark',
        options: { rules: [{ type: 'string', max: 255, whitespace: true }] },
        render: () => (
          <TextArea autosize={{ minRows: 5 }} placeholder="请输入备注" style={{ resize: 'none' }} />
        )
      }
    ],
    formProps: { labelCol: { span: 5 }, wrapperCol: { span: 18 } },

    title: '产值收入'
  }
}

export default first => {
  return (
    <Card>
      <SearchList {...config} S={S} />
    </Card>
  )
}
