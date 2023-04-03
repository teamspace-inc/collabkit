import React from 'react';

// Suppres the warning about useLayoutEffect not being available on the server
const useLayoutEffect = Boolean(globalThis?.document) ? React.useLayoutEffect : () => {};

export { useLayoutEffect };
