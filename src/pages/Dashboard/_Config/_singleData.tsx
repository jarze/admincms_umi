import React, { Fragment } from 'react';
import { Radio, Tooltip, Input, Icon, InputNumber } from 'antd';
import SingleData from '../components/Items/SingleData';
import { fetchComponentData } from '../service';
import { SCREEN_COMPONENT_ITEM_SETTING } from '../type';
import { TextAlignRadioGroup } from '../_config';
import { mock } from 'mockjs';

export const config: SCREEN_COMPONENT_ITEM_SETTING<'SINGLE_DATA'> = {
  Component: SingleData,
  fetch: (component, id) => {
    if (!component) return Promise.resolve(null);
    if (!id) {
      //未绑定数据源的时候示例数据
      return Promise.resolve(
        mock({ name: '示例@increment(1)', value: '@integer(0,1000000)', unit: '单位@string(1)' }),
      );
    } else {
      return fetchComponentData({ component, id });
    }
  },
  items: [
    {
      label: '名称',
      key: 'name',
    },
    {
      label: '文本',
      key: 'textAlign',
      render: () => TextAlignRadioGroup,
    },
    {
      label: '排列',
      key: 'direction',
      render: () => (
        <Radio.Group buttonStyle="solid">
          {['column', 'row'].map(i => (
            <Radio.Button key={i} value={i}>
              <img src={require(`../assets/flex/icon_flex_direction_${i}.svg`)} alt={i} />
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      label: '左右对齐',
      key: 'style.alignItems',
      render: () => (
        <Radio.Group buttonStyle="solid">
          {['flex-start', 'center', 'flex-end'].map(i => (
            <Radio.Button key={i} value={i}>
              <img
                src={require(`../assets/flex/icon_flex_direction_column_align_${i}.svg`)}
                alt={i}
              />
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      label: '上下对齐',
      key: 'style.justifyContent',
      render: () => (
        <Radio.Group buttonStyle="solid">
          {['flex-start', 'center', 'flex-end'].map(i => (
            <Radio.Button key={i} value={i}>
              <img src={require(`../assets/flex/icon_flex_direction_row_align_${i}.svg`)} alt={i} />
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      label: (
        <Fragment>
          变换&nbsp;&nbsp;
          <Tooltip title="CSS transform 属性">
            <a
              href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform"
              target="CSS transform"
            >
              <Icon type="info-circle" />
            </a>
          </Tooltip>
        </Fragment>
      ),
      key: 'style.transform',
      render: () => <Input />,
    },
    {
      label: '字体大小',
      key: 'style.fontSize',
      render: () => <InputNumber />,
    },
    {
      label: '刷新时间(ms)',
      key: 'interval',
      render: () => <InputNumber />,
    },
    // {
    //   label: '背景',
    //   key: 'background',
    //   render: () => (
    //     <Select>
    //       {[
    //         'bg3-topEC',
    //         'bg3-topP',
    //         'bg3-topPERT',
    //         'bg3-topPF',
    //         'bg3-topPR',
    //         'bg3-topSM',
    //         'bg3-topSR',
    //         'bg3-topTS',
    //       ].map(i => (
    //         <Select.Option
    //           key={i}
    //           title={i}
    //           value={`url(${require(`../assets/${i}.png`)}) no-repeat center / contain`}
    //         >
    //           <img src={require(`../assets/${i}.png`)} alt="i" style={{ height: 30 }} />
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    // },
  ],
};
