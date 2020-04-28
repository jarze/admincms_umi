/**
 * Routes:
 *   - ./src/routes/list.js
 */

import { Fragment } from 'react'
import { SearchList, ModalForm } from '@/components/comm'
import useSearchTable from '@/pages/_list/hooks/useSearchTable'
import useModalForm from '@/pages/_list/hooks/useModalForm'
import { connectList } from './_logic'

const ModalEdit = props => {
  const [modalProps] = useModalForm(props)
  return <ModalForm {...modalProps} />
}

export default connectList(props => {
  const { editConfig, actions, isPush = false } = props
  const [tbProps, fmProps, onItemAction] = useSearchTable(props)

  return (
    <Fragment>
      <SearchList fmProps={fmProps} tbProps={tbProps}>
        {actions && (
          <Fragment>
            <div>{actions(onItemAction, props)}</div>
            <br />
          </Fragment>
        )}
      </SearchList>
      {!isPush && editConfig && <ModalEdit {...props} />}
    </Fragment>
  )
})
