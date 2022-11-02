import { Profile, ThemeProvider, ThemeWrapper } from '@collabkit/react';
import { renderCodeSnippet } from '../../CodeEditor';
import { DocDemoContainer, DocLink } from '../../Doc';
import Anatomy from './ProfileAnatomyCodeExample.tsx?raw';
import AnatomyName from './ProfileAnatomyNameCodeExample.tsx?raw';
import AnatomyAvatar from './ProfileAnatomyAvatarCodeExample.tsx?raw';

import Usage from './ProfileUsageCodeExample.tsx?raw';

const Spacer24 = <div style={{ height: 24 }} />;

export function ProfileDoc() {
  return (
    <>
      <h2>Render a users profile, their avatar or name.</h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Advanced</h4>
        This doc covers how to render an individual Profile. In most cases you'll want to use a
        higher level component like <DocLink href="/docs/components/thread">Thread</DocLink> or{' '}
        <DocLink href="/docs/components/popoverthread">PopoverThread</DocLink> directly.
      </blockquote>

      <div>
        <h3>Demo</h3>
        <DocDemoContainer style={{ padding: 40 }}>
          <Profile profileId="ville" />
        </DocDemoContainer>
      </div>

      <div>
        <h3>Usage</h3>
        <p>Renders a Profile. The most basic usage is: </p>
        {renderCodeSnippet(Usage)}
        <br />
        <h3>Props</h3>
        <h4>profileId: string</h4>
        <p>
          The the <code>id</code> of the user in your system.
          <br />
          You must have passed this user to <code>CollabKitProvider</code> or while calling{' '}
          <code>generateToken</code> with Secure Mode enabled.
        </p>
      </div>

      <div>
        <h3>Anatomy</h3>
        <p>
          Lets look at the parts that make up a <code>{'<Profile />'}</code>.
        </p>
        {renderCodeSnippet(Anatomy, [[1, 2]])}
        {Spacer24}
        <DocDemoContainer style={{ padding: '40px' }}>
          <Profile profileId="ville" />
        </DocDemoContainer>
        <p>
          You can render just the individual parts too, if you want to just render a users name or
          avatar. These components must be rendererd within a <code>{'Profile.Provider'}</code>.
        </p>

        <p>
          <h4>Profile.Name</h4>
          Renders a users name.
        </p>
        <DocDemoContainer style={{ maxHeight: '100px', padding: '20px' }}>
          <Profile.Provider profileId="ville">
            <Profile.Name />
          </Profile.Provider>
        </DocDemoContainer>
        {Spacer24}
        {renderCodeSnippet(AnatomyName, [
          [1, 3],
          [5, 6],
        ])}
      </div>
      <div>
        <p>
          <h4>Profile.Avatar</h4>Renders a users avatar.
        </p>
        <DocDemoContainer style={{ maxHeight: '100px', padding: '20px' }}>
          <Profile.Provider profileId="ville">
            <Profile.Avatar />
          </Profile.Provider>
        </DocDemoContainer>
        {Spacer24}
        {renderCodeSnippet(AnatomyAvatar, [
          [1, 3],
          [5, 6],
        ])}
      </div>
    </>
  );
}
