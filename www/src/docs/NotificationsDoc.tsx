import { DocDemoContainer } from './Doc';

export function NotificationsDoc() {
  return (
    <>
      <h2>Get notified about new comments and replies.</h2>
      <DocDemoContainer />
      <div>
        <p>CollabKit delivers email notifications for new comments and threads by default.</p>
        <p>
          If you would like to deliver notifications yourself you can subscribe to new comments and
          threads by providing a webhook URL.
        </p>
      </div>
      {/* 
- [ ]  Show screenshot of email
- [ ]  Show when email is sent and how the notifications work (flow chart)
- [ ]  How to turn notifications off

Speak to us if you would like to handle this yourself. We offer a webhook so you can be notified of new comments as they happen.`}
      /> */}
    </>
  );
}
