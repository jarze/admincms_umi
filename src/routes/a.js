export default (props) => {
	console.log('routes: --', props);
	return (
		<div>
			<div>PrivateRoute (routes/a.js)</div>
			{props.children}
		</div>
	);
}
