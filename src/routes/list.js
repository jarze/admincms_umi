// import useSearchTable from '@utils/useSearchTable';
import { useMemo, cloneElement } from 'react';
import { Card } from 'antd';

export default (props) => {
	const { match: { params } } = props;
	const logicParams = useMemo(() => {
		return require(`@/pages/_logic/list/${params.modelId}.js`);
	}, [params]);

	return (
		<Card>
			{cloneElement(props.children, logicParams)}
		</Card>
	);
	// return cloneElement(props.children, logicParams);
}
