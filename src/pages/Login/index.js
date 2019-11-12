import { Button } from 'antd';
import { handleLogin } from '@utils/auth';

export default ({ location }) => {
	const toLogin = () => {
		handleLogin();
	}
	return <Button onClick={toLogin}>Login</Button>;
}