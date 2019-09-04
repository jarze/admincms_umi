import notFoundImg from '@assets/404.svg';
import { Icon } from 'antd';
import Link from 'umi/link';

export default () => {
	return (
		<div style={{ textAlign: 'center', margin: '5%' }}>
			<h1><Link to='/'><Icon type="arrow-left" /></Link></h1>
			<img src={notFoundImg} alt="404" style={{ margin: '10%' }} />
		</div>
	);
};
