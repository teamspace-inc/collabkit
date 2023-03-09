import React from 'react';
import { Button } from './Button';
import { root } from '../theme/components/ButtonGroup.css';

export function ButtonGroup(props: {
  onCancel: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
  confirmButtonEnabled: boolean;
  confirmButtonText: string;
}) {
  return (
    <div className={root}>
      <Button
        type="secondary"
        onClick={props.onCancel}
        data-testid="collabkit-button-group-cancel-button"
      >
        Cancel
      </Button>
      <Button
        type="primary"
        disabled={!props.confirmButtonEnabled}
        onClick={props.onConfirm}
        data-testid="collabkit-button-group-confirm-button"
      >
        {props.confirmButtonText}
      </Button>
    </div>
  );
}
