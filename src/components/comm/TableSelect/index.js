/*
 * @Autor: jarze
 * @Date: 2019-09-05 15:13:25
 * @Desc: 基于antd Table的封装
 * 1.修改莫分页默认参数
 * 2.增加rowSelect提示框
 * API： 同antd Table API
 * 增加API：
 * selectAlert: {
 * selectionShowKey | string | 可选 | 用于显示已选择项
 * extraContent | (props: selectedRowKeys, listProps) => React.ReactElement | 可选 | 用与显示selectRow更多操作
 * }
 */

import { Table } from 'antd';
import TbAlert from '../TbAlert';
export const defaultPaginationConfig = {
  pageSizeOptions: ['50', '100', '150'],
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共 ${total} 条`,
};

// 统一默认列表分页表现形式
export default ({ pagination, selectAlert = {}, ...props }) => {
  let pg = pagination
    ? {
        ...defaultPaginationConfig,
        onShowSizeChange: pagination.onShowSizeChange || pagination.onChange,
        ...pagination,
      }
    : pagination;

  const { rowSelection } = props;
  const { extraContent, hide } = selectAlert;

  return (
    <>
      {rowSelection && !hide && (
        <TbAlert rowSelection={rowSelection}>
          {extraContent && extraContent(rowSelection.selectedRowKeys, props)}
        </TbAlert>
      )}
      <Table
        rowKey={(_, index) => index}
        bordered={false}
        size="middle"
        {...props}
        pagination={pg}
      />
    </>
  );
};
