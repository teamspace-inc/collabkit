import type { Profile } from '@collabkit/core';
import type { createThemes } from '@collabkit/theme';
import type { ComputedRef, Slot } from 'vue';

export type AvatarProps = {
  profile: Profile;
};

export type ProvidedSlots = {
  avatar?: Slot;
};

export type ProvidedTheme = ComputedRef<
  ReturnType<typeof createThemes>['darkTheme'] | ReturnType<typeof createThemes>['lightTheme']
>;
