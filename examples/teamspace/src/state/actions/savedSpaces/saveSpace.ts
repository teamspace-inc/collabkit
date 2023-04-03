import { GlobalStore, SpaceStore, SPACE_NAME_KEY } from 'state/constants';

export function saveSpace(globalStore: GlobalStore, spaceStore: SpaceStore) {
  let name;
  try {
    name = spaceStore.doc?.getXmlFragment(SPACE_NAME_KEY).toDOM().textContent ?? undefined;
  } catch (error) {
    console.warn('[saveSpace] Reading space name failed.', error);
  }

  const savedSpaces = globalStore.savedSpaces;
  const space = {
    id: spaceStore.docId,
    name,
  };
  const existingSpace = savedSpaces.find(({ id }) => id === space.id);
  if (existingSpace) {
    Object.assign(existingSpace, space);
  } else {
    // New space, add to the end of the list.
    savedSpaces.push(space);
  }
}
