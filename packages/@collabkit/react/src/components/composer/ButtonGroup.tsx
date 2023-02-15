import React from 'react';
import * as styles from '../../theme/components/Composer.css';

export function ButtonGroup(props: { className?: string; children: React.ReactNode }) {
  return <div className={props.className ?? styles.buttonGroup}>{props.children}</div>;
}
