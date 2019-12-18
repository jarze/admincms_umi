/*
 * @Autor: jarze
 * @Date: 2019-09-12 10:11:42
 * @Desc: 主要使用了antd Descriptions
 * API 同antd
 *
 * 增加API： items | { label, key, span, render }， data
 */
import { Descriptions } from 'antd';

const { Item } = Descriptions;

export default ({ items = [], itemInfo: data = {}, ...props }) => {
  const content = items.map(item => {
    let { key, label, render, ...props } = item;
    return (
      <Item key={key} label={label} {...props}>
        {render ? render(data[key], item, data) : data[key]}
      </Item>
    );
  });

  return (
    <Descriptions layout="vertical" {...props}>
      {content}
    </Descriptions>
  );
};
