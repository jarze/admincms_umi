import { BasicLayout as ProLayoutComponents, PageHeaderWrapper } from '@ant-design/pro-layout';
import User from './_components/User';
import logo from '@assets/logo.svg';
import Link from 'umi/link';
import { connect } from 'dva';

const BasicLayout = ({ children, menuRoute, user, ...restProps }) => {

	const rightContent = <User user={user} style={{ float: 'right', margin: '0 2em' }} />;
	const { breadcrumb } = restProps.location.query;
	return (
		<ProLayoutComponents
			title='CMS'
			logo={logo}
			fixSiderbar={true}
			footerRender={() => null}
			menuItemRender={(menuItemProps, defaultDom) => {
				return <Link to={menuItemProps.path.toLowerCase()}>{defaultDom}</Link>;
			}}
			rightContentRender={() => rightContent}
			breadcrumbRender={(routers = []) => (breadcrumb ? [...routers, { breadcrumbName: breadcrumb }] : routers)}
			itemRender={route => {
				return route.path ? (
					<Link to={route.path}>{route.breadcrumbName}</Link>
				) : (
						route.breadcrumbName
					);
			}}
			{...restProps}
			route={menuRoute}
		>
			<PageHeaderWrapper title={false} onBack={() => window.history.back()}>
				{children}
			</PageHeaderWrapper>
		</ProLayoutComponents>
	);
}


export default connect(({ global }) => ({
	...global
}))(BasicLayout);
