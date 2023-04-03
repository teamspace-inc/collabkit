import { SpaceData } from 'state/constants';
import { mutables } from 'state/mutables';

export function applyCamera(data: SpaceData, clientId: string) {
  if (data.pageState.followingId == clientId) {
    const camera = mutables.cameras[clientId];
    if (camera && camera.point && camera.zoom && Number.isFinite(camera.zoom)) {
      data.pageState.camera = camera;
    } else {
      console.warn('tried to apply invalid camera');
    }
  }
}
