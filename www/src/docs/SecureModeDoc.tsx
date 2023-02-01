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
          Secure Mode requires signing a per user token and passing it to the client. This keeps
          your <code>apiKey</code> safe and prevents anyone from writing or reading comments
          indended for other users or workspaces.
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
        <h3 className={docStep}>Create a per-user token</h3>
        <div>
          <h4>For Node.js</h4>
          <p>
            Install <code>@collabkit/node</code> and call <code>createUserToken</code>.
          </p>
          {renderCodeSnippet(SecureModeDocNodeSnippet)}
          <br />

          <h4>For Python</h4>
          <p>
            Install <a href='https://pyjwt.readthedocs.io/en/stable/index.html'>PyJWT</a> and use the following python code:
            <br />
            {renderCodeSnippet('import jwt \ntoken = jwt.encode({ "userId": "<your user ID here>", "workspaceId": "<your workspaceId here>" }, "<your apiKey here>", algorithm="HS256")')}
          </p>
          <br />
          <h4>For everything else (HTTP request)</h4>

          <p>
            Create a user token by createing a JWT token with the following payload signed by your API key as the secret using the HS256 algorithm:
            {renderCodeSnippet(SecureModeDocJsonSnippet)}
          </p>
        </div>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Pass the user token to the CollabKitProvider on the client</h3>
        {renderCodeSnippet(SecureModeDocReactSnippet)}
      </div>
      <div className={inset}>
        <h3 className={docStep}>Done!</h3>
        <p>Your app is now running in Secure Mode.</p>
      </div>
    </>
  );
}
