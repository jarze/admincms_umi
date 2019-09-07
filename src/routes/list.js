import useSearchTable from '@utils/useSearchTable';

export default (props) => {
  console.log(props, '---route list');
	return (
		<div>
			<div>PrivateRoute (routes/a.js)</div>
			{props.children}
		</div>
	);
}