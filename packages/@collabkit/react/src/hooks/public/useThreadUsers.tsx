import { Profile } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { unique } from '../../components/unique';
import { useApp } from '../useApp';
import { useTimelineStore } from '../useTimelineStore';

export function useThreadUsers() {
  const timeline = useSnapshot(useTimelineStore());
  const { profiles } = useSnapshot(useApp().store);
  const users = Object.keys(timeline)
    .map((eventId) => timeline[eventId].createdById)
    .filter(unique)
    .map((commenterId) => profiles[commenterId])
    .filter((profile): profile is Profile => !!profile);

  return users;
}
