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

	// 配置权限校验
	const hasConfig = Object.values({ ...logicParams }).filter(item => !!item).length > 0;

	return hasConfig ? cloneElement(props.children, logicParams) : '请检查！！ 缺少相关配置文件';
}
