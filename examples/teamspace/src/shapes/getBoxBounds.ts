import { Utils, TLBounds } from '@tldraw/core';

type Dimensions = { point: number[]; size: number[] };

const boxBoundsCache = new WeakMap<Dimensions, TLBounds>();

export default function getBoxBounds(dimensions: Dimensions): TLBounds {
  const bounds = Utils.getFromCache(boxBoundsCache, dimensions, () => {
    const [width, height] = dimensions.size || [1000, 1000];

    return {
      minX: 0,
      maxX: width,
      minY: 0,
      maxY: height,
      width,
      height,
    } as TLBounds;
  });

  return Utils.translateBounds(bounds, dimensions.point);
}
