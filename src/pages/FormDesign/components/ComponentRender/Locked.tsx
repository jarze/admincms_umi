import React, { memo } from 'react'
import { LockContext } from '../../context/contexts'

export const Locked = memo((props: { lock: boolean; children?: React.ReactNode }) => {
  const { lock, children } = props
  return lock ? (
    <LockContext.Provider value={lock}>{children}</LockContext.Provider>
  ) : (
    <>{children}</>
  )
})
