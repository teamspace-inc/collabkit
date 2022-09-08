import React from 'react';

type CommentContextValue = {
  eventId: string;
};

export const CommentContext = React.createContext<CommentContextValue | null>(null);

export function useCommentContext() {
  const context = React.useContext(CommentContext);
  if (!context) {
    throw new Error('useCommentContext must be used within an CommentContextProvider');
  }
  return context;
}
