import { AddCommentButtonTarget } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { IconButton } from './IconButton';

export function AddCommentButton() {
  const { events, store } = useApp();
  const { workspaceId, uiState } = useSnapshot(store);

  if (!workspaceId) return null;

  const target: AddCommentButtonTarget = {
    type: 'addCommentButton',
    workspaceId,
  };

  console.log();

  return (
    <IconButton
      data-testid="collabkit-add-comment-button"
      onPointerDown={(e: React.PointerEvent) => events.onPointerDown(e, { target })}
    >
      {uiState === 'selecting' ? <AddPinActiveIcon /> : <AddPinIcon />}
    </IconButton>
  );
}

function AddPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99917 2.05084L7.99917 2.55084L7.99917 2.05084C7.28357 2.05084 6.57499 2.19179 5.91387 2.46563L6.10521 2.92757L5.91387 2.46563C5.25274 2.73948 4.65203 3.14086 4.14603 3.64686L4.14602 3.64687C3.64002 4.15287 3.23864 4.75358 2.9648 5.4147C2.69095 6.07582 2.55001 6.78441 2.55 7.5C2.55 8.21559 2.69095 8.92418 2.9648 9.5853C3.23864 10.2464 3.64002 10.8471 4.14602 11.3531L7.35398 14.5611C7.5251 14.7322 7.75718 14.8283 7.99917 14.8283C8.24116 14.8283 8.47324 14.7322 8.64435 14.5611L11.8523 11.3531C12.8742 10.3312 13.4483 8.9452 13.4483 7.5C13.4483 6.0548 12.8742 4.66878 11.8523 3.64687L11.8523 3.64686C11.3463 3.14086 10.7456 2.73948 10.0845 2.46563C9.42335 2.19179 8.71476 2.05084 7.99917 2.05084Z"
        fill="#888888"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="7.5" y="4.5" width="1" height="6" rx="0.5" fill="white" />
      <rect x="11" y="7" width="1" height="6" rx="0.5" transform="rotate(90 11 7)" fill="white" />
    </svg>
  );
}

function AddPinActiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99917 2.05084L7.99917 2.55084L7.99917 2.05084C7.28357 2.05084 6.57499 2.19179 5.91387 2.46563L6.10521 2.92757L5.91387 2.46563C5.25274 2.73948 4.65203 3.14086 4.14603 3.64686L4.14602 3.64687C3.64002 4.15287 3.23864 4.75358 2.9648 5.4147C2.69095 6.07582 2.55001 6.78441 2.55 7.5C2.55 8.21559 2.69095 8.92418 2.9648 9.5853C3.23864 10.2464 3.64002 10.8471 4.14602 11.3531L7.35398 14.5611C7.5251 14.7322 7.75718 14.8283 7.99917 14.8283C8.24116 14.8283 8.47324 14.7322 8.64435 14.5611L11.8523 11.3531C12.8742 10.3312 13.4483 8.9452 13.4483 7.5C13.4483 6.0548 12.8742 4.66878 11.8523 3.64687L11.8523 3.64686C11.3463 3.14086 10.7456 2.73948 10.0845 2.46563C9.42335 2.19179 8.71476 2.05084 7.99917 2.05084Z"
        fill="#3494FA"
        stroke="#3494FA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.76953"
        y="5.02539"
        width="1"
        height="6"
        rx="0.5"
        transform="rotate(45 9.76953 5.02539)"
        fill="white"
      />
      <rect
        x="10.4766"
        y="9.26758"
        width="1"
        height="6"
        rx="0.5"
        transform="rotate(135 10.4766 9.26758)"
        fill="white"
      />
    </svg>
  );
}
