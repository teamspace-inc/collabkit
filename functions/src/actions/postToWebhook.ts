import fetch from 'node-fetch';
import { fetchSeenBy } from './data/fetchSeenBy';
import { fetchThreadInfo } from './data/fetchThreadInfo';

async function fetchEventContext(props: { appId: string; workspaceId: string; threadId: string }) {
  const { appId, workspaceId, threadId } = props;

  const [seenBy, threadInfo] = await Promise.all([
    fetchSeenBy({ appId, workspaceId, threadId }),
    fetchThreadInfo({ appId, workspaceId, threadId }),
  ]);

  return {
    threadInfo,
    seenBy,
  };
}

export async function postToWebhook(
  props: {
    url: string;
    appId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
    event: any;
  },
  // mocking this for testing is an unreasonable
  // amount of work worth the effort, so we pass
  // it in java style.
  fetchFn: typeof fetch = fetch
) {
  const { url, appId, workspaceId, threadId, eventId, event } = props;

  const { threadInfo, seenBy } = await fetchEventContext({ appId, workspaceId, threadId });

  await fetchFn(url, {
    method: 'POST',
    body: JSON.stringify({
      action: 'new-event',
      payload: {
        appId,
        workspaceId,
        threadId,
        eventId,
        event,
        context: {
          threadInfo,
          seenBy,
        },
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return null;
}
