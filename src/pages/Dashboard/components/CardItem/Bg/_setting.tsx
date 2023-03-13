import React, { Fragment } from 'react';
import { Radio } from 'antd';
import { TextAlignRadioGroup } from '../../../_config';
import { themeInstance } from '../../Theme/_theme';
import TypeA from './Bg1';
import TypeB from './Bg2';

const BgItem = ({ width = 100, height = 50, children }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-block',
      width,
      height,
      verticalAlign: 'middle',
      backgroundColor: themeInstance.vars.bgColor,
    }}
  >
    <div
      style={{
        width: '200%',
        height: '200%',
        position: 'absolute',
        transform: 'scale(0.4)',
        transformOrigin: '10% 10%',
      }}
    >
      {children}
    </div>
  </div>
);

export const config = {
  items: [
    {
      label: '标题',
      key: 'title',
    },
    {
      label: '标题位置',
      key: 'titlePosition',
      defaultValue: 'left',
      render: () => TextAlignRadioGroup,
    },
    {
      label: '背景',
      key: 'background',
      defaultValue: 'bg0-none',
      render: () => (
        <Radio.Group>
          <Radio value="bg0-none">无背景</Radio>
          <br />
          {[
            'border',
            'corner',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'leftTop',
            'rightTop',
            'leftBottom',
            'rightBottom',
          ].map(i => (
            <Radio value={`bg1-${i}`} key={i}>
              <BgItem>
                <TypeA type={i as any} />
              </BgItem>
            </Radio>
          ))}
          <p>背景2</p>
          <Radio value="bg2-zhutai">
            <BgItem width={164} height={100}>
              <TypeB />
            </BgItem>
          </Radio>
        </Radio.Group>
      ),
    },
    {
      render: () => (
        <Fragment>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Fragment>
      ),
    },
  ],
};
