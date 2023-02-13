import React from 'react';
import * as styles from '../theme/components/EmojiPicker.css';
import { Scrollable } from './Scrollable';
import type { Emoji as EmojiType } from '@collabkit/core';
import { Emoji } from './Emoji';
import EMOJIS from './emojis';

export const EMOJI_U = Object.keys(EMOJIS).reduce<{ [emojiU: string]: EmojiType }>(
  (acc, category) => {
    EMOJIS[category as keyof typeof EMOJIS].forEach((emoji) => {
      acc[emoji.u] = emoji;
    });
    return acc;
  },
  {}
);

const CATEGORIES: { [key in keyof typeof EMOJIS]: string } = {
  popular: 'Popular',
  smileys_people: 'Smileys & People',
  animals_nature: 'Animals & Nature',
  food_drink: 'Food & Drink',
  travel_places: 'Travel & Places',
  activities: 'Activities',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
};

function Category(props: {
  title: string;
  emojis: EmojiType[];
  onClick: (e: React.MouseEvent, emoji: EmojiType) => void;
}) {
  return (
    <div className={styles.category}>
      {/* <div className={styles.categoryTitle}>{props.title}</div> */}
      <EmojiGrid onClick={props.onClick} emojis={props.emojis} />
    </div>
  );
}

function EmojiGrid(props: {
  emojis: EmojiType[];
  onClick: (e: React.MouseEvent, emoji: EmojiType) => void;
}) {
  return (
    <div className={styles.emojiGrid}>
      {(props.emojis as EmojiType[])
        .filter((emoji: EmojiType) => emoji.u)
        .map((emoji, i) => {
          return <Emoji onClick={props.onClick} emoji={emoji} key={i} />;
        })}
    </div>
  );
}

type EmojiPickerProps = {
  onClick: (e: React.MouseEvent, emoji: EmojiType) => void;
};

function Root(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={styles.root()} {...props}>
      {props.children}
    </div>
  );
}

export const EmojiPicker = React.memo(function EmojiPicker(props: EmojiPickerProps) {
  return (
    <Root>
      <Scrollable>
        {Object.keys(EMOJIS)
          .filter((key) => key === 'popular')
          .map((key) => (
            <Category
              onClick={props.onClick}
              key={key}
              title={CATEGORIES[key as keyof typeof EMOJIS]}
              emojis={EMOJIS[key as keyof typeof EMOJIS]}
            />
          ))}
      </Scrollable>
    </Root>
  );
});
