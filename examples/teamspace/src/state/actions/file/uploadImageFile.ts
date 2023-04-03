import { TLFileInfo } from '@tldraw/core';
import type { Item, State } from 'state/constants';
import { saveImageFile } from '../../../utils/File';
import assert from '../../../utils/assert';
import actions from '..';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import Vec from '@tldraw/vec';
import { mutables } from 'state/mutables';

export const uploadImageFile = async (state: State, payload: Pick<TLFileInfo, 'data' | 'file'>) => {
  if (!state.currentSpace) {
    console.warn('[uploadImageFile] No current space');
    return;
  }

  const { items, optimistic, pageState } = state.currentSpace;

  const { file, data: fileData } = payload;
  if (!file || !fileData || !mutables.fileStoreDB) {
    return;
  }

  try {
    const result = await saveImageFile(mutables.fileStoreDB, file, fileData);
    if (!result) {
      console.debug('drop: failed to save file');
      return;
    }

    const { id, size } = result;

    // camera starts in the top left
    const topLeftCornerPoint = Vec.mul(pageState.camera.point, -1);

    // then create the shape
    const [x, y] = topLeftCornerPoint;

    const item: Item = {
      id,
      type: 'image',
      x,
      y,
      size,
      isDeleted: false,
      url: 'filestore://' + id,
    };

    items[item.id] = item;
    state.store.editing.selectedIds = [{ type: 'shape', id: item.id }];

    // then upload the file
    new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileRef = ref(storage, `$images/${file.name}`);
      const fileUpload = uploadBytesResumable(fileRef, file, {
        contentType: file.type,
      });

      optimistic.fileUploadProgress = { [id]: 1 };

      fileUpload.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case 'paused':
              break;
            case 'running':
              optimistic.fileUploadProgress = { [id]: progress };
              break;
          }
        },
        (error) => {
          reject();
        },
        () => {
          getDownloadURL(fileUpload.snapshot.ref).then((downloadURL) => {
            const item = items[id];
            assert(item.type === 'image');
            item.url = downloadURL;
            resolve(downloadURL);
          });
        }
      );
    });

    actions.enter(state, 'idle');
  } catch (e) {
    console.error('drop: failed', e);
  }
};
