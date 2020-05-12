import notFoundImg from '@/assets/404.svg'
import { Result } from 'antd'

export default ({ children }) => {
  return (
    <Result icon={<img src={notFoundImg} alt="404" />} title="403" subTitle="Sorry, you are not authorized to access this page." extra={children} />
  )
}
