import React, { ReactNode, useMemo } from 'react';
import styles from './index.less';
import useScroll from './_useScroll';

interface IReportTableProps extends React.HTMLAttributes<any> {
  columns: Array<{
    title?: ReactNode | string;
    dataIndex: string;
    key?: string;
    render?: (v: any, record: Record<string, any>, index: number) => ReactNode | string;
    align?: 'right' | 'center';
    width?: number | string;
  }>;
  dataSource?: Array<Record<string, any>>;
  rowKey?: string;
  animationDuration?: number;
}

export default function Table({
  columns,
  dataSource,
  rowKey,
  animationDuration,
  ...props
}: IReportTableProps) {
  const { ref, duration, scroll } = useScroll({ data: dataSource, animationDuration });

  const colgroup = useMemo(
    () => (
      <colgroup>
        {columns?.map?.(({ dataIndex, key, width }) => (
          <col key={`${key || dataIndex}`} style={{ width, minWidth: width }} />
        ))}
      </colgroup>
    ),
    [columns],
  );

  const scrollData = useMemo(
    () => (!scroll ? [dataSource] : [dataSource, dataSource]),
    [scroll, dataSource],
  );
  return (
    <div {...props}>
      <table className={styles.table}>
        {colgroup}
        <thead>
          <tr>
            {columns?.map?.(({ title, dataIndex, key, align }) => (
              <th key={key || dataIndex} align={align}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className={styles.wrapper} ref={ref}>
        <table className={styles.table}>
          {colgroup}
          {scrollData.map((d, index) => (
            <tbody
              key={String(index)}
              className={styles.content}
              style={{ animationDuration: duration }}
            >
              {d?.map?.((data, i) => (
                <tr key={rowKey ? (data?.[rowKey] as string) : String(i)}>
                  {columns?.map?.(({ dataIndex, render, align }) => (
                    <td key={`${rowKey ? data[rowKey] : i}-${dataIndex}`} align={align}>
                      {render ? render(data[dataIndex], data, i) : data[dataIndex] ?? '--'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
