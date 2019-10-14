
import React, { Fragment } from 'react';
import { Table, Form } from '@components/comm';

export default ({
	fmProps,
	tbProps,
	children
}) => {
	return (
		<Fragment>
			{fmProps && <Form {...fmProps} />}
			{children}
			{tbProps && <Table {...tbProps} />}
		</Fragment>
	);
};