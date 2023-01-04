import { renderCodeSnippet } from '../CodeEditor';

export function CommentAPI() {
    return (
        <>
            <h2>Send a new comment via HTTP request</h2>
            <div>
                <h3>Usage</h3>
                
                <p>
                  The userId creating the comment should already be registered with CollabKit.
                </p>
                <h4>Javascript</h4>
                <div>
                    {renderCodeSnippet(`var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "appId": <your-app-id>,
  "userId": <your-user-id>,
  "workspaceId": <your-workspace-id>,
  "threadId": <your-thread-id>,
  "body": <your-comment-body>,
  "apiKey": <your-api-key>
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch('https://api.collabkit.dev/comment', requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`)}
                </div>
                <br/>
                <h4>cURL</h4>
                <div>
                    {renderCodeSnippet(`curl --location --request POST 'https://api.collabkit.dev/comment' \
--header 'Content-Type: application/json' \
--data-raw '{
    "appId": <your-app-id>,
    "userId": <your-user-id>,
    "workspaceId": <your-workspace-id>,
    "threadId": <your-thread-id>,
    "body": <your-comment-body>,
    "apiKey": <your-api-key>
}'`)}
                </div>
                <br/>
                <h4>NodeJs</h4>
                <div>
                    {renderCodeSnippet(`var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.collabkit.dev/comment',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "appId": <your-app-id>,
    "userId": <your-user-id>,
    "workspaceId": <your-workspace-id>,
    "threadId": <your-thread-id>,
    "body": <your-comment-body>,
    "apiKey": <your-api-key>
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
`)}
                </div>
            </div>
        </>
    );
}
