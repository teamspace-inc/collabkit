import React from 'react';
import { theme } from './UIKit';

export function Theme(props: { children: React.ReactNode }) {
  return (
    <div className={theme} style={{ display: 'flex', flex: 1, height: '100%' }}>
      {props.children}
    </div>
  );
}
