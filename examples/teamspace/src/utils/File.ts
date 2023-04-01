import Vec from '@tldraw/vec';
import { FileStoreDB, get, put } from 'file-store';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { IMAGE_DOWNSCALE_FACTOR, MAX_IMAGE_SIZE } from 'state/constants';
import { mutables } from 'state/mutables';

// large images blow up the browser, so we need to resize them down
export function resizeImage(img: HTMLImageElement, type: string, maxSize: number) {
  return new Promise<{ blob: Blob; size: number[] }>((resolve, reject) => {
    const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      imgCanvas = document.createElement('canvas'),
      imgCtx = imgCanvas.getContext('2d');

    if (!imgCtx || !ctx) {
      reject();
      return;
    }

    if (img.width > img.height) {
      canvas.width = maxSize;
      canvas.height = Math.round((maxSize * img.height) / img.width);
    } else {
      canvas.height = maxSize;
      canvas.width = Math.round((maxSize * img.width) / img.height);
    }

    let cur = {
      width: Math.floor(img.width * 0.5),
      height: Math.floor(img.height * 0.5),
    };

    imgCanvas.width = cur.width;
    imgCanvas.height = cur.height;

    imgCtx.drawImage(img, 0, 0, cur.width, cur.height);

    while (cur.width * 0.5 > maxSize) {
      cur = {
        width: Math.floor(cur.width * 0.5),
        height: Math.floor(cur.height * 0.5),
      };
      imgCtx.drawImage(imgCanvas, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
    }

    while (cur.height * 0.5 > maxSize) {
      cur = {
        width: Math.floor(cur.width * 0.5),
        height: Math.floor(cur.height * 0.5),
      };
      imgCtx.drawImage(imgCanvas, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
    }

    ctx.drawImage(imgCanvas, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      blob ? resolve({ blob, size: [canvas.width, canvas.height] }) : reject();
    }, type);
  });
}

export function calculateImageSize(dataUrl: string) {
  return new Promise<number[]>((resolve, reject) => {
    const image = new Image();
    image.onload = (e) => {
      resolve([image.width, image.height]);
    };
    image.onerror = (e) => {
      reject();
    };
    image.src = dataUrl;
  });
}

export function fileToImage(file: File, data: ArrayBuffer | string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    // fileToImage: remember to call URL.revokeObjectURL cleanup the image after use');
    const blob = new Blob([data], { type: file.type });
    const imageUrl = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = () => resolve(img);
    return img;
  });
}

export async function saveImageFile(
  fileStoreDB: FileStoreDB,
  file: File,
  data: ArrayBuffer | string | null
): Promise<{ id: string; size: number[] } | void> {
  if (!data) {
    console.debug('saveImageFile: no file data');
    return;
  }

  if (!mutables.fileStoreDB) {
    console.debug('saveImageFile: fileStoreDB is not ready');
    return;
  }

  if (!file.type.startsWith('image/')) {
    console.debug('saveImageFile: unsupported file type', file.type);
    return;
  }

  const id = nanoid();

  let blob = new Blob([data], { type: file.type });

  const image = await fileToImage(file, data);

  let size = [image.width, image.height];

  // tweak this constant to increase max image quality on the canvas
  if (size[0] > MAX_IMAGE_SIZE || size[1] > MAX_IMAGE_SIZE) {
    const result = await resizeImage(image, file.type, MAX_IMAGE_SIZE);
    blob = result.blob;
    size = Vec.div(result.size, IMAGE_DOWNSCALE_FACTOR);
  }

  URL.revokeObjectURL(image.src);

  try {
    await put(mutables.fileStoreDB, {
      blob,
      itemId: id,
    });
  } catch (error) {
    console.error('error saving file', error);
  }

  return { id, size };
}

// turns a filestore://id url into an objectUrl with the image read from idb
export function useFilestore(fileStoreDB?: FileStoreDB, url?: string) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      console.debug('no url provided');
      return;
    }

    if (!url?.includes('filestore://')) {
      console.debug('not a filestore url', url);
      setObjectUrl(url);
      return;
    }

    if (!fileStoreDB) {
      console.debug('could not convert blob to dataUrl, no fileStoreDB');
      return;
    }

    const [_, id] = url.split('filestore://');

    get(fileStoreDB, id).then((file) => {
      if (!file || !file.blob) {
        // todo handle this in the UI
        console.debug('file not found', url, file);
        setObjectUrl(null);
        return;
      }

      setObjectUrl(URL.createObjectURL(file.blob));
    });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [fileStoreDB, url]);

  return objectUrl;
}
