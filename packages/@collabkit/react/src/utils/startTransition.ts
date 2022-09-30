import React from 'react';

const reactStartTransition = React.startTransition;

export function startTransition(scope: () => void) {
  if (typeof reactStartTransition === 'function') {
    return reactStartTransition(scope);
  } else {
    scope();
  }
}
