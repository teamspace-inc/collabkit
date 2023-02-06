import React from 'react';

export const CommentContext = React.createContext<string | null>(null);

export function useOptionalCommentContext() {
  return React.useContext(CommentContext);
}

export function useDefaultCommentContext() {
  return useOptionalCommentContext() ?? 'default';
}

export function useCommentContext() {
  const context = React.useContext(CommentContext);
  if (!context) {
    throw new Error('useCommentContext must be used within an CommentContextProvider');
  }
  return context;
}
