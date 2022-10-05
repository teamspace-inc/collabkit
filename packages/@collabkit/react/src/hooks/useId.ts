import React from 'react';

const reactUseId = React.useId;
let globaId = 0;

function useGlobalId() {
  const [id] = React.useState(() => globaId++);
  return `useId_${id}`;
}

export function useId() {
  if (typeof reactUseId === 'function') {
    return reactUseId();
  }
  return useGlobalId();
}
