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

const Page = (props) => {
	const [{ fetchLoading, ...formProps }] = useEditForm(props);
	return (
		<Spin spinning={fetchLoading}>
			<Form {...formProps} />
		</Spin>
	);
};

export default connect((sto, { NS = NormalListModel }) => ({
	...sto[NS],
	NS,
	loadingEffects: sto.loading.effects,
}))(Page);