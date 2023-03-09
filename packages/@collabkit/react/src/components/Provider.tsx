import React, { ReactNode, useEffect, useState } from 'react';
import { actions, createCollabKitStore, createEvents } from '@collabkit/client';
import { StoreProvider } from '../hooks/useAppContext';
import { FloatingTree } from '@floating-ui/react';
import { CustomTheme } from '../theme/themes.css';
import { ThemeProvider } from './ThemeContext';
import { CustomAvatarProvider } from '../hooks/useRenderAvatarContext';
import { PinLayer } from './PinLayer';
import type { AvatarProps } from '../types';
import type { Config, Store } from '@collabkit/core';

export type ProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | CustomTheme;
  renderAvatar?: (props: AvatarProps) => ReactNode;
  store?: Store;
} & Config;

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider({ children, theme, renderAvatar, ...config }: ProviderProps) {
  const store = useCollabKitStore(config);

  useEffect(() => {
    if (store) {
      actions.setConfig(store, config);
    }
  }, [store, config]);

  if (!store) {
    return null;
  }
  return (
    <StoreProvider store={store}>
      <CustomAvatarProvider renderAvatar={renderAvatar}>
        <ThemeProvider theme={theme}>
          <FloatingTree>
            {children}
            <PinLayer />
          </FloatingTree>
        </ThemeProvider>
      </CustomAvatarProvider>
    </StoreProvider>
  );
}

function useCollabKitStore(config: Config & { store?: Store }) {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    if (!config.store) {
      const store = config.store ?? createCollabKitStore(config);
      actions.install(store);
      setStore(store);
      return () => {
        actions.destroy(store);
      };
    }
  }, [config.appId, 'token' in config ? config.token : config.apiKey]);

  return config.store ?? store;
}
