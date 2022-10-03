import React from 'react';
import { Profile as ProfileType } from '@collabkit/core';
import * as Profile from './Profile';
import * as styles from '../styles/Facepile.css';

export function Facepile(
  props: {
    profiles: ProfileType[] | readonly ProfileType[];
  } & React.ComponentPropsWithoutRef<'div'>
) {
  return (
    <div className={styles.root} {...props}>
      {props.profiles.map((profile, index) => {
        return profile ? (
          <div
            key={profile.id}
            className={styles.avatarWrap}
            style={{
              zIndex: 999 - index,
            }}
          >
            <Profile.Provider profileId={profile.id}>
              <Profile.Avatar size={24} />
            </Profile.Provider>
          </div>
        ) : null;
      })}
    </div>
  );
}
