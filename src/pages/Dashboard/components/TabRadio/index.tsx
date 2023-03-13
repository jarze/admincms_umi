import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import style from './index.less';
const { TabPane } = Tabs;

interface TabRadioProps extends TabsProps {
  data?: Array<{ name: string; key: string }>;
}

export default ({ data, ...props }: TabRadioProps) => {
  return (
    data?.length > 0 && (
      <Fragment>
        <Tabs tabPosition={'top'} className={style.tab} {...props}>
          {data?.map?.(item => (
            <TabPane tab={item.name} key={item.key} />
          ))}
        </Tabs>
      </Fragment>
    )
  );
};
