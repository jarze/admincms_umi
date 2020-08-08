/**
 * Routes:
 *   - ./src/routes/auth.js
 */

import { Button } from 'antd'
import { handleLogin } from '@/utils/auth'

export default ({ location }) => {
  return <Button onClick={handleLogin}>Login</Button>
}
