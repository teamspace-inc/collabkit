import { styled } from '@stitches/react';
import { CornersOut } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { Z } from 'state/constants';
import { useSpaceEvents } from '../events';
import { useSpaceContext } from '../hooks/useSpaceContext';
import { IconButton } from 'components/IconButton';
import { animationOptions } from 'styles/animationOptions';
import { getOSMetaKeySymbol } from 'state/helpers';
import { Hint } from 'components/Tooltip';

type ZoomControlsProps = {
  zoom: number;
  disabled?: boolean;
};

const Wrapper = styled('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  fontVariant: 'tabular-nums',
  fontSize: '13px',
  fontWeight: '400',
  lineHeight: '33px',
  left: '$space$0',
  bottom: '$space$0',
  margin: '$space$0',
  zIndex: Z.CANVAS_TOOL,
});

const ZoomLevel = styled('div', {
  padding: '0px $radii$1',
  color: '$colors$secondaryText',
});

const HIDE_ZOOM_AFTER_MS = 2500;

export function ZoomControls({ zoom, disabled }: ZoomControlsProps) {
  const [showZoom, setShowZoom] = useState(false);
  const timeoutID = useRef<any>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowZoom(true);
    timeoutID.current = setTimeout(() => {
      setShowZoom(false);
    }, HIDE_ZOOM_AFTER_MS);
    return () => clearTimeout(timeoutID.current);
  }, [zoom]);

  useEffect(() => {
    if (ref.current) {
      animate(
        ref.current,
        {
          opacity: showZoom ? 1 : 0,
        },
        animationOptions
      );
    }
  }, [showZoom]);

  const { onZoomToFitClick } = useSpaceEvents(useSpaceContext().store);

  return (
    <Wrapper>
      <IconButton
        disabled={disabled}
        onPointerDown={onZoomToFitClick}
        tooltip={
          <>
            Zoom to Fit <Hint>{getOSMetaKeySymbol()} + 2</Hint>
          </>
        }
      >
        <CornersOut />
      </IconButton>
      <ZoomLevel ref={ref} data-test-id="zoom-controls">
        {(zoom * 100).toFixed(0)}%
      </ZoomLevel>
    </Wrapper>
  );
}
