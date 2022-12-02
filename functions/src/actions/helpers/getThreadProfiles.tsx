import { ThreadInfo, Timeline } from '../../types';

export function getThreadProfiles(props: { timeline: Timeline; threadInfo: ThreadInfo }) {
  const defaultSubscriberIds = props.threadInfo.defaultSubscribers ?? [];
  const createdByIds = Object.values(props.timeline).map((event) => event.createdById);
  const mentionedIds = Object.values(props.timeline)
    .map((event) => Object.keys(event.mentions ?? {}))
    .flat(1);
  const profileIds = new Set([...defaultSubscriberIds, ...createdByIds, ...mentionedIds]);
  return [...profileIds];
}
