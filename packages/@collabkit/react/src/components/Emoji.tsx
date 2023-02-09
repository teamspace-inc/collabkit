import React from 'react';
import * as styles from '../theme/components/EmojiPicker.css';
import { Emoji as EmojiType } from '@collabkit/core';

export function Emoji(props: {
  className?: string;
  emoji: EmojiType;
  onClick?: (e: React.MouseEvent, emoji: EmojiType) => void;
}) {
  return (
    <span
      className={props.className ?? styles.emoji}
      onClick={(e) => props.onClick?.(e, props.emoji)}
    >
      {props.emoji.u
        .split('-')
        .map((hex) => String.fromCodePoint(parseInt(hex, 16)))
        .join('')}
    </span>
  );
}
