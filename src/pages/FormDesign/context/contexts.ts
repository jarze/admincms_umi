import { createContext } from 'react'

export const DesignerEngineContext = createContext<any | undefined>(undefined)

export const PreviewComponentsContext = createContext({})

export const DocumentContext = createContext<undefined>(undefined)

export const NodeContext = createContext<any | undefined>(undefined)

export const LockContext = createContext<boolean | undefined>(undefined)
