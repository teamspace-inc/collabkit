import { Thread } from '@collabkit/react';
import { H2, H3 } from '../UIKit';
import { DocDemoContainer } from './Doc';
import { ThemeEditor } from './ThemeEditor';

const threadSize = { width: 320, height: 440 };

export function CustomisationDoc() {
  return (
    <>
      <H2>Customise the look and feel of CollabKit to entirely match your apps UI.</H2>
      <div>
        <H3>Built-in themes</H3>
        <p>
          CollabKit comes with two builtin themes. Light and Dark. Use these as a starting point for
          your own theme.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <DocDemoContainer style={{ position: 'relative' }}>
          <div
            style={{
              fontSize: 12,
              padding: 20,
              fontWeight: '700',
              color: 'rgba(255,255,255,0.75)',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            Light
          </div>
          <div style={threadSize}>
            <Thread threadId={'bar'} />
          </div>
        </DocDemoContainer>
        <DocDemoContainer style={{ position: 'relative' }}>
          <div
            style={{
              fontSize: 12,
              padding: 20,
              fontWeight: '700',
              color: 'rgba(255,255,255,0.75)',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            Dark
          </div>
          <div style={threadSize}>
            <Thread threadId={'foo'} />
          </div>
        </DocDemoContainer>
      </div>
      <div>
        <H3>Custom themes</H3>
        <p>
          Try editing this custom theme to see how you can customise CollabKit. Note theme variables
          are all type-safe making it easy to edit. You can adjust style variables to change
          colours, typography, spacing, padding, margins and more.
        </p>
      </div>
      <ThemeEditor />
      <blockquote>
        Note: If you want to completely customise CollabKit, have a look at the @Advanced
        Customisation API. It makes it possible to consume, recombine and replace the individual
        components that make up a Thread, Popover Thread or Inbox. You can use it to create entirely
        new commenting or collaboration experiences.
      </blockquote>
    </>
  );
}
