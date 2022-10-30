import { Timeline } from '../../types';
import uniq from 'lodash.uniq';

export function getThreadProfiles(props: { timeline: Timeline }) {
  const createdByIds = uniq(Object.values(props.timeline).map((event) => event.createdById));
  const mentionedIds = Object.values(props.timeline)
    .map((event) => Object.keys(event.mentions ?? {}))
    .flat(1);
  const profileIds = uniq([...createdByIds, ...mentionedIds]);
  return profileIds;
}
