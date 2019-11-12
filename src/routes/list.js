import { useMemo, cloneElement } from 'react';

export default (props) => {
	const { match: { params } } = props;
	const logicParams = useMemo(() => {
		try {
			return require(`@/pages/_logic/list/${params.menuId}.js`);
		}
		catch (err) {
			//alert(err, '\n 请配置相关文件') // 可执行
		}
	}, [params.menuId]);

	return logicParams ? cloneElement(props.children, logicParams) : '请检查！！ 缺少相关配置文件';
}
