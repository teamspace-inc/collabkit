import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';
import Usage from './CollabKitProviderDocUsage.tsx?raw';

export function CollabKitProviderDoc() {
  return (
    <>
      <h2>Authenticates users and syncs data.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          <code className="ReactNode">CollabKitProvider</code> is the central component that manages
          authentication with CollabKit's servers and provides data to all other components. To
          ensure smooth data fetching, we recommend wrapping it in your root component (or as close
          to it as possible) to prevent it from unmounting while your app is in use.
          <br />
          <br /> To set up
          <code className="ReactNode">CollabKitProvider</code>, simply copy the following code into
          your root App component.
        </p>
        {renderCodeSnippet(Usage)}
        <p>
          Once you've got this working you'll be able to use CollabKit components like{' '}
          <DocLink to="/docs/components/thread">Thread</DocLink> or{' '}
          <DocLink to="/docs/components/popoverthread">PopoverThread</DocLink> within your app.
        </p>
        <blockquote>
          <h4 style={{ marginTop: 0 }}>
            <DocLink href="/docs/secureMode">Secure Mode</DocLink>
          </h4>
          CollabKit's default mode allows you to provide your API key on the client side for easy
          setup. However, for added security, you can enable{' '}
          <DocLink href="/docs/secureMode">Secure Mode</DocLink>. This requires an additional step
          of generating a per-user token from your server, which helps to protect your API key.
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
