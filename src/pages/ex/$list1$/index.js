/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'dva';
import { SearchList } from '@components/comm';
import { columns, filterItems } from './_logic';
import useSearchTable from '@utils/hooks/useSearchTable';
import { NS } from './model';

const Page = ({
	loading,
	computedMatch: {
		params
	}, // 路由参数
	...props
}) => {
	const [tbProps, fmProps] = useSearchTable(props, NS, columns, filterItems, loading);

	const fp = {
		...fmProps,
		col: 24,
		layout: 'horizontal',
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
	}

	return (
		<>
			<span onClick={() => fmProps.onSubmit({ name: '---' })}>fefewsf</span>
			<SearchList
				fmProps={fp}
				tbProps={{
					...tbProps,
					rowKey: 'id',
					rowSelection: null
				}}
			/>
		</>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects
}))(Page);
