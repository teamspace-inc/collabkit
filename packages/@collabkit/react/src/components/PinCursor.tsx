import React, { forwardRef } from 'react';
import { ProfileAvatar, ProfileProvider } from './Profile';
import * as styles from '../theme/components/Pin.css';
import { useUserContext } from '../hooks/useUserContext';
import { PinIconSVG } from './PinIcon';

export const PinCursor = forwardRef<HTMLDivElement, { isSelected: boolean }>(function PinCursor(
  props,
  ref
) {
  const userId = useUserContext();
  return (
    <ProfileProvider profileId={userId}>
      <div
        className={`collabkit ${styles.pin({ pointerEvents: 'none' })}`}
        data-testid="collabkit-pin-marker"
        ref={ref}
      >
        <PinIconSVG isSelected={props.isSelected} />
        <div className={styles.pinAvatar}>
          <ProfileAvatar />
        </div>
      </div>
    </ProfileProvider>
  );
});
