import { useContext } from 'react'
import { PreviewComponentsContext } from '../context/contexts'

export function usePreviewComponents() {
  return useContext(PreviewComponentsContext)
}
