import React, { useState, useEffect } from 'react'
import { Radio } from 'antd'
import withRouter from 'umi/withRouter'
import { getConfig, postConfig } from './service'
import Setting from '../setting'
// import DataBind from './index';
import sqlConfig from './_sql'

const SourceTypes = [
  { label: '数据绑定', key: 'API' },
  { label: 'SQL', key: 'SQL' }
]

type SourceTabsProps = React.ComponentType<any> & {
  sourceId?: string
  onChange?: (sourceId?: any) => void
}

function SourceTabs({ sourceId, onChange, match }) {
  const pageId = match.params.id
  const [data, setData] = useState<Record<string, any>>({})
  useEffect(() => {
    if (sourceId) {
      getConfig(sourceId).then((resp: any) => {
        setData(resp.data || {})
      })
    } else {
      setData({})
    }
    return () => {}
  }, [sourceId])

  const type = data?.dataSourceType || SourceTypes[0].key

  const handleSubmit = values => {
    postConfig({ ...data, ...values, pageId }, sourceId).then(data => {
      if (!data) return
      onChange(data)
    })
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Radio.Group
          buttonStyle="solid"
          value={type}
          onChange={e => setData({ dataSourceType: e.target.value })}
        >
          {SourceTypes.map(i => (
            <Radio.Button value={i.key} key={i.key}>
              {i.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <br />
      {type === 'API' ? (
        <div>TODO: API</div>
      ) : (
        // <DataBind sourceId={sourceId} onChange={onChange} />
        <Setting
          data={data}
          {...sqlConfig}
          okText={sourceId ? '更改数据源' : '绑定数据源'}
          cancelText={sourceId ? '重置' : '清空'}
          submitCol={{ span: 24, offset: 7 }}
          onSubmit={handleSubmit}
          onReset={() => {}}
        />
      )}
    </>
  )
}

export default withRouter<any, SourceTabsProps>(SourceTabs)
