import React from 'react'

export default ({ content }) => {
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
