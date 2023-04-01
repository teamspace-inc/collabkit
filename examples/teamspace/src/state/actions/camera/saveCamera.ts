import type { SpaceStore } from 'state/constants';

export const saveCamera = (data: SpaceStore) => {
  if (!data.docId) {
    return;
  }

  let save = {
    camera: data.pageState.camera,
  };

  delete save.camera.animate;

  try {
    localStorage.setItem(`teamspace.camera.${data.docId}`, JSON.stringify(save));
  } catch (error) {
    console.error('[saveCamera] failed', error);
  }
};
