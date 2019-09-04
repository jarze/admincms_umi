export default (props) => {
	console.log('routes: --', props);
	return (
		<div>
			<div>PrivateRoute (routes/b.js)</div>
			{props.children}
		</div>
	);
}
