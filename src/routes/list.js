// import useSearchTable from '@utils/useSearchTable';
import { useMemo, cloneElement } from 'react';
import { Card } from 'antd';

export default (props) => {
	const { match: { params } } = props;
	const logicParams = useMemo(() => {
		try {
			return require(`@/pages/_logic/list/${params.menuId}.js`);
		}
		catch (err) {
			//alert(err, '\n 请配置相关文件') // 可执行
		}
	}, [params]);

	return (
		<Card>
			{cloneElement(props.children, logicParams)}
		</Card>
	);
	// return cloneElement(props.children, logicParams);
}
