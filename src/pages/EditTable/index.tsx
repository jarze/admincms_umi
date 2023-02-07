import React, { useState, useCallback } from 'react'
import { Button, Card } from 'antd'
import EditTable from '@/components/comm/EditTable'
import ClickHandler from '@/components/ClickHandler'
import useRequest from '@/pages/_hooks/useRequest'
import { getListData, saveItem } from './services'
import { energyColumns } from './_logic'

export default ({
  getColumns = energyColumns,
  fetchData = getListData,
  saveAll = saveItem,
  ...props
}) => {
  const [refreshTag, setRefreshTag] = useState(false)

  const { data, loading } = useRequest<any>({
    fetchData,
    params: refreshTag
  })

  const reFetchData = useCallback(() => {
    setRefreshTag(pre => !pre)
  }, [])

  const getCl = useCallback(getColumns(reFetchData), [])

  return (
    <Card>
      <EditTable
        {...props}
        bordered={true}
        getColumns={getCl}
        dataSource={data}
        loading={loading}
        title={({ handleAdd, handleSave, isAdding, form }) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button icon="plus" onClick={handleAdd} type="primary" disabled={isAdding}>
              添加
            </Button>
            <ClickHandler
              handler={() =>
                handleSave()
                  .then(saveAll)
                  .then(reFetchData)
              }
            >
              <Button type="primary" disabled={isAdding || !form.isFieldsTouched()}>
                保存全部
              </Button>
            </ClickHandler>
          </div>
        )}
      />
    </Card>
  )
}
