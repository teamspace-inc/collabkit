import { signOut } from 'firebase/auth';
import { useSnapshot } from 'valtio';
import { store, auth, events, App } from './App';
import { Preview } from './Preview';

function AppListItem(props: { app: App }) {
  return <div>{props.app.mode}</div>;
}

export function Dashboard() {
  const { user, apps } = useSnapshot(store);
  const appList = (
    <ol>
      {Object.keys(apps).map((id) => (
        <li key={id}>
          <AppListItem app={apps[id]} />
          {/* {apps[id].name || 'Unnamed'} - {id} - {apps[id].mode} -{' '}
          <code>{JSON.stringify(apps[id].keys)}</code> */}
        </li>
      ))}
    </ol>
  );

  const selectedAppId = Object.keys(apps)?.[0];

  return (
    <div>
      <div style={{ padding: '20px', background: '#eee' }}>
        Collabkit {user?.email ?? 'Anonymous'}
        <button onClick={() => signOut(auth)}>Sign Out</button>
      </div>
      <h1>Add comments to your web app.</h1>
      <p>
        <b>
          CollabKit is a drop-in React SDK for adding commenting to web apps. With just a few lines
          of code you can enable commenting between users of your product who work in the same team
          or company.
        </b>
      </p>
      <p>
        Collaboration is the underlying activity driving most workflows and product use for work.
        Stop losing engagement to other products and bring it on platform to drive engagement,
        retention &amp; growth.
      </p>
      {/* <p>
        <b>Contextual collaboration</b>
      </p> */}
      <p>
        If you have 2+ people from the same team or company using your product, adding commenting
        lets them collaborate in your product instead of switching over to Slack, Microsoft Teams or
        Email.
      </p>
      {/* <p>
        <b>Public discussions</b>
      </p>
      <p>
        If you have public content, like a video, photo or document. Adding public commenting lets
        others discuss in your product.
      </p>
      <p>
        <b>Feedback on content</b>
      </p>
      <p>
        If your users are creating content in your product. Comments enables others to provide
        feedback in context on work in progress.
      </p> */}
      <h2>Your apps</h2>
      {appList}
      <button onClick={events.onCreateAppButtonClick}>Create new app</button>
      {/* <textarea value={idToken ?? ''} /> */}
      {selectedAppId ? (
        <Preview
          appId={selectedAppId}
          apiKey={Object.keys(apps[selectedAppId].keys)[0]}
          mode={'UNSECURED'}
        />
      ) : null}
    </div>
  );
}
