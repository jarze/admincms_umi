import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Form } from 'antd';
import { validateMessages, handleColumn } from '../index';
import HoverInput from './HoverInput';
import { EditTableProps } from '../type';
import { TableProps } from 'antd/es/table';

// 表单包裹，form参数传递
const EditableContext = React.createContext({});

export const getEditableTableComponents = form => {
  const FormProviderTable = form
    ? props => (
        <EditableContext.Provider value={form}>
          <table {...props} />
        </EditableContext.Provider>
      )
    : Form.create({ validateMessages })(({ form, ...props }: any) => (
        <EditableContext.Provider value={form}>
          <table {...props} />
        </EditableContext.Provider>
      ));

  const FormCellConsumer = props => (
    <EditableContext.Consumer>
      {form => <HoverInput form={form} {...props} />}
    </EditableContext.Consumer>
  );
  return {
    table: FormProviderTable,
    body: {
      cell: FormCellConsumer,
    },
  };
};

function useFocusEdit<T extends Record<string, any>>({
  onSave,
  dataSource: data,
  form,
  columns: originColumns,
  getColumns,
  editable = true,
  rowKey = 'id',
  split = '-',
  title,
  ADD_ROW_KEY = 'FOCUS_ADD',
  ...rest
}: EditTableProps<T> & {
  onSave?: (dataSource: any, current?: any) => void;
}): [Partial<TableProps<T>>, any] {
  const [dataSource, setDataSource] = useState<Array<T>>();

  const addRowKeyRef = useRef(0);

  // 保存项
  const handleSave = useCallback((record, index, dataIndex) => {
    setDataSource(p => {
      p[index] = record;
      onSave?.(p, { record, index, dataIndex });
      return [...p];
    });
  }, []);

  useEffect(() => {
    const d = (data || []).map((i: any) => {
      if (!i[rowKey]) {
        // 添加编辑标记
        addRowKeyRef.current += 1;
        i[rowKey] = `${ADD_ROW_KEY}${addRowKeyRef.current}`;
      }
      return i;
    });
    setDataSource(d);
  }, [data]);

  const [isAdding, handleAdd, cancelAdd, handleRemove, handleRemoveIndex] = useMemo(
    () => [
      Boolean(dataSource?.find(i => i[rowKey]?.startsWith?.(ADD_ROW_KEY))),
      (index = 0, payload = {}) => {
        addRowKeyRef.current += 1;
        setDataSource(dd => {
          dd.splice(index + 1, 0, {
            [rowKey]: `${ADD_ROW_KEY}${addRowKeyRef.current}`,
            ...payload,
          } as T);
          return [...dd];
        });
      },
      () => {
        setDataSource([...dataSource?.filter?.(item => !item[rowKey]?.startsWith?.(ADD_ROW_KEY))]);
      },
      keys => {
        setDataSource([...dataSource?.filter?.(item => !(keys || [])?.includes?.(item[rowKey]))]);
      },
      index => {
        const dd = [...dataSource];
        dd.splice(index, 1);
        setDataSource([...dd]);
      },
    ],
    [dataSource],
  );

  // 处理格式化columns
  const columns = useMemo(() => {
    const columns =
      originColumns ||
      getColumns({
        form,
        cancelAdd,
        isAdding,
        handleAdd,
        handleRemove,
        handleRemoveIndex,
        dataSource,
      });
    return !editable ? columns : handleColumn(columns, { form, rowKey, split, handleSave });
  }, [originColumns, getColumns, editable, rowKey, split, dataSource]);

  const components = useMemo(() => {
    return form && editable ? getEditableTableComponents(form) : undefined;
  }, []);

  return [
    {
      dataSource,
      components,
      columns,
      rowKey,
      title: useMemo(
        () =>
          title
            ? currentPageData => title({ handleAdd, handleSave, isAdding, form }, currentPageData)
            : null,
        [dataSource],
      ),
      ...rest,
    },
    { setDataSource, handleAdd, cancelAdd, handleRemove, handleRemoveIndex },
  ];
}

export default useFocusEdit;
