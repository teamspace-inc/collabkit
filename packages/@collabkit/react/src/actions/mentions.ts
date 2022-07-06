import { MentionProps, Store } from '../constants';

export function mentions(store: Store, props: MentionProps) {
  store.config.mentions = props;
}
