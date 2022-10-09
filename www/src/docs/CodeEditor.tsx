import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { loader } from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import CollabKitMonacoTheme from './CollabKitMonacoTheme.json';
import { nanoid } from 'nanoid';

import reactTypes from './react.types.d.ts?raw';
import collabKitTypes from './types.d.ts?raw';
import { useBreakpoint } from '../hooks/useWindowSize';
import { codeEditor } from '../styles/Docs.css';

export function CodeSnippet(props: { code: string; language?: 'typescript' | 'shell' }) {
  const breakpoint = useBreakpoint();

  return (
    <CodeEditor
      readOnly={true}
      code={props.code}
      language={props.language ?? 'typescript'}
      style={{
        borderRadius: '6px',
        width: ['small', 'medium'].includes(breakpoint) ? 'auto' : 'calc(100% - 80px)',
      }}
      scrollbar={false}
    />
  );
}

export function renderCodeSnippet(code: string, language: 'typescript' | 'shell' = 'typescript') {
  return <CodeSnippet code={code} language={language} />;
}

export function CodeEditor(props: {
  code: string;
  readOnly?: boolean;
  scrollbar: boolean;
  fixedSize?: boolean;
  language?: 'typescript' | 'shell' | 'json';
  style?: React.CSSProperties;
  lineHeight?: number;
  numLines?: number;
  className?: string;
  fontSize?: number;
  onChange?: (value: string) => void;
}) {
  const numLines = props.numLines ?? 40;
  const fontSize = props.fontSize ?? 14;
  const lineHeight = props.lineHeight ?? 24;
  const language = props.language ?? 'typescript';
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);
  const editorInstanceRef = useRef<any>(null);
  const [codeString, setCodeString] = useState(() => props.code ?? ``);
  const [didMount, setDidMount] = useState(false);

  const [height, setHeight] = useState(() => lineHeight * numLines);
  const id = useState(() => nanoid());

  useLayoutEffect(() => {
    if (monacoRef.current === null) {
      loader.init().then((monaco: Monaco) => {
        monacoRef.current = monaco;

        const model = monaco.editor.createModel(
          props.code ?? '',
          language,
          monaco.Uri.parse(`file:///index${id}.tsx`)
        );

        monaco.editor.defineTheme('collabkit', CollabKitMonacoTheme);

        editorInstanceRef.current = monaco.editor.create(editorRef.current, {
          model,
          fontSize,
          fontFamily: 'Monaco',
          theme: 'collabkit',
          lineHeight,
          scrollBeyondLastLine: false,
          scrollbar: {
            verticalScrollbarSize: props.scrollbar === false ? 0 : 6,
            alwaysConsumeMouseWheel: props.scrollbar,
            handleMouseWheel: props.scrollbar,
          },
          minimap: {
            enabled: false,
          },
          useShadowDOM: true,
          wordWrap: 'on',
          readOnly: props.readOnly ?? false,
          domReadOnly: props.readOnly ?? false,
          automaticLayout: true, // !props.fixedSize,
          renderLineHighlight: false,
          renderLineHighlightOnlyWhenFocus: true,
          suggest: {},
          lineNumbers: false,
          renderFinalNewLine: false,
          codeLens: false,
          definitionLinkOpensInPeek: false,
          contextmenu: false,
        });

        if (props.readOnly) {
          const messageContribution = editorInstanceRef.current.getContribution(
            'editor.contrib.messageController'
          );
          editorInstanceRef.current.onDidAttemptReadOnlyEdit(() => {
            messageContribution.dispose();
          });
        }

        if (language === 'typescript') {
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: 'react',
          });

          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
          });
        }

        editorInstanceRef.current.onDidChangeModelContent(() => {
          const value = editorInstanceRef.current.getValue();
          setCodeString(value);
          props.onChange?.(value);
        });

        if (language === 'typescript') {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            reactTypes,
            'file:///node_modules/react/index.d.ts'
          );
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            collabKitTypes,
            'file:///node_modules/@collabkit/react/index.d.ts'
          );
        }
      });
    }

    // hack replace this...
    setTimeout(() => setDidMount(true), 0);
    setTimeout(() => setDidMount(false), 100);
    setTimeout(() => setDidMount(true), 1000);
  }, [props.code, id]);

  useEffect(() => {
    if (!props.fixedSize) {
      const numLines = editorRef.current?.getElementsByClassName('view-line').length;
      if (numLines && numLines > 0) {
        setHeight(numLines * lineHeight);
      }
    }
  }, [props.fixedSize, codeString.length, id, didMount]);

  return (
    <div
      className={props.className ?? codeEditor}
      style={{
        ...(props.fixedSize ? {} : { height }),
      }}
    >
      <div ref={editorRef} style={{ ...(props.fixedSize ? {} : { height }) }} />
    </div>
  );
}
