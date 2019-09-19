/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'dva';
import { NS } from '../model';
import { Form } from '@components/comm';
import useEditForm from '@/pages/_hooks/useEditForm';

const Page = ({
	loading,
	editConfig,
	...props
}) => {
	const [formProps] = useEditForm(props, NS, editConfig, loading);
	return <Form {...formProps} />;
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.global
}))(Page);
