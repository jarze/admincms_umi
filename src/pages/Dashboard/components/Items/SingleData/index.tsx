import React, { CSSProperties } from 'react';
import useRequest from '../../../_hooks/useRequest';
import { ResponseOfComponentType } from '../../../type';
import ChartConfig from '../config';
import useTimerChange from '../../../_hooks/useTimerChange';

interface SingleDataProps {
  /** 请求数据 返回[图表数据，搜索项] */
  fetch?: (params?: any) => Promise<ResponseOfComponentType<'SINGLE_DATA'>>;
  /** 刷新接口请求频率， 若为空或0 不做定时刷新 */
  interval?: number;
  /** 排列 */
  direction?: 'column' | 'row';
  /** 文本对齐 */
  textAlign?: 'left' | 'center' | 'right';
  /** 标题名 */
  name?: string;
  /** 样式 */
  style?: CSSProperties | undefined;
}

const SingleData = ({ name, fetch, interval, textAlign, direction, style }: SingleDataProps) => {
  const [change] = useTimerChange({ interval });

  const { data } = useRequest<ResponseOfComponentType<'SINGLE_DATA'>>({
    fetchData: fetch,
    params: change,
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...ChartConfig.rich.text,
        ...(style || {}),
      }}
    >
      <span style={{ textAlign }}>
        <span>{name || data?.name}</span>
        {direction !== 'row' ? <br /> : ' '}
        <span style={{ ...ChartConfig.rich.value, fontSize: '1.5em' }}>{`${data?.value ?? '--'} ${
          data?.unit || ''
        }`}</span>
      </span>
    </div>
  );
};

SingleData.defaultProps = {
  direction: 'column',
  textAlign: 'left',
  style: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: ChartConfig.rich.text.fontSize,
  },
};

export default SingleData;
