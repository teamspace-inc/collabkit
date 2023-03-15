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
            <Check color={vars.color.textContrastLow} />
          ) : (
            <Copy color={vars.color.textContrastLow} />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </Tooltip>
  );
}

export function CodeSnippet(props: {
  code: string;
  language?: 'typescript' | 'shell' | 'css';
  hideRanges?: [start: number, end: number][];
}) {
  const breakpoint = useBreakpoint();

  return (
    <CodeEditor
      readOnly={true}
      isSnippet={true}
      copyButton={true}
      hideRanges={props.hideRanges}
      code={props.code.trim()}
      language={props.language ?? 'typescript'}
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
  hideRanges?: [start: number, end: number][],
  language: 'typescript' | 'shell' | 'css' = 'typescript'
) {
  return <CodeSnippet code={code} language={language} hideRanges={hideRanges} />;
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
  hideRanges,
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
  hideRanges?: [start: number, end: number][];
  onChange?: (value: string) => void;
} & React.ComponentPropsWithoutRef<'div'>) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [codeString, setCodeString] = useState(() => code ?? ``);
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [didMount, setDidMount] = useState(false);
  const modelRef = useRef<editor.ITextModel | null>(null);
  const [didCalcSize, setDidCalcSize] = useState(false);

  const [height, setHeight] = useState<React.CSSProperties['height']>(() => lineHeight * numLines);
  const id = useId();

  useEffect(() => {
    if (monaco === null) {
      loader.init().then((monaco: Monaco) => {
        setMonaco(monaco);
      });
    }
  }, []);

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
        fontFamily: 'Monaco, monospace',
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
          messageContribution.dispose();
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
        const value = editorInstanceRef.current.getValue();
        setCodeString(value);
        onChange?.(value);
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
    if (!monaco) return;
    hideRanges &&
      editorInstanceRef.current?.setHiddenAreas(
        hideRanges.map(([start, end]) => new monaco.Range(start, 1, end, 1))
      );
  }, [monaco, hideRanges, didMount]);

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
      className={codeEditor({ didMount: didCalcSize, isSnippet })}
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
            top: 13,
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
