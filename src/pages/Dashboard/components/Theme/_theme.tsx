import { kebabCase, merge } from 'lodash';
import Color from 'color';

export type ThemeVarsType = Partial<{
  fontSize: number;
  themeColor: string;
  upColor: string;
  downColor: string;
  textColor: string;
  textColor0: string;
  bgColor: string;
  bgColor1: string;

  textColorA85: string;
  textColorA80: string;
  textColorA65: string;
  textColorA45: string;
  textColorA20: string;

  themeColor1: string;
  themeColor2: string;
  themeColorA50: string;
  themeColorA15: string;

  themeBgColor1: string;
  themeBgColor2: string;
  themeBgColor3: string;
  themeBgColor3Matrix: string;
}>;

export class ThemeVars {
  // 单例
  private static _instance: ThemeVars;

  id = 0;
  /** css 变量前缀 */
  STYLE_VAR_PREFIX = '--screen';

  defaultVars: ThemeVarsType = {
    fontSize: 14,
    themeColor: '#24fcff',
    upColor: '#f34000',
    downColor: '#21e897',
    bgColor: '#060e16',
  };

  /** js 变量 */
  vars = { ...this.defaultVars };
  /** css 变量 */
  styleVars: any = {};

  constructor(theme?: Partial<ThemeVarsType>) {
    if (!ThemeVars._instance) {
      ThemeVars._instance = this;
    }
    ThemeVars._instance.updateTheme(theme);
    return ThemeVars._instance;
  }

  updateTheme(theme?: Partial<ThemeVarsType>) {
    merge(this.vars, theme || {});
    this.handleExtraVars();
    this.id += 1;
    this.styleVars = this.transformVars(this.vars);
  }

  transformVars(vars) {
    return Object.fromEntries(
      Object.entries(vars).map(([k, v]) => [`${this.STYLE_VAR_PREFIX}-${kebabCase(k)}`, v]),
    );
  }

  handleExtraVars(vars = this.vars) {
    if (vars.bgColor) {
      const isDark = Color(vars.bgColor).isDark();
      vars.textColor = isDark ? '#fff' : '#000';
      vars.textColor0 = !isDark ? '#fff' : '#000';
    }
    if (vars.textColor) {
      vars.textColorA85 = Color(vars.textColor).alpha(0.85).string();
      vars.textColorA80 = Color(vars.textColor).alpha(0.8).string();
      vars.textColorA65 = Color(vars.textColor).alpha(0.65).string();
      vars.textColorA45 = Color(vars.textColor).alpha(0.45).string();
      vars.textColorA20 = Color(vars.textColor).alpha(0.2).string();

      vars.bgColor1 = Color(vars.textColor).negate().alpha(0.2).string();
    }
    if (vars.themeColor) {
      vars.themeColor1 = Color(vars.themeColor).darken(0.33).desaturate(0.05).string();
      vars.themeColor2 = Color(vars.themeColor).lighten(0.56).desaturate(0.21).string();

      vars.themeColorA50 = Color(vars.themeColor).alpha(0.5).string();
      vars.themeColorA15 = Color(vars.themeColor).alpha(0.15).string();

      if (vars.bgColor) {
        // 跟背景色混合生成颜色
        vars.themeBgColor1 = Color(vars.themeColor)
          .mix(Color(vars.bgColor), 0.8)
          .rotate(25)
          .lighten(1.35)
          .saturate(0.42)
          .string();
        vars.themeBgColor2 = Color(vars.themeBgColor1).alpha(0.5).string();

        vars.themeBgColor3 = Color(vars.themeBgColor1)
          .rotate(0.6)
          .saturate(0.01)
          .darken(0.03)
          .alpha(0.5)
          .string();
        vars.themeBgColor3Matrix = this.colorMatrix(vars.themeBgColor3);
      }
    }
    return vars;
  }

  colorMatrix(color) {
    const c = Color(color);
    const [r, g, b, a] = [c.red() / 255.0, c.green() / 255.0, c.blue() / 255.0, c.alpha()];
    return ` 0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 ${a} 0 `;
  }
}

/** 单例theme */
export const themeInstance = new ThemeVars();
