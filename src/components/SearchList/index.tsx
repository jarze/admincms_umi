import React from 'react'
import { Table } from 'antd'
import classnames from 'classnames'
import HandlerModalForm from '../HandlerModalForm'
import Form from '../comm/Form'
import TooltipTd from './TooltipTd'
import useSearchList from './_useSearchList'
import { ListPageConfig } from './type'
import styles from './index.less'

const components = { body: { cell: TooltipTd } }

function SearchList<T extends Record<string, any>>({ actions, ...props }: ListPageConfig<T>) {
  const { tableProps, modalFormProps, onItemAction, formProps, other } = useSearchList<T>(props)
  return (
    <>
      {props?.formConfig && (
        <>
          <Form {...formProps} />
          <br />
        </>
      )}
      {actions?.(onItemAction, other)}
      <Table
        components={props.tableConfig?.ellipsis && components}
        className={classnames(styles.table, { [styles.ellipsis]: props.tableConfig?.ellipsis })}
        {...tableProps}
      />
      {props?.editConfig && <HandlerModalForm {...modalFormProps} />}
    </>
  )
}

export default SearchList
