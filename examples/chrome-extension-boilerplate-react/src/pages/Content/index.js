import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const body = document.querySelector('body');
const app = document.createElement('div');

app.id = 'my-extension-root';
app.style.display = 'inline';

if (body) {
  body.appendChild(app);
}

const container = document.getElementById(app.id);
const root = createRoot(container);
root.render(<App />);

function toggle() {
  if (document.getElementById(app.id).style.display === 'none') {
    document.getElementById(app.id).style.display = 'inline';
  } else {
    document.getElementById(app.id).style.display = 'none';
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    toggle();
  }
});
