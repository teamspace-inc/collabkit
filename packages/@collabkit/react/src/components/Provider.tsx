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

export type ContextProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | CustomTheme;
  renderAvatar?: (props: AvatarProps) => ReactNode;
  store: Store;
};

export function CollabKitContextProvider(props: ContextProviderProps) {
  return (
    <StoreProvider store={props.store}>
      <CustomAvatarProvider renderAvatar={props.renderAvatar}>
        <ThemeProvider theme={props.theme}>
          <FloatingTree>{props.children}</FloatingTree>
        </ThemeProvider>
      </CustomAvatarProvider>
    </StoreProvider>
  );
}

export type ProviderProps = Config & Omit<ContextProviderProps, 'store'>;

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
    <CollabKitContextProvider store={store} theme={theme} renderAvatar={renderAvatar}>
      {children}
      <PinLayer />
    </CollabKitContextProvider>
  );
}

export function Provider(props: ProviderProps) {
  console.warn('CollabKit.Provider is deprecated, please use CollabKitProvider instead');
  return <CollabKitProvider {...props} />;
}

function useCollabKitStore(config: Config) {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const store = createCollabKitStore(config);
    actions.install(store);
    setStore(store);
    return () => {
      actions.destroy(store);
    };
  }, [config.appId, 'token' in config ? config.token : config.apiKey]);

  return store;
}
