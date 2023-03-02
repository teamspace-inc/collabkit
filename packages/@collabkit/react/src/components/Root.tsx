import React, { ComponentPropsWithoutRef, useMemo } from 'react';
import { collabkit } from '../theme/components/Root.css';

export function Root(props: ComponentPropsWithoutRef<'div'>) {
  const className = useMemo(
    () => [collabkit, props.className].filter((className) => !!className).join(' '),
    [props.className]
  );
  return <div {...props} className={className} />;
}
