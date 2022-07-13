import React from 'react';
import { useApp } from './Provider';
import { styled } from './UIKit';

// Evan from LiveFlow suggested a HOC as a way to
// create 'Commentable' things, this is a quick sketch
// for how that might work.
// using `withComments` wraps a component in a `Commentable`

const StyledWithComments = styled('div', {
  variants: {
    hasComments: {
      true: {
        border: '1px solid red',
      },
    },
    newComments: {
      true: {
        border: '1px solid green',
      },
    },
  },
});

export function withComments<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const { store } = useApp();
    if (!store) {
      return null;
    }
    const hasComments = true;
    const newComments = true;

    return (
      <StyledWithComments hasComments={hasComments} newComments={newComments}>
        <Component {...props} />
      </StyledWithComments>
    );
  };
}
