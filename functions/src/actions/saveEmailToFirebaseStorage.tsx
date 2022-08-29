import * as admin from 'firebase-admin';

function saveEmailToFirebaseStorage(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  profileId: string;
  eventId: string;
  mail: { html: string; subject: string; to: string };
}) {
  const { appId, workspaceId, profileId, threadId, eventId, mail } = props;
  const storage = admin.storage();
  const bucket = storage.bucket('collabkit-dev-emails');
  const db = admin.database();

  const file = bucket.file(`/emails/${appId}/${workspaceId}/${profileId}/${eventId}.html`);
  file.save(mail.html, {
    gzip: true,
    contentType: 'text/html',
  }),
    db
      .ref(`/emails/${appId}/${workspaceId}/${threadId}/${profileId}/${eventId}`)
      .set({ subject: mail.subject, to: mail.to, bodyFileId: file.name });
}
