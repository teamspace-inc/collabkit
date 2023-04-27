import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement('div');
root.id = 'collabkit-chrome-root';
document.body.append(root);

document.body.style.marginRight = '400px';

chrome.storage.sync.get('threadId', function (items) {
  let threadId = items.threadId;
  if (threadId) {
    render(threadId);
  } else {
    threadId = getRandomToken();
    chrome.storage.sync.set({ threadId }, function () {
      render(threadId);
    });
  }
});

function render(threadId: string) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App threadId={threadId} />
    </React.StrictMode>
  );
}

function getRandomToken() {
  // E.g. 8 * 32 = 256 bits token
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = '';
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
  return hex;
}
