import type { DeepPartial } from '@collabkit/core';
import { createThemes, type Theme } from '@collabkit/theme';
import { computed } from '@vue/reactivity';
import { usePreferredColorScheme } from '@vueuse/core';

export function useTheme(props: {
  theme?: DeepPartial<Theme>;
  colorScheme?: 'light' | 'dark' | 'auto';
}) {
  const preferredColorScheme = usePreferredColorScheme();
  const currentTheme = computed(() => {
    const { darkTheme, lightTheme } = createThemes(props.theme);
    if (
      props.colorScheme === 'dark' ||
      (props.colorScheme === 'auto' && preferredColorScheme.value === 'dark')
    ) {
      return darkTheme;
    } else {
      return lightTheme;
    }
  });
  return currentTheme;
}
