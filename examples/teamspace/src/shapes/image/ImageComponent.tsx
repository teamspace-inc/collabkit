import { TLShapeUtil, HTMLContainer } from '@tldraw/core';
import { useFilestore } from '../../utils/File';
import { useSnapshot } from 'valtio';

import { ImageShape, shapeUtils } from '..';
import { styled } from '@stitches/react';
import { blackA, whiteA } from '@radix-ui/colors';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { mutables } from 'state/mutables';
import { useMemo } from 'react';
import { useSpaceContext } from '../../hooks/useSpaceContext';
import { ImageItem, Z } from 'state/constants';

const forceHardwareAcceleration = {
  willChange: 'transform',
};

const Progress = styled(ProgressPrimitive.Root, {
  position: 'absolute',
  overflow: 'hidden',
  background: blackA.blackA11,
  borderRadius: '3px',
  width: 100,
  left: 'calc(50% - 50px)',
  height: 6,
  top: 'calc(50% - 3px)',
  zIndex: Z.SHAPE_OVERLAY,
});

const ProgressIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: whiteA.whiteA12,
  height: '100%',
  transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});

export const ImageComponent = TLShapeUtil.Component<ImageShape, HTMLDivElement>(
  function ImageComponent({ shape, events }, ref) {
    const { store } = useSpaceContext();
    const { url } = useSnapshot(store.items[shape.id] as ImageItem);
    const bounds = shapeUtils.image.getBounds(shape);
    const imageUrl = useFilestore(mutables.fileStoreDB, url);
    const showProgress = shape.fileUploadProgress && shape.fileUploadProgress < 100;
    return useMemo(() => {
      return (
        <HTMLContainer
          data-testid="ImageComponent"
          ref={ref}
          {...events}
          style={forceHardwareAcceleration}
        >
          {showProgress && (
            <Progress>
              <ProgressIndicator style={{ width: `${shape.fileUploadProgress}%` }} />
            </Progress>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              style={{
                pointerEvents: 'all',
                width: bounds.width,
                ...forceHardwareAcceleration,
              }}
            ></img>
          )}
        </HTMLContainer>
      );
    }, [url, bounds.width, imageUrl, showProgress, shape.fileUploadProgress]);
  }
);
