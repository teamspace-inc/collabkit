import { Doc } from './Doc';
import { Markdown } from './Markdown';

export function NotificationsDoc() {
  return (
    <Doc title="Notifications">
      <Markdown
        body={`CollabKit delivers email notifications for new comments and threads by default. 

- [ ]  Show screenshot of email
- [ ]  Show when email is sent and how the notifications work (flow chart)
- [ ]  How to turn notifications off

Speak to us if you would like to handle this yourself. We offer a webhook so you can be notified of new comments as they happen.`}
      ></Markdown>
    </Doc>
  );
}
