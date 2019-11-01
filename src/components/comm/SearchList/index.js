import React, { Fragment } from 'react';
import { TableSelect, Form } from '@components/comm';

export default ({ fmProps, tbProps, children }) => {
  return (
    <Fragment>
      {fmProps && <Form {...fmProps} />}
      {children}
      {tbProps && <TableSelect {...tbProps} />}
    </Fragment>
  );
};
