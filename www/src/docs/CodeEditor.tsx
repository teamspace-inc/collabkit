import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { loader } from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import CollabKitMonacoTheme from './CollabKitMonacoTheme.json';
import { nanoid } from 'nanoid';

import reactTypes from './react.types.d.ts?raw';
import collabKitTypes from './types.d.ts?raw';

export function renderCodeSnippet(code: string, language: 'typescript' | 'shell' = 'typescript') {
  return (
    <CodeEditor
      readOnly={true}
      code={code}
      language={language}
      style={{ borderRadius: '6px', width: 'calc(100% - 80px)' }}
      scrollbar={false}
    />
  );
}

export function CodeEditor(props: {
  code: string;
  readOnly?: boolean;
  scrollbar: boolean;
  language?: 'typescript' | 'shell';
  style?: React.CSSProperties;
  lineHeight?: number;
  numLines?: number;
  fontSize?: number;
  onChange?: (value: string) => void;
}) {
  const numLines = props.numLines ?? 24;
  const fontSize = props.fontSize ?? 14;
  const lineHeight = props.lineHeight ?? 24;
  const language = props.language ?? 'typescript';
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);
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

        const editor = monaco.editor.create(editorRef.current, {
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
          automaticLayout: true,
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
          const messageContribution = editor.getContribution('editor.contrib.messageController');
          editor.onDidAttemptReadOnlyEdit(() => {
            messageContribution.closeMessage();
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

        editor.onDidChangeModelContent(() => {
          const value = editor.getValue();
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
    const numLines = editorRef.current?.getElementsByClassName('view-line').length;
    if (numLines && numLines > 0) {
      setHeight(numLines * lineHeight);
    }
  }, [codeString.length, id, didMount]);

  return (
    <>
      <style>
        {`
.mtk42 {
color: #FFEC6B;
}

.mtk6 {
color: violet;
font-style: normal;
font-weight: normal !important;
}

.mtk1 {
  color: red;
}

.mtk39 {
color: #9FEFD7;
}

.mtk16 {
color: white;
}

.monaco-editor .cldr.codicon.codicon-folding-expanded, .monaco-editor .cldr.codicon.codicon-folding-collapsed {
color: #999999 !important;
}

    `}
      </style>
      <div
        style={{
          position: 'relative',
          display: 'grid',
          background: '#2B2B2B',
          borderRadius: 8,
          height,
          padding: '40px 40px',
          gridTemplateColumns: '1fr',
          ...props.style,
        }}
      >
        <div ref={editorRef} style={{ height }} />
      </div>
    </>
  );
}
