import React, { Fragment, ReactChild } from 'react'
import TableSelect, { BaseTableProps } from '../TableSelect'
import Form, { BaseFormProps } from '../Form'
export interface SearchListProps<T> {
  fmProps?: BaseFormProps
  tbProps?: BaseTableProps<T>
  children?: ReactChild
}

export default ({ fmProps, tbProps, children }: SearchListProps<any>) => {
  return (
    <Fragment>
      {fmProps && <Form {...fmProps} />}
      {children}
      <div style={{ clear: 'both' }} />
      {tbProps && <TableSelect {...tbProps} />}
    </Fragment>
  )
}
