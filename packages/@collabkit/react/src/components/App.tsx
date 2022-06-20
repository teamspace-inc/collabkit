import React from 'react';

const AppContext = React.createContext<{ token: string | null }>({ token: null });

function App(props: { token: string; children: React.ReactNode }) {
  return <AppContext.Provider value={{ token: props.token }}>{props.children}</AppContext.Provider>;
}

export { App };
