import { Thread } from '@collabkit/react';
import { H2, H3 } from '../UIKit';
import { CodeEditor, renderCodeSnippet } from './CodeEditor';
import { DocDemoContainer } from './Doc';
import { ThemeEditor } from './ThemeEditor';

export function CustomisationDoc() {
  return (
    <div>
      <H2>Customise the look and feel of CollabKit to entirely match your apps UI.</H2>
      <H3>Built-in themes</H3>
      <p>
        CollabKit comes with two builtin themes. Light and Dark. Use these as a starting point for
        your own theme.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <DocDemoContainer>
          Light
          <div style={{ width: 320, height: 400 }}>
            <Thread threadId={'bar'}></Thread>
          </div>
        </DocDemoContainer>
        <DocDemoContainer>
          Dark
          <div style={{ width: 320, height: 400 }}>
            <Thread threadId={'foo'}></Thread>
          </div>
        </DocDemoContainer>
      </div>
      <H3>Custom themes</H3>
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
    </div>
  );
}
