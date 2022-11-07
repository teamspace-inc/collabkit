import { Thread, ThemeProvider } from '@collabkit/react';
import { docDemoOverlay } from '../styles/Docs.css';
import { DocDemoContainer, DocLink } from './Doc';

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
      <h2>Completely match your apps look and feel</h2>
      <div>
        <h3>Built-in themes</h3>
        <p>
          CollabKit comes with two builtin themes. <code>Light</code> and <code>Dark</code>. Use
          these by passing <code>light</code> or <code>dark</code> to the{' '}
          <code>{'<CollabKitProvider />'}</code>.
        </p>
      </div>
      <DocDemoContainer style={{ position: 'relative' }}>
        <ThemeProvider theme="light">
          <ThemeName>Light Theme</ThemeName>
          <div style={threadSize}>
            <Thread objectId={'object1'} autoFocus={false} />
          </div>
        </ThemeProvider>
      </DocDemoContainer>
      <DocDemoContainer style={{ position: 'relative' }}>
        <ThemeName>Dark Theme</ThemeName>
        <div style={threadSize}>
          <ThemeProvider theme="dark">
            <Thread objectId={'object1'} autoFocus={false} />
          </ThemeProvider>
        </div>
      </DocDemoContainer>
      <div>
        <h3>Custom themes</h3>
        <p>
          Use our <DocLink href="/theme-editor">Theme Editor</DocLink> to to match your apps look
          and feel entirely.
        </p>
        <p>
          You can change almost every aspect of CollabKit, including the fonts, colors, and spacing.
          Contact us if you'd like help with putting a custom theme together. We can assist you in
          creating one or create one for you.
        </p>
      </div>
      {/* <ThemeEditor /> */}
      {/* <blockquote>
        Note: If you want to completely customise CollabKit, have a look at the @Advanced
        Customisation API. It makes it possible to consume, recombine and replace the individual
        components that make up a Thread, Popover Thread or Inbox. You can use it to create entirely
        new commenting or collaboration experiences.
      </blockquote> */}
    </>
  );
}
