import React, { useMemo, Fragment } from 'react';
import { Spin, Progress } from 'antd';
import ScrollTable from '../../ScrollList/Table';
import { ResponseOfComponentType } from '../../../type';
import useIntervalRequestChange from '../useIntervalRequestChange';
import styles from './index.less';
import ChartConfig from '../config';
import { parsePercent } from '../_utils';
import classnames from 'classnames';

const UpDown = ({ value }) => {
  const isUp = +value > 0;
  return (
    <span
      className={styles[isUp ? 'up' : 'down']}
      style={{
        fontWeight: 500,
        color: isUp ? ChartConfig.CHART_CONST.upColor : ChartConfig.CHART_CONST.downColor,
      }}
    >
      {parsePercent(value)}
    </span>
  );
};

const renderItem = (type: 'ranking' | 'value' | 'upDown' | string) => (value, record, index) => {
  const { rich, CHART_CONST } = ChartConfig;
  if (type?.startsWith?.('ranking')) {
    return (
      <Progress
        showInfo={false}
        style={{ color: CHART_CONST.themeOpacityBgColor }}
        percent={value || 0}
        strokeColor={{
          '100%': CHART_CONST.themeColor,
          '0%': CHART_CONST.themeColor1,
        }}
      />
    );
  } else if (type?.startsWith?.('upDown')) {
    return <UpDown value={value} />;
  } else if (type?.startsWith?.('value') || type?.startsWith?.('number')) {
    return (
      <span
        style={{
          ...rich.value,
          fontSize: 'inherit',
          textShadow: `0 0 ${rich.value.textShadowBlur}px ${rich.value.textShadowColor}`,
        }}
      >
        {value}
      </span>
    );
  }
  return <Fragment>{value}</Fragment>;
};

type ScrollsListDataType = ResponseOfComponentType<'SCROLL_LIST'>;

interface ScrollsListProps {
  fetch?: (params?: any) => Promise<ScrollsListDataType>;
  /** 滚动速率 */
  animationDuration?: number;
  size?: 'l' | 's' | 'default';
  /** 刷新接口请求频率， 若为空或0 不做定时刷新 */
  interval?: number;
}

const ScrollsList = ({ fetch, animationDuration, size, interval }: ScrollsListProps) => {
  const { dataSource, loading, search } = useIntervalRequestChange<ScrollsListDataType>({
    fetch,
    interval,
  });

  const { titles, data } = dataSource?.data || {};

  const columns = useMemo(
    () =>
      Object.entries(titles || {}).map(([key, title]) => ({
        title:
          key === 'value' ? `${title}${dataSource?.unit ? `(${dataSource?.unit})` : ''}` : title,
        key,
        dataIndex: key,
        render: renderItem(key),
      })),
    [titles],
  );
  return (
    <Spin spinning={loading} wrapperClassName={styles.container}>
      {search}
      <ScrollTable
        key={`${dataSource.key}-${data?.length}`}
        className={classnames(styles.wrapper, {
          [styles[`wrapper-${size}`]]: !!size || size !== 'default',
        })}
        style={{ height: search ? 'calc(100% - 2em)' : '100%', position: 'relative' }}
        dataSource={data}
        animationDuration={animationDuration}
        columns={columns}
      />
    </Spin>
  );
};

ScrollsList.defaultProps = {
  animationDuration: 600,
  interval: null,
  size: 'default',
};

export default ScrollsList;
