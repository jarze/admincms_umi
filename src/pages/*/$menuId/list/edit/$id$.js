/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'dva';
import { Spin } from 'antd';
import { Form } from '@components/comm';
import useEditForm from '@/pages/_list/hooks/useEditForm';
import { NS as NormalListModel } from '../model';

const Page = ({ loading, editConfig, NS, ...props }) => {
	const [{ fetchLoading, ...formProps }] = useEditForm(props, NS, editConfig, loading);
	return (
		<Spin spinning={fetchLoading}>
			<Form {...formProps} />
		</Spin>
	);
};

export default connect((sto, { NS = NormalListModel }) => ({
	...sto[NS],
	NS,
	loading: sto.loading.effects,
}))(Page);