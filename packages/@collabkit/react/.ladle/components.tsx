import React from 'react';
import type { GlobalProvider } from '@ladle/react';
import { CollabKitProvider } from '../src';
import { config } from '../src/components/__stories__/constants';
import { ProviderPropsContext } from '../src/components/__stories__/context';

import '../src/index.css';

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const theme: 'dark' | 'light' = globalState.theme === 'auto' ? 'light' : globalState.theme;
  return (
    <CollabKitProvider {...config} theme={theme}>
      <ProviderPropsContext.Provider value={{ ...config, theme }}>
        {children}
      </ProviderPropsContext.Provider>
    </CollabKitProvider>
  );
};
