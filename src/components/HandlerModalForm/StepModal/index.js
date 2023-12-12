import HandlerModalForm from '@components/HandlerModalForm'
import { useStep } from './_steps'

export default ({ data, children, steps, ...restProps }) => {
  const [props] = useStep({ data, steps, ...restProps })
  return <HandlerModalForm {...props}>{children}</HandlerModalForm>
}
