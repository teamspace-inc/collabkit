import type { SpaceStore } from 'state/constants';
import Vec from '@tldraw/vec';
import { mutables } from 'state/mutables';

export const zoomTo = (data: SpaceStore, zoomLevel: number) => {
  const { camera } = data.pageState;
  const zoom = zoomLevel / 100;
  const center = [mutables.rendererBounds.width / 2, mutables.rendererBounds.height / 2];
  const p0 = Vec.sub(Vec.div(center, camera.zoom), center);
  const p1 = Vec.sub(Vec.div(center, zoom), center);
  const point = Vec.toFixed(Vec.add(camera.point, Vec.sub(p1, p0)));

  if (!Number.isFinite(zoom) || zoom <= 0) {
    console.error('zoom is out of range', { zoom });
    return;
  }

  data.pageState.camera.zoom = zoom;
  data.pageState.camera.point = point;
};
