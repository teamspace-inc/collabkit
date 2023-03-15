import React, { useRef, useState, useEffect, useId } from 'react';
import { useLayoutEffect } from '../hooks/useLayoutEffect';
import { loader } from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import { CollabKitMonacoTheme } from './CollabKitMonacoTheme';

import reactTypes from './react.types.d.ts?raw';
import collabKitTypes from './types.d.ts?raw';
import { useBreakpoint } from '../hooks/useWindowSize';
import { codeEditor, copyButton } from '../styles/docs/CodeEditor.css';
import Copy from 'phosphor-react/dist/icons/Copy.esm.js';
import Check from 'phosphor-react/dist/icons/Check.esm.js';
import { vars } from '../styles/Theme.css';
import { editor } from 'monaco-editor';
import { Tooltip, TooltipContent, TooltipTrigger } from '@collabkit/react';
import { CodeMetaContext } from './mdx/Pre';

function CopyButton({ codeString }: { codeString: string }) {
  const [didCopy, setDidCopy] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={copyButton}
          onClick={() => {
            navigator.clipboard.writeText(codeString);
            setDidCopy(true);
            setTimeout(() => {
              setDidCopy(false);
            }, 1000);
          }}
        >
          {didCopy ? (
            <>
              <Check color={vars.color.textContrastLow} />
              Copied
            </>
          ) : (
            <>
              <Copy color={vars.color.textContrastLow} />
              Copy
            </>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </Tooltip>
  );
}

export function CodeSnippet(props: { code: string; language?: 'typescript' | 'shell' | 'css' }) {
  const breakpoint = useBreakpoint();

  return (
    <CodeEditor
      readOnly={true}
      isSnippet={true}
      copyButton={true}
      code={props.code.trim()}
      language={props.language ?? 'typescript'}
      lineHeight={28}
      fontSize={13}
      style={{
        borderRadius: '6px',
        width: ['small', 'medium'].includes(breakpoint) ? 'auto' : 'calc(100% - 80px)',
      }}
      scrollbar={false}
    />
  );
}

export function renderCodeSnippet(
  code: string,
  props?: {
    language: 'typescript' | 'shell' | 'css';
    highlightLines?: string;
  }
) {
  return (
    <CodeMetaContext.Provider value={{ ...props }}>
      <CodeSnippet code={code} language={props?.language ?? 'typescript'} />
    </CodeMetaContext.Provider>
  );
}

export function CodeEditor({
  code,
  numLines = 40,
  fontSize = 13,
  lineHeight = 20,
  language = 'typescript',
  readOnly = false,
  scrollbar = true,
  copyButton = false,
  fixedSize = false,
  isSnippet = false,
  onChange,
}: {
  isSnippet?: boolean;
  code: string;
  readOnly?: boolean;
  scrollbar: boolean;
  copyButton?: boolean;
  fixedSize?: boolean;
  language?: 'typescript' | 'shell' | 'json' | 'css';
  style?: React.CSSProperties;
  lineHeight?: number;
  numLines?: number;
  className?: string;
  fontSize?: number;
  onChange?: (value: string) => void;
} & React.ComponentPropsWithoutRef<'div'>) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [codeString, setCodeString] = useState(() => code ?? ``);
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [didMount, setDidMount] = useState(false);
  const modelRef = useRef<editor.ITextModel | null>(null);
  const [didCalcSize, setDidCalcSize] = useState(false);
  const codeMetaContext = React.useContext(CodeMetaContext);

  const [height, setHeight] = useState<React.CSSProperties['height']>(() => lineHeight * numLines);
  const id = useId();

  useEffect(() => {
    if (monaco === null) {
      loader.init().then((monaco: Monaco) => {
        setMonaco(monaco);
      });
    }
  }, [monaco]);

  useEffect(() => {
    if (monaco) {
      const model =
        monaco.editor.getModel(monaco.Uri.parse(`file:///index${id}.tsx`)) ??
        monaco.editor.createModel('', language, monaco.Uri.parse(`file:///index${id}.tsx`));
      monaco.editor.defineTheme('collabkit', CollabKitMonacoTheme);

      modelRef.current = model;

      editorInstanceRef.current = monaco.editor.create(editorRef.current!, {
        model,
        fontSize,
        fontFamily:
          'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
        theme: 'collabkit',
        lineHeight,
        scrollBeyondLastLine: false,
        scrollbar: {
          verticalScrollbarSize: scrollbar === false ? 0 : 6,
          alwaysConsumeMouseWheel: scrollbar,
          handleMouseWheel: scrollbar,
        },
        minimap: {
          enabled: false,
        },
        useShadowDOM: true,
        folding: true,
        wordWrap: 'on',
        readOnly: readOnly,
        domReadOnly: readOnly,
        automaticLayout: true, // !props.fixedSize,
        renderLineHighlight: 'none',
        renderLineHighlightOnlyWhenFocus: true,
        suggest: {},
        lineNumbers: 'off',
        renderFinalNewline: false,
        codeLens: false,
        definitionLinkOpensInPeek: false,
        contextmenu: false,
      });

      if (readOnly) {
        const messageContribution = editorInstanceRef.current.getContribution(
          'editor.contrib.messageController'
        );
        editorInstanceRef.current.onDidAttemptReadOnlyEdit(() => {
          messageContribution?.dispose();
        });
      }

      if (language === 'typescript') {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          jsx: monaco.languages.typescript.JsxEmit.React,
        });

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });
      }

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current?.getValue();
        if (value) {
          setCodeString(value);
          onChange?.(value);
        }
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
      setDidMount(true);
    }
  }, [monaco, id]);

  useEffect(() => {
    if (modelRef.current && didMount) {
      modelRef.current.setValue(code);
    }
  }, [didMount]);

  useEffect(() => {
    const editor = editorInstanceRef.current;
    if (codeMetaContext.highlightLines && didMount && editor && monaco) {
      const decorations = JSON.parse(codeMetaContext.highlightLines).map(
        (line: [number, number]) => ({
          range: new monaco.Range(line[0], 1, line[1], 1),
          options: {
            isWholeLine: true,
            marginClassName: 'highlight',
            className: 'lineHighlight',
          },
        })
      );
      editor.deltaDecorations([], decorations);
    }
  }, [monaco, codeMetaContext.highlightLines, didMount]);

  useEffect(() => {
    if (modelRef.current && didMount) {
      window.requestAnimationFrame(() => {
        if (fixedSize) {
          setDidCalcSize(true);
        } else {
          const numLines = editorRef.current?.getElementsByClassName('view-line').length;
          if (numLines && numLines > 0) {
            setHeight(numLines * lineHeight);
            setDidCalcSize(true);
          }
        }
      });
    }
  }, [didMount, fixedSize]);

  const breakpoint = useBreakpoint();

  return (
    <div
      className={`${codeEditor({ didMount: didCalcSize, isSnippet })} CodeEditor`}
      style={{
        ...(fixedSize
          ? { height: '100%' }
          : { height: typeof height === 'number' ? height + 32 : height }),
        ['--vscode-editor-background' as any]: 'blue',
      }}
    >
      {copyButton && !['small', 'medium'].includes(breakpoint) ? (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <CopyButton codeString={codeString} />
        </div>
      ) : null}
      <div ref={editorRef} style={{ ...(fixedSize ? { height: '100%' } : { height }) }} />
    </div>
  );
}
