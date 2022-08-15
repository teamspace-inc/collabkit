import React from 'react';
import { useApp } from '../../hooks/useApp';
import { Event } from '../../constants';
import { styled } from '@stitches/react';
import { reactionStyles } from '@collabkit/theme';

const StyledReactions = styled('div', reactionStyles.reactions);

export function Reactions(props: { reactions: { [createdById: string]: Event } }) {
  const { store } = useApp();
  if (!store) {
    return null;
  }
  // const { profiles } = useSnapshot(store);

  return hasReactions(props.reactions) ? (
    <StyledReactions>
      {Object.keys(props.reactions).map((createdById, i) =>
        props.reactions[createdById].body.length > 0 ? (
          <div key={i}>
            {props.reactions[createdById].body}
            {/* <StyledReactionProfileName>{profiles[createdById].name}</StyledReactionProfileName> */}
          </div>
        ) : null
      )}
    </StyledReactions>
  ) : null;
}

export function hasReactions(reactions: { [createdById: string]: Event } | null | undefined) {
  return (
    reactions &&
    Object.keys(reactions).length > 0 &&
    Object.keys(reactions).filter((createdById) => reactions[createdById].body.length > 0).length >
      0
  );
}
