import { docStep, inset } from '../styles/Docs.css';
import { renderCodeSnippet } from './CodeEditor';

export function SecureModeDoc() {
  return (
    <>
      <div>
        <h2>Make sure you turn this on before shipping to production</h2>
        <p>
          Secure Mode requires fetching a per user token and passing it to the client. This keeps
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
        <h3 className={docStep}>Generate a per-user token</h3>
        <div>
          <h4>For Node.js</h4>
          <p>
            Install <code>@collabkit/node</code> and call <code>getUserToken</code>.
          </p>
          {renderCodeSnippet(`import { getUserToken } from '@collabkit/node';
          
cons response = await getUserToken({
  appId: 'your APP ID here',
  apiKey: 'your API Key here',
  userId: 'jane',
  workspaceId: 'acme'
  user: {
    name: 'Jane Doe', // optional
    email: 'jane@example.com' // optional
    avatar: 'https://example.com/jane.jpg' // optional
  },
  workspace: {
    name: 'ACME Corporation' // optional
  }
});

let token;
if (response?.status === 201) {
  token = response.data.token;
  // pass token to client
} else {
  throw new Error('Failed to generate token');
}`)}
          <br />
          <h4>For everything else (HTTP request)</h4>

          <p>
            Generate a token by making a <code>POST</code> request to{' '}
            <code>https://token.collabkit.dev</code> with the following JSON payload. <br />
            <br />
            {renderCodeSnippet(`{
  "mode": "SECURED",
  "appId": "your APP ID here",
  "apiKey": "your API Key here",
  "userId": "your user ID here",
  "user": {
    "name": "Jane Doe", // optional
    "email": "jane@example.com", // optional
    "avatar": "https://example.com/jane.jpg" // optional
  },
  "workspaceId": "acme",
  "workspace": {
    "name": "ACME Corporation" // optional
  },
}`)}
            <p>You'll receive a response of the format:</p>
            {renderCodeSnippet(`{
  "status": 201,
  "data": {
    "appId": "given APP ID",;
    "mode": "SECURED";
    "token": "generated per user token"; // pass this to <CollabKitProvider token={token}/>
    "userId": "user ID";
    "workspaceId": "workspace ID";
  }
}`)}
          </p>
        </div>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Pass the token to the CollabKitProvider on the client</h3>
        {renderCodeSnippet(`import { CollabKitProvider } from '@collabkit/react';

export default function App() {
  return (
    <CollabKitProvider 
      appId={'your APP ID here'} 
      token={'per user token generated on the server here'}
      mentionableUsers={'allWorkspace'}
    </CollabKitProvider>
  );
}`)}
      </div>
      <div className={inset}>
        <h3 className={docStep}>Done!</h3>
        <p>Your app is now running in Secure Mode.</p>
      </div>
    </>
  );
}
