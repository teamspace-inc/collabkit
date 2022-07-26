import { nanoid } from 'nanoid';
import React from 'react';
import * as CollabKit from '../';

export const Pin = () => {
  const id = nanoid();
  return <CollabKit.PurePin hasUnread={false} profile={{ name: 'N' }} isTyping={{}} />;
};

export const PinTyping = () => {
  const id = nanoid();
  return <CollabKit.PurePin hasUnread={false} profile={{ name: 'N' }} isTyping={{ foo: true }} />;
};
