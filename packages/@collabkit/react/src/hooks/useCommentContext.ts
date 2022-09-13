import React from 'react';
import { CommentTarget } from '@collabkit/core';

export const CommentContext = React.createContext<CommentTarget | null>(null);

export function useCommentContext() {
  const context = React.useContext(CommentContext);
  if (!context) {
    throw new Error('useCommentContext must be used within an CommentContextProvider');
  }
  return context;
}
