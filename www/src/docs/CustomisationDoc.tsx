import { Thread, ThemeProvider } from '@collabkit/react';
import { docDemoOverlay } from '../styles/Docs.css';
import { DocDemoContainer } from './Doc';
import { ThemeEditor } from './ThemeEditor';

const threadSize = { width: 280, height: 320 };

function ThemeName(props: { children: React.ReactNode }) {
  return (
    <div
      className={docDemoOverlay}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
      }}
    >
      {props.children}
    </div>
  );
}
<div>
  <h3>Security</h3>
  <p>
    CollabKit supports two modes of operation, unsecured mode which is great for getting started,
    trying it out, and shipping to trusted environments like dev or staging. <br />
    <br />
    When you're ready to ship to production, make sure you turn on <b>Secured Mode</b> which
    requires fetching a per user token and passing it to <code>CollabKitProvider</code> on the
    client.
  </p>
</div>;
export function CustomisationDoc() {
  return (
    <>
      <h2>Completely match your apps look and feel.</h2>
      <div>
        <h3>Built-in themes</h3>
        <p>
          CollabKit comes with two builtin themes. <code>Light</code> and <code>Dark</code>. Use
          these by passing <code>light</code> or <code>dark</code> to the{' '}
          <code>{'<CollabKitProvider />'}</code>.
        </p>
      </div>
      <DocDemoContainer style={{ position: 'relative' }}>
        <ThemeName>Light Theme</ThemeName>
        <div style={threadSize}>
          <Thread threadId={'bar'} />
        </div>
      </DocDemoContainer>
      <DocDemoContainer style={{ position: 'relative' }}>
        <ThemeName>Dark Theme</ThemeName>
        <div style={threadSize}>
          <ThemeProvider theme="dark">
            <Thread threadId={'bar'} />
          </ThemeProvider>
        </div>
      </DocDemoContainer>
      <div>
        <h3>Custom themes</h3>
        <p>
          Try editing this custom theme to see how you can customise CollabKit. Note theme variables
          are all type-safe making it easy to edit. You can adjust style variables to change
          colours, typography, spacing, padding, margins and more.
        </p>
      </div>
      <ThemeEditor />
      {/* <blockquote>
        Note: If you want to completely customise CollabKit, have a look at the @Advanced
        Customisation API. It makes it possible to consume, recombine and replace the individual
        components that make up a Thread, Popover Thread or Inbox. You can use it to create entirely
        new commenting or collaboration experiences.
      </blockquote> */}
    </>
  );
}
