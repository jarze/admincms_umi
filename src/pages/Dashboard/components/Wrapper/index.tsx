import React from 'react'
import { Divider } from 'antd'
import styles from './index.less'
import { EditTheme, ThemeVars } from '../Theme'
import useTheme from '../Theme/_useTheme'

export default ({ children, header = null, editable, theme, onChangeTheme }) => {
  const { data, changeTheme, styleVars, themeInstance } = useTheme({ theme })

  return editable ? (
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
      <ThemeVars key={themeInstance.id} className={styles.editContent} styleVars={styleVars}>
        {children}
      </ThemeVars>
    </div>
  ) : (
    <ThemeVars className={styles.wrapper} styleVars={styleVars}>
      {children}
    </ThemeVars>
  )
}
