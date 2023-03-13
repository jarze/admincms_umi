import React, { useMemo } from 'react';
import styles from './index.less';
import useScroll from './_useScroll';
import classnames from 'classnames';

export interface ScrollListProps<T extends Record<string, any>> extends React.HTMLAttributes<any> {
  renderItem: (record: T, index: number) => React.ReactNode;
  data: Array<T>;
  animationDuration?: number;
}

export default function ScrollList<T extends Record<string, any>>({
  data,
  renderItem,
  animationDuration = 0,
  className,
  ...props
}: ScrollListProps<T>) {
  const { ref, duration, scroll } = useScroll({ data, animationDuration });

  const scrollData = useMemo(() => (!scroll ? [data] : [data, data]), [scroll, data]);
  return (
    <div className={classnames(styles.wrapper, className)} ref={ref} {...props}>
      {scrollData.map((d, index) => (
        <div key={String(index)} className={styles.content} style={{ animationDuration: duration }}>
          {d?.map?.((i, j) => (
            <div key={String(j)}>{renderItem(i, j)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
