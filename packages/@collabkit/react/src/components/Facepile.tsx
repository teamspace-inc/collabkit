import React from 'react';
import { Profile as ProfileType } from '@collabkit/core';
import Profile from './Profile';
import * as styles from '../styles/components/Facepile.css';

const MAX_NUM_PROFILES = 4;

export function Facepile(
  props: {
    users: ProfileType[] | readonly ProfileType[];
    hover?: boolean;
    size?: string;
  } & React.ComponentPropsWithoutRef<'div'>
) {
  const { hover, ...otherProps } = props;
  const profiles = props.users.slice(0, MAX_NUM_PROFILES - 1);
  const overflowsBy = props.users.length > 4 ? props.users.length - MAX_NUM_PROFILES : 0;
  // const overflowsWith = props.profiles.slice(MAX_NUM_PROFILES, -1);

  return (
    <div className={styles.root} {...otherProps}>
      {profiles.map((profile, index) => {
        return profile ? (
          <div
            key={profile.id}
            className={styles.avatarWrap({ hover: !!hover })}
            style={{
              zIndex: 999 - index,
            }}
          >
            <Profile.Provider profileId={profile.id}>
              <Profile.Avatar size={props.size} />
            </Profile.Provider>
          </div>
        ) : null;
      })}
      {overflowsBy > 0 ? (
        <div
          className={styles.avatarWrap({ hover: !!hover })}
          style={{
            zIndex: 999 - profiles.length,
          }}
        >
          <Profile.NumberdAvatarPlaceholder size={props.size} number={overflowsBy} />
        </div>
      ) : null}
    </div>
  );
}
