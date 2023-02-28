import { CodeEditor } from './CodeEditor';
import { useEffect, useState } from 'react';
import { docs, themeDemoContainer } from '../styles/docs/Docs.css';
import ExampleThemeRaw from './ExampleTheme.json?raw';
import { ThemeWrapper, ThemeProvider, CustomTheme } from '@collabkit/react';

import { ThreadDemo } from './demos/ThreadDemo';
import { InboxDemo } from './demos/InboxDemo';
import { InboxButtonDemo } from './demos/InboxButtonDemo';

import { dark } from '../styles/Theme.css';
import { bg } from '../styles/Website.css';
import { LogoImg } from '../Logo';

import {
  codeEditor,
  componentList,
  componentListItem,
  editorAndPreview,
  header,
  root,
} from '../styles/ThemeEditor.css';

import { SidebarCommentsDemo } from './demos/SidebarDemo';
import { Link } from 'wouter';

const components = [
  { name: 'Thread', component: ThreadDemo },
  { name: 'Inbox', component: InboxDemo },
  { name: 'InboxButton', component: InboxButtonDemo },
  { name: 'Sidebar', component: SidebarCommentsDemo },
];

export function ThemeEditor() {
  const [code, setCode] = useState(() => ExampleThemeRaw);
  const [theme, setTheme] = useState<CustomTheme | null>({} as CustomTheme);
  const [component, setComponent] = useState<keyof typeof components>(
    'Thread' as keyof typeof components
  );

  useEffect(() => {
    try {
      const newTheme = JSON.parse(code);
      setTheme(newTheme);
    } catch (e) {
      console.error(e);
    }
  }, [code]);

  const activeComponent = components.find((c) => c.name === component);

  return (
    <div className={`${docs} ${dark} ${bg} ${root}`}>
      <div className={header}>
        <Link href="/docs/core/themes">
          <LogoImg theme="dark" />
        </Link>
        <div className={componentList}>
          Theme Editor
          {components.map((c) => (
            <div
              onClick={() => setComponent(c.name as keyof typeof components)}
              className={componentListItem({ active: component === c.name })}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
      <div className={editorAndPreview}>
        <CodeEditor
          className={codeEditor}
          language="json"
          code={code}
          scrollbar={true}
          onChange={setCode}
          fixedSize={true}
        />
        <ThemeProvider theme={theme ?? {}}>
          <ThemeWrapper>
            {activeComponent?.component({ className: themeDemoContainer })}
          </ThemeWrapper>
        </ThemeProvider>
      </div>
    </div>
  );
}
