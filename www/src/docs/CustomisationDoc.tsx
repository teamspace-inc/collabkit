import { Thread } from '@collabkit/react';
import { H2 } from '../UIKit';
import { CodeEditor, renderCodeSnippet } from './CodeEditor';
import { DocDemoContainer } from './Doc';
import { ThemeEditor } from './ThemeEditor';

export function CustomisationDoc() {
  return (
    <div>
      <H2>Customise the look and feel of CollabKit to entirely match your apps UI.</H2>
      <p>
        CollabKit comes with two builtin themes. Light and Dark. Use these as a starting point for
        your own theme.
      </p>
      <DocDemoContainer>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '24px', color: 'white' }}>Built-in themes</span>
            <div style={{ width: 240, height: 320 }}>
              Light
              <Thread threadId={'bar'}></Thread>
            </div>
            <div style={{ width: 240, height: 320 }}>
              Dark
              <Thread threadId={'foo'}></Thread>
            </div>
          </div>
        </div>
      </DocDemoContainer>
      <p>
        Try editing this custom theme to see how you can customise CollabKit. Note theme variables
        are all type-safe making it easy to edit. You can adjust style variables to change colours,
        typography, spacing, padding, margins and more.
      </p>
      <ThemeEditor />
      <DocDemoContainer>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '24px', color: 'white' }}>Custom</span>
          <div style={{ width: 240, height: 320 }}>
            <Thread threadId={'foo2'}></Thread>
          </div>
        </div>
      </DocDemoContainer>
      <blockquote>
        Note: If you want to completely customise CollabKit, have a look at the @Advanced
        Customisation API. It makes it possible to consume, recombine and replace the individual
        components that make up a Thread, Popover Thread or Inbox. You can use it to create entirely
        new commenting or collaboration experiences.
      </blockquote>
      <h3>Demo</h3>
      <h3>Usage</h3>
      {renderCodeSnippet(`import type { CustomTheme } from '@collabkit/react';
import { Provider } from '@collabkit/react';

const theme: CustomTheme = {
	colors: {
    buttonPrimaryBackground: '#36B374',
  }
}

<Provider theme={theme} />`)}
    </div>
  );
}
