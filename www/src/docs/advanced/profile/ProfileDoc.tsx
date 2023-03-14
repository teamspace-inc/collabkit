import { Profile, ProfileAvatar, ProfileName, ProfileProvider } from '@collabkit/react';
import { renderCodeSnippet } from '../../CodeEditor';
import { DocLink } from '../../Doc';
import Anatomy from './ProfileAnatomy.tsx?raw';
import AnatomyName from './NameExample.tsx?raw';
import AnatomyAvatar from './AvatarExample.tsx?raw';

import Usage from './ProfileUsage.tsx?raw';
import { vars } from '../../../styles/Theme.css';
import { AdvancedDemo, AdvancedDisclaimer, AdvancedPart, AdvancedProps } from '../AdvancedCommon';

const Spacer12 = <div style={{ height: 12 }} />;

export function ProfileDoc() {
  return (
    <>
      <h2>Render a profile, which consists of an avatar and name</h2>
      <AdvancedDisclaimer componentName="Profile" />
      <div>
        <h3>Demo</h3>
        <AdvancedDemo>
          <Profile profileId="ville" />
        </AdvancedDemo>
      </div>

      <div>
        <h3>Usage</h3>
        <p>Renders a Profile. The most basic usage is: </p>
        {renderCodeSnippet(Usage)}
      </div>
      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'profileId',
              'string',
              <>
                The <code>id</code> of the user in your system. You must have provided this to
                CollabKit, either by passing it to <code>CollabKitProvider</code> or by calling{' '}
                <code>generateToken</code> if <DocLink href="/docs/secureMode">Secure Mode</DocLink>{' '}
                is enabled.
              </>,
            ],
          ]}
        />
      </div>

      <div>
        <h3>Anatomy</h3>
        <p>
          Lets look at the parts that make up a <code>{'<Profile />'}</code>.
        </p>
        {renderCodeSnippet(Anatomy)}
        <p>
          You can render just the individual parts too, if you want to just render a users name or
          avatar. These components must be rendererd within a <code>{'ProfileProvider'}</code>.
        </p>

        <AdvancedPart
          title="ProfileName"
          description="Render a user's name"
          demo={
            <ProfileProvider profileId="ville">
              <ProfileName />
            </ProfileProvider>
          }
          code={AnatomyName}
        />
      </div>
      <div>
        <AdvancedPart
          title="ProfileAvatar"
          description="Render a user's avatar"
          demo={
            <ProfileProvider profileId="ville">
              <ProfileAvatar />
            </ProfileProvider>
          }
          code={AnatomyAvatar}
          props={
            <>
              <b style={{ color: vars.color.textContrastHigh }}>size?: string</b>
              {Spacer12}
              Defaults to <code>24px</code>
              {Spacer12}
              Set the size of the avatar in pixels.
            </>
          }
        />
      </div>
    </>
  );
}
