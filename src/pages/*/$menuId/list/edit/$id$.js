/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'dva';
import { NS } from '../model';
import { Spin } from 'antd';
import { Form } from '@components/comm';
import useEditForm from '@/pages/_hooks/useEditForm';

const Page = ({ loading, editConfig, ...props }) => {
	const [{ fetchLoading, ...formProps }] = useEditForm(props, NS, editConfig, loading);
	return (
		<Spin spinning={fetchLoading}>
			<Form {...formProps} />
		</Spin>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects,
}))(Page);