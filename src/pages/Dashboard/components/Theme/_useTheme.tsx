import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { ThemeVarsType, themeInstance } from './_theme';

const useTheme = ({ theme }: { theme: ThemeVarsType }) => {
  const [data, setData] = useState(themeInstance.vars);
  useEffect(() => {
    // changeTheme(theme);
    themeInstance.updateTheme(theme);
    setData({ ...themeInstance.vars });
  }, [theme]);

  /** 更新配置 */
  const changeTheme = useCallback(
    debounce(newV => {
      themeInstance.updateTheme(newV);
      setData({ ...themeInstance.vars });
    }, 400),
    [],
  );

  return { data, changeTheme, styleVars: themeInstance.styleVars, themeInstance };
};

export default useTheme;
