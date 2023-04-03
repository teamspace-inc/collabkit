import React, { useCallback, useEffect, useRef } from 'react';
import { Avatar, AVATAR_SIZE } from './Avatar';
import { ClientColor } from '../utils/Colors';
import { animate } from 'motion';
import { styled } from 'styles/stitches.config';
import { Z } from 'state/constants';
import * as Tooltip from './Tooltip';
import { animationOptions } from 'styles/animationOptions';

const PositionedFace = styled('div', {
  position: 'absolute',
  display: 'inline-block',
  borderRadius: AVATAR_SIZE,
  border: '2px solid white',
});

interface FaceProps {
  id: string;
  clientId: string; // local client id
  clientColor: ClientColor | null;
  followingId: string | null;
  index: number;
  followingIndex: number;
  length: number;
  onClickFace: (e: React.MouseEvent, clientId: string) => void;
}

function Face({
  id,
  clientId,
  index,
  followingId,
  length,
  followingIndex,
  clientColor,
  onClickFace,
}: FaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  let pos = index; // start from 1;

  if (id === followingId) {
    pos = length + 1; // if this client is being followed, make it show up at the end
  }

  // if this client is after the one being followed, move it one to the right so it occupies the same place as the one being followed
  if (followingId && index > followingIndex) {
    pos = pos - 1;
  }

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClickFace(e, id);
    },
    [id, onClickFace]
  );

  useEffect(() => {
    const x = `-${pos * 66.6}%`;

    if (ref.current) {
      animate(
        ref.current,
        {
          transform: `translateX(${x})`,
        },
        animationOptions
      );
    }
  }, [ref.current, pos]);

  return id === clientId ? (
    <PositionedFace
      ref={ref}
      onClick={handleClick}
      id={id}
      data-test-id={id !== clientId ? 'facepile-face' : 'facepile-face-self'}
      style={{
        zIndex: length - index,
      }}
    >
      <Avatar color={clientColor || 'sand'} />
    </PositionedFace>
  ) : (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PositionedFace
          ref={ref}
          onClick={handleClick}
          id={id}
          data-test-id={id !== clientId ? 'facepile-face' : 'facepile-face-self'}
          style={{
            zIndex: length - index,
          }}
        >
          <Avatar color={clientColor || 'sand'} />
        </PositionedFace>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">
        {followingId === id ? 'Unfollow' : 'Follow'}
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

const FacepileWrapper = styled('div', {
  position: 'absolute',
  top: 'calc($space$1 + 2px)', // 4px extra so it is in line with the Name and other elements
  right: `calc(${AVATAR_SIZE}px + $space$2)`,
  zIndex: Z.CANVAS_TOOL,
});

interface FacepileProps {
  clientId: string;
  clientIds: string[];
  followingId: string | null;
  clientColors: Record<string, ClientColor | null>;
  onClickFace: (e: React.MouseEvent, clientId: string) => void;
}

export const Facepile = React.memo(function Facepile({
  clientId,
  clientIds,
  followingId,
  clientColors,
  onClickFace,
}: FacepileProps) {
  const ids = clientIds.filter((id) => id !== clientId && clientColors[id]);
  const followingIndex = followingId ? ids.indexOf(followingId) : 999;
  ids.unshift(clientId);

  return (
    <FacepileWrapper>
      <div>
        {ids
          .map((id, i) => (
            <Face
              onClickFace={onClickFace}
              clientColor={clientColors[id]}
              key={id}
              id={id}
              clientId={clientId}
              index={i}
              followingIndex={followingIndex}
              followingId={followingId}
              length={ids.length}
            />
          ))
          .filter(Boolean)}
      </div>
    </FacepileWrapper>
  );
});
