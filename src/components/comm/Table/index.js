/*
 * @Autor: jarze
 * @Date: 2019-09-05 15:13:25
 * @Desc: 基于antd Table的封装
 * 1.修改莫分页默认参数
 * 2.增加rowSelect提示框
 * API： 同antd Table API
 * 增加API： selectionShowKey 用于显示已选择项
 */

import { Table } from 'antd';
import Alert from './AlertSelect';

export const defaultPaginationConfig = {
	pageSizeOptions: ['10', '20', '30', '40'],
	showQuickJumper: true,
};

// 统一默认列表分页表现形式
export default ({ pagination, ...props }) => {
	if (!pagination) return <Table {...{ pagination, ...props }} />;

	let pg = {
		...defaultPaginationConfig,
		onShowSizeChange: pagination.onShowSizeChange || pagination.onChange,
		...pagination,
	};

	return (
		<>
			{props.rowSelection && <Alert {...props.rowSelection} {...props} />}
			<Table
				rowKey={(_, index) => index}
				bordered={false}
				{...props}
				pagination={pg}
			/>
		</>
	);
};
