
import React, {Fragment} from 'react';
import {Table, Form} from '@components/comm';

export default ({
  fmProps,
  tbProps
}) => {
  return (
    <Fragment>
      {fmProps&&<Form {...fmProps} />}
      {tbProps&&<Table {...tbProps} />}
    </Fragment>
  );
};