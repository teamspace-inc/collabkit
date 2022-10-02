import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { MentionsTypeaheadItem } from './MentionsPlugin';

export const Item = () => (
  <MentionsTypeaheadItem
    index={1}
    isSelected={false}
    onClick={() => {}}
    onMouseEnter={() => {}}
    query={'foo'}
    result={{
      color: 'amber',
      id: '1',
      workspaceId: 'acme',
      name: 'John Doe',
      email: 'john@example.com',
    }}
  />
);

export const SelectedItem = () => (
  <MentionsTypeaheadItem
    index={1}
    isSelected={true}
    onClick={() => {}}
    onMouseEnter={() => {}}
    query={'foo'}
    result={{
      color: 'amber',
      id: '1',
      workspaceId: 'acme',
      name: 'John Doe',
      email: 'john@example.com',
    }}
  />
);

export default {
  decorators: [
    (Component) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Component />
        </div>
      );
    },
  ] as StoryDecorator[],
};
