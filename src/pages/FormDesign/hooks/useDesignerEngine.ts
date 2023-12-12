import { useContext } from 'react'
import { DesignerEngineContext } from '../context/contexts'

export const useDesignerEngine = () => {
  const designer = useContext<any | undefined>(DesignerEngineContext)
  return designer
}
