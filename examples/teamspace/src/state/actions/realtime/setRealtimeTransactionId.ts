import { nextTransactionId } from 'realtime';
import { SpaceStore } from 'state/constants';

export function setRealtimeTransactionId(data: SpaceStore) {
  data.transactionId = nextTransactionId();
}
