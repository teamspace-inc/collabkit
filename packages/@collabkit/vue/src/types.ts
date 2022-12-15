import type { Profile } from '@collabkit/core';
import type { Slot } from 'vue';

export type AvatarProps = {
  profile: Profile;
};

export type ProvidedSlots = {
  avatar?: Slot;
};
