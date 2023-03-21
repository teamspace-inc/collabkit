import type {
  Attachments,
  Event,
  FirebaseEvent,
  Profile,
  UserProps,
  WithID,
} from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import type { DataSnapshot } from 'firebase/database';
import type { Color } from '@collabkit/colors';
import { getRandomColor, isColor } from '@collabkit/colors';

export function idArrayToObject(
  ids: readonly string[] | undefined
): { [userId: string]: true } | null {
  if (!ids) {
    return null;
  }
  return ids.reduce((result, id) => {
    result[FirebaseId.encode(id)] = true;
    return result;
  }, {} as { [userId: string]: true });
}

// avoid the use of ... spread operator as
// it's easy to include unwanted properties
export function eventToFirebaseEvent(event: Event) {
  const { attachments } = event;
  let firebaseAttachments: Attachments | null = null;
  if (attachments) {
    firebaseAttachments = {};
    for (const id in attachments) {
      const attachment = attachments[id];
      switch (attachment.type) {
        case 'pin':
          firebaseAttachments[id] = {
            type: attachment.type,
            x: attachment.x,
            y: attachment.y,
            xOffset: attachment.xOffset,
            dataPoint: attachment.dataPoint,
            objectId: attachment.objectId,
            meta: attachment.meta,
          };
      }
    }
  }

  const firebaseEvent: FirebaseEvent = {
    type: event.type,
    body: event.body,
    system: event.system ?? null,
    createdById: FirebaseId.encode(event.createdById),
    mentions: idArrayToObject(event.mentions),
    parentId: event.parentId ?? null,
    createdAt: event.createdAt,
    attachments: firebaseAttachments,
  };

  return firebaseEvent;
}

export function snapshotToEvent(snapshot: DataSnapshot, id = snapshot.key): WithID<Event> | null {
  const event = snapshot.val();
  if (!event || !id) {
    console.warn('[snapshotToEvent]: could not convert snapshot', event);
    return null;
  }
  event.id = FirebaseId.decode(id);
  event.createdById = FirebaseId.decode(event.createdById);
  event.mentions = Object.keys(event.mentions ?? {}).map((id) => FirebaseId.decode(id));
  return event;
}

export function snapshotToUser(snapshot: DataSnapshot): UserProps | null {
  const user = snapshot.val();
  if (!user || !snapshot.key) {
    console.warn('[snapshotToUser]: could not convert snapshot', user);
    return null;
  }
  user.userId = FirebaseId.decode(snapshot.key);
  return user;
}

// todo validate profile data here
export function snapshotToProfile(snapshot: DataSnapshot): Profile | null {
  const profile = snapshot.val();
  if (!profile || !snapshot.key) {
    console.warn('[snapshotToProfile]: could not convert snapshot', profile);
    return null;
  }
  profile.id = FirebaseId.decode(snapshot.key);
  if (!isColor(profile.color)) {
    profile.color = getRandomColor();
  }
  return profile;
}
