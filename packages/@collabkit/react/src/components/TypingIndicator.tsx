import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import type { Profile } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { typing } from '../theme/components/Composer.css';

function getNames(props: {
  userId: string;
  isTyping?: { [userId: string]: boolean };
  profiles: { [profileId: string]: Profile | undefined };
}) {
  const isTyping = props.isTyping;
  if (isTyping == null) {
    return [];
  }
  const ids = Object.keys(isTyping).filter((id) => id !== props.userId && isTyping[id] === true);
  return ids
    .map((id) => props.profiles[id]?.name || props.profiles[id]?.email)
    .filter((name): name is string => typeof name === 'string' && !!name);
}

const TypingIndicatorText = function TypingIndicatorText({ names }: { names: string[] }) {
  if (names.length === 0) return <div />;
  if (names.length === 1)
    return (
      <div>
        <span>{names[0]}</span> is typing…
      </div>
    );
  if (names.length === 2)
    return (
      <div>
        <span>{names[0]}</span> and <span>{names[1]}</span> are typing…
      </div>
    );
  if (names.length === 3)
    return (
      <div>
        <span>{names[0]}</span>, <span>{names[1]}</span> and <span>{names[2]}</span> are typing…
      </div>
    );
  return (
    <div>
      <span>{names[0]}</span>, <span>{names[1]}</span> and <span>{names.length - 2} others</span>{' '}
      are typing…
    </div>
  );
};

export function ComposerTypingIndicator(props: { className?: string }) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store } = useApp();
  const { profiles, workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  const isTyping = workspace?.composers[threadId].default.isTyping;
  const names = getNames({ userId, isTyping, profiles });
  const nodeRef = React.useRef(null);

  return (
    // <TransitionGroup style={{ flexBasis: '100%', height: 18 }}>
    //   {names.length
    //     ? [
    //         <CSSTransition key="" timeout={300} classNames={transitionClassNames} nodeRef={nodeRef}>
    //           <div ref={nodeRef} className={props.className}>
    //             <TypingIndicatorText names={names} />
    //           </div>
    //         </CSSTransition>,
    //       ]
    //     : []}
    // </TransitionGroup>
    <div
      data-testid="collabkit-typing-indicator"
      ref={nodeRef}
      className={props.className ?? typing}
    >
      <TypingIndicatorText names={names} />
    </div>
  );
}
