import React from 'react';
import { useApp } from '../hooks/useApp';
import { SidebarButtonType, ChannelActonButtonTarget, ThreadResolveButtonTarget } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { ArrowBendUpLeft, CheckCircle, DotsThree, Smiley } from './icons';
import * as styles from '../theme/components/ChannelActionButton.css';


export function ChannelActionButton(props: {
  className?: string;
  type: SidebarButtonType;
}) {
  const { events } = useApp();
  const { threadId, workspaceId } = useThreadContext();

  const target: ChannelActonButtonTarget = {
    threadId,
    workspaceId,
    type: props.type,
  };
  const className = props.className ?? styles.button();

  return (
    <div
      className={className}
      onPointerDown={(e) =>
        events.onPointerDown(e, {
          target,
        })
      }
    >
      {props.type === 'resolveThreadButton' ?
        <CheckCircle size={16} />
        : null}
      {props.type === 'sidebarReplyButton' ?
        <ArrowBendUpLeft size={16} /> :
        null}
      {props.type === 'sidebarElementOptionsButton' ?
        <DotsThree size={16} /> :
        null}
      {props.type === 'sidebarEmojiButton' ?
        <Smiley size={16} /> :
        null}
    </div>
  );
}