import { Timeline } from '../../types';
import uniq from 'lodash.uniq';

export function getThreadProfiles(props: { timeline: Timeline }) {
  return uniq(Object.values(props.timeline).map((event) => event.createdById));
}
