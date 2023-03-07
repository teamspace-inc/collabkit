import { CodeEditor } from './CodeEditor';
import { useEffect, useState } from 'react';
import ExampleThemeRaw from './ExampleTheme.json?raw';
import { ThemeWrapper, ThemeProvider, Themes } from '@collabkit/react';
import { Catch } from '@collabkit/react';
import { proxy, useSnapshot } from 'valtio';

import { codeEditor } from '../styles/ThemeEditor.css';
import { docs } from '../styles/docs/Docs.css';

const themeStore = proxy({
  theme: Themes.DarkTheme,
});

type Props = {
  children: React.ReactNode;
};

const EditorErrorBoundary = Catch(function MyErrorBoundary(props: Props, error?: Error) {
  if (error) {
    return (
      <div className="error-screen">
        <h2>An error has occured</h2>
        <h4>{error.message}</h4>
      </div>
    );
  } else {
    return <>{props.children}</>;
  }
});

export function ApplyTheme({ children }: { children: React.ReactNode }) {
  const { theme } = useSnapshot(themeStore);

  return (
    <EditorErrorBoundary>
      <ThemeProvider theme={theme}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </ThemeProvider>
    </EditorErrorBoundary>
  );
}

export function ThemeEditor(props: React.ComponentPropsWithoutRef<'div'>) {
  const [code, setCode] = useState(() => ExampleThemeRaw);
  useEffect(() => {
    try {
      const newTheme = JSON.parse(code);
      themeStore.theme = newTheme;
    } catch (e) {
      console.error(e);
    }
  }, [code]);

  return (
    <div {...props} className={docs}>
      <CodeEditor
        fontSize={12}
        className={codeEditor}
        language="json"
        code={code}
        scrollbar={true}
        onChange={(code) => (typeof code === 'string' ? setCode(code) : null)}
        fixedSize={true}
      />
    </div>
  );
}
