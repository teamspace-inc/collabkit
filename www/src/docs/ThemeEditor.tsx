import { CodeEditor } from './CodeEditor';
import { useEffect, useState } from 'react';
import { themeCodeEditor, themeDemoContainer, themeEditorRoot } from '../styles/Docs.css';
import ExampleThemeRaw from './ExampleTheme.json?raw';
import { ThemeWrapper, ThemeProvider } from '@collabkit/react';
import { Theme } from 'packages/@collabkit/react/src/styles/theme';
import { ThreadDemo } from './demos/ThreadDemo';

export function ThemeEditor() {
  const [code, setCode] = useState(() => ExampleThemeRaw);
  const [theme, setTheme] = useState<Theme | null>({} as Theme);
  useEffect(() => {
    try {
      const newTheme = JSON.parse(code);
      setTheme(newTheme);
    } catch (e) {
      console.error(e);
    }
  }, [code]);

  return (
    <div className={themeEditorRoot}>
      <CodeEditor
        className={themeCodeEditor}
        language="json"
        code={code}
        scrollbar={true}
        onChange={setCode}
        fixedSize={true}
      />
      <ThemeProvider theme={theme ?? {}}>
        <ThemeWrapper>
          <ThreadDemo className={themeDemoContainer} />
        </ThemeWrapper>
      </ThemeProvider>
    </div>
  );
}
