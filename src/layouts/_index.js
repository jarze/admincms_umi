import { useState } from "react";
import { BasicLayout as ProLayoutComponents } from '@ant-design/pro-layout';
import logo from '@assets/logo.svg';
import Link from 'umi/link';
import { connect } from 'dva';
import setting from './_defaultSetting';

// const menuDataRender = menuList => {
// 	console.log(menuList, '============');
// 	return menuList.map(item => {
// 		const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
// 		return localItem;
// 	});
// };

const BasicLayout = ({ children, route, menuRoute, ...restProps }) => {

	console.log(route);
	return (
		<ProLayoutComponents
			title='jarze'
			logo={logo}
			setting={setting}
			footerRender={() => null}
			menuItemRender={(menuItemProps, defaultDom) => {
				return <Link to={menuItemProps.path.toLowerCase()}>{defaultDom}</Link>;
			}}

			rightContentRender={() => 'rightContentRender'}
			//headerRender={() => 'headerRender'}
			//pageTitleRender={() => 'pageTitleRender'}
			route={menuRoute}
		>
			{children}
		</ProLayoutComponents>
	);
}


export default connect(({ global }) => ({
	...global
}))(BasicLayout);
