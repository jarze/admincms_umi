/**
 * Routes:
 *   - ./src/routes/list.js
 */

import { Spin } from 'antd'
import { Form } from '@/components/comm'
import useEditForm from '@/pages/_list/hooks/useEditForm'
import { connectList } from '../_logic'

export default connectList(props => {
  const [{ fetchLoading, ...formProps }] = useEditForm(props)
  return (
    <Spin spinning={fetchLoading}>
      <Form {...formProps} />
    </Spin>
  )
})
