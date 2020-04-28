import { isLogin } from '@/utils/auth'
import Redirect from 'umi/redirect'

export default ({ location, children }) => {
  const inLogin = location.pathname === '/login'
  const login = isLogin()
  if (login) {
    return inLogin ? <Redirect to="/" /> : children
  } else {
    return !inLogin ? <Redirect to="/login" /> : children
  }
}
