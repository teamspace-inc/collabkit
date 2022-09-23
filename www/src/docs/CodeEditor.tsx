import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { loader } from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import { transform, registerPlugin } from '@babel/standalone';
import CollabKitMonacoTheme from './CollabKitMonacoTheme.json';
import { nanoid } from 'nanoid';
import { useWindowSize } from '../hooks/useWindowSize';

import reactTypes from './react.types.d.ts?raw';

function plugin({ types: t }: { types: any }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path: any) {
        path.replaceWith(t.returnStatement(path.node.declaration));
      },
    },
  };
}

registerPlugin('plugin', plugin);

function parseCode(codeString: string) {
  try {
    const { code } = transform(codeString, {
      filename: 'index.tsx',
      presets: ['typescript', 'react'],
      plugins: ['plugin'],
    });
    return code;
  } catch (err) {
    console.error('Error parsing code: ', err);
    return '';
  }
}

export function renderCodeSnippet(code: string) {
  return (
    <CodeEditor
      readOnly={true}
      code={code}
      language={'typescript'}
      style={{ borderRadius: '6px', width: 'calc(100% - 40px)' }}
      scrollbar={false}
    />
  );
}

export function CodeEditor(props: {
  code: string;
  showPreview?: boolean;
  readOnly?: boolean;
  scrollbar: boolean;
  language?: 'typescript' | 'shell';
  style?: React.CSSProperties;
  lineHeight?: number;
  fontSize?: number;
}) {
  const fontSize = props.fontSize ?? 14;
  const lineHeight = props.lineHeight ?? 24;
  const language = props.language ?? 'typescript';
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);
  const [preview, setPreview] = useState(null);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [height, setHeight] = useState(24 * 24);
  const id = useRef(nanoid());

  const size = useWindowSize();

  const [codeString, setCodeString] = useState(props.code ?? ``);

  useLayoutEffect(() => {
    if (monacoRef.current === null) {
      loader.init().then((monaco: Monaco) => {
        monacoRef.current = monaco;

        const model = monaco.editor.createModel(
          codeString,
          language,
          monaco.Uri.parse(`file:///${nanoid()}/index${id}.tsx`)
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
            alwaysConsumeMouseWheel: false,
            handleMouseWheel: false,
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
          setCodeString(editor.getValue());
          console.log(editor.getModel().getLineCount());
        });

        if (language === 'typescript') {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            reactTypes,
            'file:///node_modules/react/index.d.ts'
          );
        }
        setMounted(true);
      });
    }
  }, [id]);

  useEffect(() => {
    // console.log(monacoRef.current);
    // monacoRef.current?.editor.layout();
  }, [size?.width, size?.height, mounted]);

  useEffect(() => {
    if (props.showPreview) {
      try {
        // eslint-disable-next-line
        const result = new Function(`React`, parseCode(codeString)!);
        setPreview(result(React));
      } catch (err) {
        console.error('Error compiling result: ', err);
      }
    }
  }, [codeString, props.showPreview]);

  // useEffect(() => {
  //   const monaco = monacoRef.current;
  //   if (monaco) {
  //     if (!focused) {
  //       // monaco.editor.setSelection(new monaco.Selection(0, 0, 0, 0));
  //     }
  //   }
  // }, [focused]);

  useEffect(() => {
    const numLines = editorRef.current?.getElementsByClassName('view-line').length;
    if (numLines && numLines > 0) {
      setHeight(numLines * lineHeight + 0);
    }
  }, [props.code.length, mounted]);

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        position: 'relative',
        display: 'grid',
        background: '#F8F8FF',
        borderRadius: 8,
        height,
        padding: '10px 0',
        gridTemplateColumns: props.showPreview ? '1fr 1fr' : '1fr',
        ...props.style,
      }}
    >
      <div ref={editorRef} style={{ height }} />
      {props.showPreview ? <div>{preview}</div> : null}
    </div>
  );
}
