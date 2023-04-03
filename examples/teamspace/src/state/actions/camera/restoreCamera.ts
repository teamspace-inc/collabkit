import { TLCamera } from '@tldraw/core';
import type { SpaceStore } from 'state/constants';

function isValidCameraSave(o: any): o is { camera: TLCamera } {
  return (
    o &&
    o.camera &&
    o.camera.zoom &&
    Number.isFinite(o.camera.zoom) &&
    o.camera.point &&
    typeof o.camera.point === 'object' &&
    o.camera.point.length === 2 &&
    Number.isFinite(o.camera.point[0]) &&
    Number.isFinite(o.camera.point[1])
  );
}

export const restoreCamera = (data: SpaceStore) => {
  if (!data.docId) {
    return;
  }

  const saveJSON = localStorage.getItem(`teamspace.camera.${data.docId}`);

  try {
    const save = saveJSON && JSON.parse(saveJSON);
    if (isValidCameraSave(save)) {
      data.pageState.camera = save.camera;
    }
  } catch {}
};
