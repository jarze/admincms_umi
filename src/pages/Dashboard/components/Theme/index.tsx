import React, { forwardRef } from 'react'
import { Button, Divider } from 'antd'
import classnames from 'classnames'
import SettingDrawer from '../SettingDrawer'
import Setting from '../setting'
import { ThemeVarsType, themeInstance } from './_theme'
import { config } from './_setting'
import styles from './index.less'

import useTheme from './_useTheme'

export interface ThemeProps extends Omit<React.HTMLAttributes<any>, 'onChange'> {
  theme?: Partial<ThemeVarsType>
  onChange?: Function
  editable?: boolean
}

export const EditTheme = ({ changeTheme, data, onSave, onReset }) => {
  return (
    <SettingDrawer
      title="样式设置"
      setting={
        <Button type="link" icon="dashboard">
          样式
        </Button>
      }
      onCancel={onReset}
      onSave={() => {
        onSave?.(data)
      }}
    >
      <div>
        <Button onClick={onReset} icon="undo" />
        <Divider type="vertical" />
        <Button type="primary" onClick={() => changeTheme?.(themeInstance.defaultVars)}>
          默认样式
        </Button>
      </div>
      <Divider />
      <Setting
        data={data}
        items={config?.items}
        onChange={v => {
          changeTheme?.(v)
        }}
      />
    </SettingDrawer>
  )
}

export const ThemeVars = forwardRef(
  ({ children, theme = null, className, style, styleVars, ...props }: any, ref) => (
    <div
      ref={ref}
      style={{ ...styleVars, ...style }}
      className={classnames(styles.screen, className)}
      {...props}
    >
      {children}
    </div>
  )
)

export default ({ children, theme = null, ...props }: ThemeProps) => {
  const { styleVars } = useTheme({ theme })
  return (
    <ThemeVars styleVars={styleVars} {...props}>
      {children}
    </ThemeVars>
  )
}
