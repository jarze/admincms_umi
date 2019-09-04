import React from 'react';
import { Spin } from 'antd'; // loading components from code split

const PageLoding = () => (
	<div
		style={{
			paddingTop: 100,
			textAlign: 'center',
		}}
	>
		<Spin size="large" />
	</div>
);

export default PageLoding;
