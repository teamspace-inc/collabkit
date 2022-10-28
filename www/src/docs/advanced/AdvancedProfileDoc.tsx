import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';

export function AdvancedProfileDoc() {
  return (
    <>
      <h2>Render a Profile, or one of its parts</h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Advanced</h4>
        This doc covers how to render an individual Profile. In most cases you'll want to use a
        higher level component like <DocLink href="/docs/components/thread">Thread</DocLink> or{' '}
        <DocLink href="/docs/components/popoverthread">PopoverThread</DocLink> directly.
      </blockquote>

      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { Profile } from '@collabkit/react';

export const SomeComponent() {
  return <Profile.Provider profileId="replace-with-profile-id">
    <Profile.Avatar />
    <Profile.Name />
  </Profile.Provider>
}`)}
      </div>
      <div>
        <h3>Styling</h3>
        <p>
          CollabKit styles are applied by default. Including any customisation defined in your
          theme. <br />
          To override the default styles, you can pass a <code>className</code> prop to desired
          component.
        </p>
      </div>
    </>
  );
}
