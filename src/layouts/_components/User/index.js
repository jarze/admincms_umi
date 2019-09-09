import { Avatar } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import Link from 'umi/link';
import { items } from './_logic';
import { ModalForm } from '@components/comm';

const menu = (
	<Menu>
		<Menu.Item>
			<Link to='/user'><Icon type="user" />个人中心</Link>
		</Menu.Item>
		<Menu.Item>
			<ModalForm items={items} title="修改密码">
				<span><Icon type="user" />修改密码</span>
			</ModalForm>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item>
			<Link to='/logout'><Icon type="logout" />退出登录</Link>
		</Menu.Item>
	</Menu>
);

export default ({ user = {}, ...props }) => {
	return (
		<Dropdown
			overlay={menu}
			placement='bottomRight'
		>
			<div {...props}>
				<Avatar src={user.avatar} icon="user" />&nbsp;&nbsp;
			 {user.userName}
			</div>
		</Dropdown>
	);
}
