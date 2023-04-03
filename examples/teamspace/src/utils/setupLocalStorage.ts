import type { GlobalStore } from 'state/constants';
import { subscribe } from 'valtio/vanilla';

const STORAGE_KEY = 'teamspace.spaceIndex';

export default function setupLocalStorage(store: GlobalStore): () => void {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    const data = json && JSON.parse(json);
    if (data?.savedSpaces) {
      // TODO: check data.version
      store.savedSpaces = data.savedSpaces;
    } else {
      store.savedSpaces = [];
    }

    if (data?.lastOpenedSpaceId) {
      store.lastOpenedSpaceId = data.lastOpenedSpaceId;
    } else {
      store.lastOpenedSpaceId = null;
    }

    if (typeof data?.isSidebarOpen === 'boolean') {
      store.isSidebarOpen = data.isSidebarOpen;
    } else {
      store.isSidebarOpen = true;
    }
  } catch (error) {
    console.error(
      `[setupLocalStorage] Could not read spaceIndex from localStorage['${STORAGE_KEY}'], resetting.`,
      error
    );
    store.savedSpaces = [];
  }

  return subscribe(store, (ops) => {
    let shouldPersist = false;
    for (const op of ops) {
      const path = op[1];
      if (
        path[0] === 'savedSpaces' ||
        path[0] === 'lastOpenedSpaceId' ||
        path[0] === 'isSidebarOpen'
      ) {
        shouldPersist = true;
        break;
      }
    }
    if (shouldPersist) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            savedSpaces: store.savedSpaces,
            lastOpenedSpaceId: store.lastOpenedSpaceId,
            isSidebarOpen: store.isSidebarOpen,
            version: 1,
          })
        );
      } catch (error) {
        console.warn(`[setupLocalStorage] Could not write to localStorage['${STORAGE_KEY}'].`);
      }
    }
  });
}
