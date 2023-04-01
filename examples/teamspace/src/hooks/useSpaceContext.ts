import React, { useMemo } from 'react';

import type { GlobalStore, SpaceStore } from 'state/constants';
import { useAppContext } from './useAppContext';

export type SpaceContextType = { store: SpaceStore };

export const SpaceContext = React.createContext(null as SpaceContextType | null);

export function useSpaceContext(): SpaceContextType {
  const context = React.useContext(SpaceContext);
  if (context == null) {
    throw new Error('Missing SpaceContext.Provider.');
  }
  return context;
}

export function useOptionalSpaceStore(): SpaceStore | undefined {
  const context = React.useContext(SpaceContext);
  if (context == null) {
    return undefined;
  }
  return context.store;
}

export function useCurrentSpaceId(): string | undefined {
  const context = React.useContext(SpaceContext);
  if (context == null) {
    return undefined;
  }
  return context.store.docId;
}

export function useAppState(): { store: GlobalStore; currentSpace?: SpaceStore } {
  const { store } = useAppContext();

  // @ville looks like SpaceContext can be null here, so I added: `|| {}`
  const { store: currentSpace } = React.useContext(SpaceContext) || {};

  const state = useMemo(() => ({ store, currentSpace }), [store, currentSpace]);

  return state;
}

export function useSpaceState(): { store: GlobalStore; currentSpace: SpaceStore } {
  const { store } = useAppContext();
  const { store: currentSpace } = useSpaceContext();
  return { store, currentSpace };
}
