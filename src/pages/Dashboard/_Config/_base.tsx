import React from 'react';
import { Radio } from 'antd';
import { ScreenComponentsTypes } from '../_config';
import { config as bgSetting } from '../components/CardItem/Bg/_setting';

export const config = {
  items: [
    {
      label: '模块内容',
      key: 'type',
      render: () => <Radio.Group options={ScreenComponentsTypes} />,
    },
    ...bgSetting.items,
  ],
};
