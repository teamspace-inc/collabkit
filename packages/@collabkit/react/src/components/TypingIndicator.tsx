import React from 'react';
import { useSnapshot } from 'valtio';
import type { Profile } from '@collabkit/core';
import { typing } from '../theme/components/Composer.css';
import { useComposerStore } from '../hooks/useComposerStore';
import { useStore } from '../hooks/useStore';
import { useUserContext } from '../hooks/useUserContext';

function getNames(props: {
  isBot: boolean;
  userId: string;
  isTyping?: { [userId: string]: boolean };
  profiles: { [profileId: string]: Profile | undefined };
}) {
  const isTyping = props.isTyping;
  if (isTyping == null) {
    return [];
  }
  const ids = Object.keys(isTyping).filter(
    (id) =>
      id !== props.userId &&
      isTyping[id] === true &&
      (props.profiles[id]?.isBot ?? false) === props.isBot
  );
  return ids
    .map((id) => props.profiles[id]?.name || props.profiles[id]?.email)
    .filter((name): name is string => typeof name === 'string' && !!name);
}

const TypingIndicatorText = function TypingIndicatorText({
  names,
  verb = 'typing',
}: {
  names: string[];
  verb?: string;
}) {
  if (names.length === 0) return <div />;
  if (names.length === 1)
    return (
      <div>
        <span>{names[0]}</span> is {verb}…
      </div>
    );
  if (names.length === 2)
    return (
      <div>
        <span>{names[0]}</span> and <span>{names[1]}</span> are {verb}…
      </div>
    );
  if (names.length === 3)
    return (
      <div>
        <span>{names[0]}</span>, <span>{names[1]}</span> and <span>{names[2]}</span> are {verb}…
      </div>
    );
  return (
    <div>
      <span>{names[0]}</span>, <span>{names[1]}</span> and <span>{names.length - 2} others</span>{' '}
      are {verb}…
    </div>
  );
};

function ComposerTypingIndicator(props: { className?: string }) {
  const { isTyping } = useSnapshot(useComposerStore());
  const { profiles } = useSnapshot(useStore());
  const userId = useUserContext();
  const names = getNames({ isBot: false, userId, isTyping, profiles });
  const botNames = getNames({ isBot: true, userId, isTyping, profiles });
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
      <TypingIndicatorText names={botNames} verb="thinking" />
    </div>
  );
}

export { ComposerTypingIndicator };
