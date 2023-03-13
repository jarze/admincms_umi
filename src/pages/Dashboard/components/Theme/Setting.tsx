import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import SettingDrawer from '../SettingDrawer';
import Setting from '../setting';
import { config } from './_setting';
import { debounce } from 'lodash';
import { ThemeProps } from './index';
import { ThemeVars } from './_theme';

export default ({ theme = null, onChange }: ThemeProps) => {
  const [data, setData] = useState(new ThemeVars(theme));
  useEffect(() => {
    setData(new ThemeVars(theme));
  }, [theme]);

  /** 更新配置 */
  const changeTheme = useCallback(
    debounce(newV => {
      setData(p => new ThemeVars({ ...p.vars, ...newV }));
    }, 800),
    [],
  );
  return (
    <SettingDrawer
      setting={<Button type="primary">主题样式</Button>}
      onCancel={() => {
        setData(new ThemeVars(theme));
      }}
      onSave={() => {
        onChange?.(data.vars);
      }}
    >
      <Setting
        data={data.vars}
        items={config?.items}
        onChange={v => {
          changeTheme(v);
        }}
      />
    </SettingDrawer>
  );
};
