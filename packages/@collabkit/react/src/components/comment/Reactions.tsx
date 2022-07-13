import React from 'react';
import { styled } from '../UIKit';
import { useApp } from '../Provider';
import { Event } from '../../constants';

const StyledReactions = styled('div', {
  background: 'white',
  display: 'inline-flex',
  flex: 1,
  gap: 3,
  position: 'absolute',
  right: 5,
  bottom: -15,
  fontSize: 15,
  lineHeight: '15px',
  borderRadius: '15px',
  width: 'auto',
  padding: '2px 3px',
  boxShadow: `0px 1px 0px rgba(0,0,0,0.075), 0px 1px 3px rgba(0,0,0,0.05)`,
  cursor: 'pointer',
});

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
