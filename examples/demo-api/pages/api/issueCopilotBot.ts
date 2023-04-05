import type { NextApiRequest, NextApiResponse } from 'next';
import { processCommand } from './issueTracker';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    process.env.APP_ID == undefined ||
    process.env.PRIVATE_KEY == undefined ||
    process.env.OPENAI_API_KEY == undefined
  ) {
    res.status(500).send('Environment not set');
    return;
  }
  const { OWNER, REPO, command, appId, workspaceId, threadId } = req.body;
  const apiKey = process.env.BOT_API_KEY;
  const botUserId = process.env.BOT_USER_ID;
  
  // enable Bot
  var data = JSON.stringify({
    appId: appId,
    workspaceId: workspaceId,
    threadId: threadId,
  });

  var config = {
    method: 'post',
    url: 'https://test-api.collabkit.dev/v1/enableBot',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  axios(config);

  const output = await processCommand({ OWNER, REPO, command });

  data = JSON.stringify({
    apiKey: apiKey,
    appId: appId,
    workspaceId: workspaceId,
    userId: botUserId,
    threadId: threadId,
    body: output,
  });

  config = {
    method: 'post',
    url: 'https://test-api.collabkit.dev/v1/comment',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
