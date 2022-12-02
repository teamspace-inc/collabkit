import type { Event, UserProps, WithID } from '@collabkit/core';
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

export function eventToObject(event: Event): object {
  return {
    ...event,
    createdById: FirebaseId.encode(event.createdById),
    mentions: idArrayToObject(event.mentions),
  };
}

export function snapshotToEvent(snapshot: DataSnapshot, id = snapshot.key): WithID<Event> | null {
  const event = snapshot.val();
  if (!event || !id) {
    console.warn('[snapshotToEvent]: could not convert snapshot');
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
    console.warn('[snapshotToUser]: could not convert snapshot');
    return null;
  }
  user.userId = FirebaseId.decode(snapshot.key);
  return user;
}

export function snapshotToProfile(
  snapshot: DataSnapshot
): { id: string; name?: string; email?: string; color: Color; avatar?: string } | null {
  const profile = snapshot.val();
  if (!profile || !snapshot.key) {
    console.warn('[snapshotToProfile]: could not convert snapshot');
    return null;
  }
  profile.id = FirebaseId.decode(snapshot.key);
  if (!isColor(profile.color)) {
    profile.color = getRandomColor();
  }
  return profile;
}
