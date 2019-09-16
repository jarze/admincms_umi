/*
 * @Autor: jarze
 * @Date: 2019-09-05 15:13:25
 * @Desc: 基于antd Table的封装
 * 1.修改莫分页默认参数
 * 2.增加rowSelect提示框
 * API： 同antd Table API
 * 增加API： selectionShowKey 用于显示已选择项
 */

import { Table, Divider, Alert } from 'antd';

export const defaultPaginationConfig = {
	pageSizeOptions: ['10', '20', '30', '40'],
	showQuickJumper: true,
};

// 统一默认列表分页表现形式
export default ({ pagination, ...props }) => {

	let pg = pagination ? {
		...defaultPaginationConfig,
		onShowSizeChange: pagination.onShowSizeChange || pagination.onChange,
		...pagination,
	} : pagination;

	const { rowSelection } = props;

	const alert = rowSelection && (
		<div>
			<span>已选择 <b className='primary-click'>{rowSelection.selectedRowKeys.length} </b>项数据</span>
			<Divider type="vertical" />
			<span className='primary-click' onClick={() => rowSelection.onChange([])}>清空</span>
		</div>
	);

	return (
		<>
			{rowSelection &&
				<Alert
					showIcon={true}
					type='info'
					message={alert}
					style={{ marginBottom: '1em', overflow: 'hidden' }}
				/>
			}
			<Table
				rowKey={(_, index) => index}
				bordered={false}
				{...props}
				pagination={pg}
			/>
		</>
	);
};
