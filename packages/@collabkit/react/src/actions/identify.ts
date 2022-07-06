import { IdentifyProps, Store } from '../constants';

export async function identify(store: Store, props: IdentifyProps) {
  store.config.identify = props;
  // todo extract this
  store.workspaces[props.workspaceId] ||= {
    inbox: {},
    name: store.config.identify.workspaceName || '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
  };
}
