/* eslint-disable no-unused-expressions */
import React from 'react'
import { Button } from 'antd'
import ClickHandler from '@/components/ClickHandler'
import { saveItem, editItem, deleteItem } from './services'
import { EditTableProps } from '@/components/comm/EditTable/type'

// 用能告警
export const energyColumns = (reFetchData): EditTableProps<any>['getColumns'] => ({
  cancelAdd,
  editTableForm,
  ADD_ROW_KEY
}) => [
  {
    title: 'A',
    dataIndex: 'a',
    options: { rules: [{ required: true, message: 'AA' }] }
  },
  { title: 'B', dataIndex: 'b' },
  {
    title: 'C',
    dataIndex: 'c',
    width: 180,
    options: { rules: [{ required: true, message: 'CC' }] }
  },
  { title: 'D', dataIndex: 'd', width: 350 },
  {
    title: '操作',
    dataIndex: 'id',
    disableEdit: true,
    width: 150,
    align: 'center',
    render: id => (
      <>
        <ClickHandler
          handler={() =>
            editTableForm
              ?.validateRowFields(id)
              // @ts-ignore
              .then(id?.startsWith?.(ADD_ROW_KEY) ? saveItem : editItem)
              .then(reFetchData)
              .catch(() => {})
          }
        >
          <Button
            type="primary"
            ghost={true}
            disabled={!editTableForm?.isFieldRowTouched(id)}
            icon="save"
          />
        </ClickHandler>
        {id?.startsWith?.(ADD_ROW_KEY) ? (
          <Button onClick={cancelAdd} icon="close" />
        ) : (
          <ClickHandler
            handler={() => deleteItem(id).then(reFetchData)}
            isConfirm={true}
            title="删除后不可恢复，是否确认删除？"
          >
            <Button type="danger" ghost={true} icon="delete" />
          </ClickHandler>
        )}
      </>
    )
  }
]
