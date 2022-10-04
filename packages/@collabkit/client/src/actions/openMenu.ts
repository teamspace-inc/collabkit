import type { MenuTarget, Store } from '@collabkit/core';

export function openMenu(store: Store, props: { target: MenuTarget }) {
  store.menuId = props.target;
}
