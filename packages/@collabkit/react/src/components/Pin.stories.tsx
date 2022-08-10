import React from 'react';
import * as CollabKit from '../';

export const Pin = () => {
  return (
    <CollabKit.PurePin
      currentUserId="any-user"
      hasUnread={false}
      profile={{ name: 'N' }}
      isTyping={{}}
    />
  );
};

export const PinTyping = () => {
  return (
    <CollabKit.PurePin
      currentUserId="any-user"
      hasUnread={false}
      profile={{ name: 'N' }}
      isTyping={{ foo: true }}
    />
  );
};
