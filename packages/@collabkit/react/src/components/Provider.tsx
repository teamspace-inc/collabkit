import React, { useEffect, useState } from 'react';
import { actions, createEvents } from '@collabkit/client';
import { AppContext, AppContextValue } from '../hooks/useAppContext';
import { createValtioStore } from '../store';
import { FirebaseSync } from '@collabkit/client';
import { SaveMentionableUsers } from './SaveMentionableUsers';
import { FloatingTree } from '@floating-ui/react';
import { AuthenticatedContext } from './AuthenticatedContext';
import { CustomTheme } from '../theme/themes.css';
import { ThemeProvider } from './ThemeContext';
import { RenderFnContext } from '../hooks/useRenderFnContext';
import type { Callbacks, ConfigProps, SecureProps, UnsecureProps } from '@collabkit/core';
import type { RenderFnContextValue } from '../hooks/useRenderFnContext';
import { ref } from 'valtio';
import { PinLayer } from './PinLayer';

export type ProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | CustomTheme;
  // notificationPreferences: 'allWorkspace' | 'onlyThread' | 'off';
} & (SecureProps | UnsecureProps) &
  ConfigProps &
  RenderFnContextValue;

function useSaveCb<T extends keyof Callbacks>(
  key: T,
  fn: Callbacks[T],
  context: AppContextValue | null
) {
  useEffect(() => {
    const store = context?.store;
    if (!store) return;
    if (!fn) return;
    store.callbacks[key] = ref(fn);
    return () => {
      store.callbacks[key] = undefined;
    };
  }, [fn, context?.store]);
}

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider({
  children,
  theme,
  renderAvatar,
  renderThreadContextPreview,
  onAuthenticationRequired,
  onPinClick,
  onPinHover,
  onPinUnhover,
  onPinDeselect,
  onPinAttach,
  onThreadCreated,
  onCommentSend,
  onTimestampClick,
  onMentionClick,
  onInboxThreadClick,
  onThreadResolve,
  onThreadReopen,
  onInboxCloseButtonClick,
  ...config
}: ProviderProps) {
  const [context, setContext] = useState<AppContextValue | null>(null);
  const [renderFnContext, setRenderFnContext] = useState<RenderFnContextValue>({});

  useEffect(() => {
    const sync = new FirebaseSync({ test: !!config._test });
    const store = config._demoStore ?? createValtioStore(config, sync);
    const events = createEvents(store);
    actions.monitorConnection(store, events);
    setContext({ store, events });
    return () => events.onDestroy();
  }, [config.appId, 'token' in config ? config.token : config.apiKey]);

  useEffect(() => {
    setRenderFnContext({
      renderAvatar,
      renderThreadContextPreview,
    });
  }, [renderAvatar, renderThreadContextPreview]);

  // save all callbacks to store
  // previously we weren't updating callbacks
  // as they changed!
  useSaveCb('onAuthenticationRequired', onAuthenticationRequired, context);
  useSaveCb('onPinClick', onPinClick, context);
  useSaveCb('onPinHover', onPinHover, context);
  useSaveCb('onPinUnhover', onPinUnhover, context);
  useSaveCb('onPinDeselect', onPinDeselect, context);
  useSaveCb('onPinAttach', onPinAttach, context);
  useSaveCb('onThreadCreated', onThreadCreated, context);
  useSaveCb('onCommentSend', onCommentSend, context);
  useSaveCb('onTimestampClick', onTimestampClick, context);
  useSaveCb('onMentionClick', onMentionClick, context);
  useSaveCb('onInboxThreadClick', onInboxThreadClick, context);
  useSaveCb('onThreadResolve', onThreadResolve, context);
  useSaveCb('onThreadReopen', onThreadReopen, context);
  useSaveCb('onInboxCloseButtonClick', onInboxCloseButtonClick, context);

  useEffect(() => {
    if (context) {
      document.addEventListener('keydown', context.events.onKeyDown);
      document.addEventListener('pointerdown', context.events.onGlobalPointerDown);
      return () => {
        document.removeEventListener('pointerdown', context.events.onGlobalPointerDown);
        document.removeEventListener('keydown', context.events.onKeyDown);
      };
    }
  }, [context?.events]);

  if (!context) {
    return null;
  }

  return (
    <AppContext.Provider value={context}>
      <RenderFnContext.Provider value={renderFnContext}>
        <ThemeProvider theme={theme}>
          <AuthenticatedContext>
            <FloatingTree>
              <PinLayer>{children}</PinLayer>
            </FloatingTree>
            <SaveMentionableUsers mentionableUsers={config.mentionableUsers} />
          </AuthenticatedContext>
        </ThemeProvider>
      </RenderFnContext.Provider>
    </AppContext.Provider>
  );
}
