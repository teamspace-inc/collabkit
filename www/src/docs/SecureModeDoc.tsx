import { docStep, inset } from '../styles/Docs.css';
import { renderCodeSnippet } from './CodeEditor';
import SecureModeDocNodeSnippet from './SecureModeDocNodeSnippet?raw';
import SecureModeDocResponseSnippet from './SecureModeDocResponseSnippet?raw';
import SecureModeDocJsonSnippet from './SecureModeDocJsonSnippet?raw';
import SecureModeDocReactSnippet from './SecureModeDocReactSnippet?raw';

export function SecureModeDoc() {
  return (
    <>
      <div>
        <h2>Make sure you turn this on before shipping to production</h2>
        <p>
          To ensure the security of your API key and protect against unauthorized access to
          comments, CollabKit offers Secure Mode. This mode requires fetching a per-user token and
          passing it to the client. This helps to keep your API key safe and prevents users from
          reading or writing comments intended for other users or workspaces.
        </p>
        <p>
          In this tutorial we'll show you how to enable it. Set aside 30 minutes to get it done.
        </p>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Contact us</h3>
        <p>Email or Slack us and we'll enable Secure Mode for your app.</p>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Generate a per-user token</h3>
        <div>
          <h4>For Node.js</h4>
          <p>
            Install <code>@collabkit/node</code> and call <code>getUserToken</code>.
          </p>
          {renderCodeSnippet(SecureModeDocNodeSnippet)}
          <br />
          <h4>For everything else (HTTP request)</h4>

          <p>
            Generate a token by making a <code>POST</code> request to{' '}
            <code>https://token.collabkit.dev</code> with the following JSON payload. <br />
            <br />
            {renderCodeSnippet(SecureModeDocJsonSnippet)}
            <p>You'll receive a response of the format:</p>
            {renderCodeSnippet(SecureModeDocResponseSnippet)}
          </p>
        </div>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Pass the token to the CollabKitProvider on the client</h3>
        {renderCodeSnippet(SecureModeDocReactSnippet)}
      </div>
      <div className={inset}>
        <h3 className={docStep}>Done!</h3>
        <p>Your app is now running in Secure Mode.</p>
      </div>
    </>
  );
}
