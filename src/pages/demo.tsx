import React from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'

export default () => {
  return <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
}
