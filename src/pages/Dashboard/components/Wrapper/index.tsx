import React from 'react'
import { Divider } from 'antd'
import styles from './index.less'
import { EditTheme, ThemeVars } from '../Theme'
import useTheme from '../Theme/_useTheme'
import SettingProvider from '../Context'

const EDIT_CONTAINER = 'edit-container'

export default ({ children, header = null, editable, theme, onChangeTheme }) => {
  const { data, changeTheme, styleVars, themeInstance } = useTheme({ theme })

  return editable ? (
    <SettingProvider editable={editable}>
      <div className={styles.editWrapper}>
        <div className={styles.header}>
          {header}
          <Divider type="vertical" />
          <EditTheme
            data={data}
            changeTheme={changeTheme}
            onSave={onChangeTheme}
            onReset={() => changeTheme(theme)}
          />
        </div>
        <ThemeVars
          id={EDIT_CONTAINER}
          key={themeInstance.id}
          className={styles.editContent}
          styleVars={styleVars}
        >
          {children}
        </ThemeVars>
      </div>
    </SettingProvider>
  ) : (
    <ThemeVars className={styles.wrapper} styleVars={styleVars}>
      {children}
    </ThemeVars>
  )
}
