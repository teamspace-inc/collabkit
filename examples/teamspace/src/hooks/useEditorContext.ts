import React from 'react';
import { AppTarget, PaneTarget, SpaceTarget } from 'state/constants';

export type EditorContextType = { target: PaneTarget | SpaceTarget | AppTarget | null };

export const EditorContext = React.createContext(null as EditorContextType | null);

export function useEditorContext(): EditorContextType {
  const context = React.useContext(EditorContext);
  if (context == null) {
    throw new Error('Missing EditorContext.Provider.');
  }
  return context;
}
