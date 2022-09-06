import React from 'react';
export function Base(props: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={props.className} style={props.style}>
      {props.children}
    </div>
  );
}
