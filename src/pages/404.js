import notFoundImg from '@assets/404.svg';
import { Result, Button } from 'antd';
import Link from 'umi/link';

export default () => {
	return (
		<Result
			icon={<img src={notFoundImg} alt='404' />}
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={<Button type="primary"><Link to='/'>Back Home</Link></Button>}
		/>
	);
};
