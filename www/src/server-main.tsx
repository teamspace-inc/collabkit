import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
// @ts-expect-error
import staticLocationHook from 'wouter/static-location';
import { Router } from 'wouter';

export const render = (path: string) => {
  const location = staticLocationHook(path);

  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <Router hook={location}>
        <App />
      </Router>
    </React.StrictMode>
  );
};
