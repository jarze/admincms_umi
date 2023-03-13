import React from 'react';
import { Input } from 'antd';
import CustomHtml from '../components/Items/CustomHtml';
import { SCREEN_COMPONENT_ITEM_SETTING } from '../type';

export const config: SCREEN_COMPONENT_ITEM_SETTING<'CUSTOM_HTML'> = {
  Component: CustomHtml,
  items: [
    {
      // label: '内容',
      key: 'content',
      render: () => <Input.TextArea placeholder="请输入html内容" autosize={{ minRows: 5 }} />,
    },
  ],
  bindSource: false,
};
