import React, { useState, Fragment } from 'react'
import { Drawer, Button, Tooltip } from 'antd'

const SettingDrawer = ({
  children,
  onCancel,
  onSave,
  icon = 'setting',
  text = null,
  setting = null,
  title = '设置'
}) => {
  const [visible, setVisible] = useState(false)

  const handleVisible = (v, e) => {
    e?.stopPropagation?.()
    setVisible(v)
  }
  return (
    <Fragment>
      {setting ? (
        <span
          onClick={e => {
            handleVisible(true, e)
          }}
        >
          {setting}
        </span>
      ) : (
        <Button
          type="primary"
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            opacity: 0.6,
            zIndex: 100,
            border: 'none',
            transform: 'scale(1.5)'
          }}
          ghost={true}
          icon={icon}
          onClick={e => {
            handleVisible(true, e)
          }}
        >
          {text}
        </Button>
      )}
      <Drawer
        width={450}
        title={title}
        placement="right"
        mask={false}
        maskClosable={false}
        closable={false}
        onClose={e => handleVisible(false, e)}
        visible={visible}
        bodyStyle={{
          paddingBottom: 100
        }}
      >
        {children}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px'
          }}
        >
          <Tooltip title="将不会保存本次修改">
            <Button
              style={{
                marginRight: 8
              }}
              onClick={e => {
                handleVisible(false, e)
                onCancel?.()
              }}
            >
              取消
            </Button>
          </Tooltip>
          <Button
            onClick={e => {
              handleVisible(false, e)
              onSave?.()
            }}
            type="primary"
          >
            保存
          </Button>
        </div>
      </Drawer>
    </Fragment>
  )
}

export default SettingDrawer
