import type { Store } from '@collabkit/core';

export function setAvatarError(store: Store, props: { avatar: string }) {
  store.avatarErrors[props.avatar] = true;
}
