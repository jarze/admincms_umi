// import useSearchTable from '@utils/useSearchTable';
import { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'umi/link';

export default (props) => {
	const { match: { params }, location: { pathname } } = props;

	console.log(props);

	return (
		<Fragment>
			<Button><Link to={`${pathname}/add`}>添加</Link></Button>
			{props.children}
		</Fragment>
	);
}
