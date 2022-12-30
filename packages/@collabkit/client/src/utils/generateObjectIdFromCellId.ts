import { ThreadInfo } from '@collabkit/core';

export function generateObjectIdFromCellId(info: ThreadInfo) {
  const meta = info.meta;
  const cellId = meta?.cellId;
  if (!cellId) {
    return info;
  } else {
    return {
      ...info,
      meta: {
        ...meta,
        objectId: cellId,
      },
    };
  }
}
