import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';
import Usage from './CollabKitProviderDocUsage.tsx?raw';

export function CollabKitProviderDoc() {
  return (
    <>
      <h2>Identifies users and sync data. Required to use other components.</h2>

      <div>
        <h3>Usage</h3>
        <p>
          <code className="ReactNode">CollabKitProvider</code> is the React context provider that
          handles authentication with CollabKit's servers and all other components fetch data from
          it.
        </p>

        <p>
          Because it handles data fetching we recommend wrapping it in your apps root component (or
          as close as possible to it) so it does not unmount while a user is using your app.
        </p>

        <p>
          The following example shows how to setup{' '}
          <code className="ReactNode">CollabKitProvider</code> for your app. Copy the code below
          into your root <code className="ReactNode">App</code> component.
        </p>

        {renderCodeSnippet(Usage)}
        <p>
          Once you've got this working you'll be able to use CollabKit components like{' '}
          <DocLink to="/docs/components/thread">Thread</DocLink> or{' '}
          <DocLink to="/docs/components/popoverthread">PopoverThread</DocLink> within your app.
        </p>
        <blockquote>
          <h4 style={{ marginTop: 0 }}>Secure Mode</h4>By default CollabKit lets you provide your{' '}
          <code>apiKey</code> client side so it's easy to get started. <br />
          <br />
          Before going live you'll want to enable{' '}
          <DocLink href="/docs/secureMode">Secure Mode</DocLink> which requires an additional step
          to generate a per-user token from your server. Which keeps your <code>apiKey</code> safe.
        </blockquote>
      </div>
      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            ['appId', 'string', 'Your CollabKit App ID'],
            ['apiKey', 'string', 'Your CollabKit API Key'],
            ['theme', `'light' | 'dark' | CustomTheme`, 'The theme to use'],
            ['user', 'User', <>Authenticated user</>],
            [
              'workspace',
              'Workspace',
              <>
                User's <DocLink to="/docs/workspaces">Workspace</DocLink>
              </>,
            ],
            [
              'mentionableUsers',
              `'Mention[] | 'allWorkspace'`,
              <>
                Array of users that can be mentioned in comments or <code>'allWorkspace'</code>
                (each user in the same workspace)
              </>,
            ],
          ]}
        />
      </div>
    </>
  );
}
