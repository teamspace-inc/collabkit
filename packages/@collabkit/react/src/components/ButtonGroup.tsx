import React from 'react';
import { Button } from './Button';
import { root } from '../theme/components/ButtonGroup.css';

export function ButtonGroup(props: {
  onCancel: (e: React.PointerEvent) => void;
  onConfirm: (e: React.PointerEvent) => void;
  confirmButtonEnabled: boolean;
  confirmButtonText: string;
}) {
  return (
    <div className={root}>
      <Button
        type="secondary"
        text="Cancel"
        onPointerDown={props.onCancel}
        data-testid="collabkit-button-group-cancel-button"
      />
      <Button
        type="primary"
        text={props.confirmButtonText}
        disabled={!props.confirmButtonEnabled}
        onPointerDown={props.onConfirm}
        data-testid="collabkit-button-group-confirm-button"
      />
    </div>
  );
}
