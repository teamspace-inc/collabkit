import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement('div');
root.id = 'collabkit-chrome-root';
document.body.append(root);

document.body.style.marginRight = '400px';

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
