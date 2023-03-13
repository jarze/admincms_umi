import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';

import { oneDark } from '@codemirror/theme-one-dark';
import styles from './index.less';
import classnames from 'classnames';

interface CodeInterface extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange?: (value?: string) => void;
  value?: string;
  ID?: string;
  form?: any;
  readOnly?: boolean;
}

export default forwardRef<any, CodeInterface>(
  (
    { value, onChange, form, ID = 'cm-editor', readOnly = false, style, className, ...rest },
    ref,
  ) => {
    const editorRef = useRef<EditorView>(ref as any);

    useEffect(() => {
      editorRef.current = new EditorView({
        doc: value,
        extensions: [
          // oneDark,
          html(),
          // basicSetup 是一套插件集合，包含了很多常用插件
          basicSetup,
          EditorState.readOnly.of(readOnly),
        ],
        parent: document.querySelector(`#${ID}`)!,
      });

      return () => {
        editorRef?.current?.destroy?.();
      };
    }, []);

    useEffect(() => {
      editorRef?.current?.dispatch?.({
        changes: { from: 0, to: editorRef?.current?.state?.doc?.length, insert: value || '\n' },
      });
    }, [value]);

    return (
      <div
        onBlur={e => {
          const v = editorRef?.current?.state?.doc?.toString?.();
          if (value === v) return;
          onChange?.(v);
        }}
        className={classnames('ant-input', className, { [styles.editor]: !readOnly })}
        style={{
          width: 400,
          height: 'unset',
          fontSize: 14,
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
          verticalAlign: 'middle',
          ...style,
        }}
        {...rest}
        id={ID}
      />
    );
  },
);
