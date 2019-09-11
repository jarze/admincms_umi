// import useSearchTable from '@utils/useSearchTable';
import { useMemo, cloneElement } from 'react';

export default (props) => {
	const { match: { params } } = props;
	const logicParams = useMemo(() => {
		return require(`@/pages/_logic/list/${params.modelId}.js`);
	}, [params]);

	return cloneElement(props.children, logicParams);
}
