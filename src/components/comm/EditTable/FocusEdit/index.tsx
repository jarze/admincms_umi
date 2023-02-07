import React, { forwardRef, useMemo, useEffect, useRef } from 'react';
import { Table, Button } from 'antd';
import useFocusEdit from './useFocusEdit';
import classnames from 'classnames';
import { EditTableProps } from '../type';
import styles from './index.less';

export type FocusEditProps<T> = Omit<EditTableProps<T>, 'footer'> & {
  value?: Array<Partial<T>>;
  onChange?: (value?: Array<Partial<T>>) => void;
  footer?: (props: any) => React.ReactNode;
  itemAdd?: boolean;
  /** 额外columns */
  columnsExtra?: (
    ...params: Parameters<EditTableProps<T>['getColumns']>
  ) => EditTableProps<T>['columns'];
};

export default forwardRef<any, FocusEditProps<any>>(
  (
    {
      form,
      value,
      onChange,
      columns,
      editable = true,
      className,
      footer,
      itemAdd = false,
      columnsExtra,
      ...props
    },
    ref,
  ) => {
    const [tbProps, { handleAdd }] = useFocusEdit(
      useMemo(
        () => ({
          editable,
          onSave: onChange,
          form,
          dataSource: value,
          ...(editable
            ? {
                getColumns: params => [
                  ...columns,
                  ...(columnsExtra?.(params) || [
                    {
                      width: itemAdd ? 100 : 60,
                      disableEdit: true,
                      key: 'operation',
                      render: (_, r, index) => (
                        <>
                          {itemAdd && (
                            <Button
                              icon="plus"
                              tabIndex={-1}
                              type="primary"
                              ghost={true}
                              onClick={() => params.handleAdd?.(index)}
                            />
                          )}
                          <Button
                            icon="delete"
                            tabIndex={-1}
                            type="danger"
                            ghost={true}
                            onClick={() => params?.handleRemoveIndex?.(index)}
                          />
                        </>
                      ),
                    },
                  ]),
                ],
              }
            : { columns }),
          ...props,
        }),
        [value],
      ),
    );

    /** 比较内部数据变化 */
    const cacheRef = useRef<any>({ i: 0, o: 0 });

    useEffect(() => {
      cacheRef.current = { i: 0, o: 0 };
      cacheRef.current.i += 1;
    }, [value]);

    useEffect(() => {
      tbProps?.dataSource && (cacheRef.current.o += 1);
    }, [tbProps?.dataSource]);

    return (
      <div
        onMouseLeave={() => {
          if (cacheRef.current.i === cacheRef.current.o) return;
          // 保存数据
          onChange?.(tbProps.dataSource);
        }}
      >
        <Table
          ref={ref}
          pagination={false}
          className={classnames(className, styles.focusTable)}
          footer={
            footer
              ? () => (
                  <div className={styles.footer}>
                    {footer({ ...tbProps, onChange, editable, handleAdd })}
                  </div>
                )
              : editable
              ? () => (
                  <div className={styles.footer}>
                    <Button icon="plus" onClick={() => handleAdd(tbProps?.dataSource?.length)} />
                  </div>
                )
              : null
          }
          showHeader={tbProps?.dataSource?.length > 0}
          {...tbProps}
        />
      </div>
    );
  },
);
