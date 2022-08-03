import React from 'react';
import LogoSvg from './assets/Logo.svg';

export function Logo(props: {
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <img
      {...props}
      src={LogoSvg}
      style={{
        height: '1.5rem',
        position: 'relative',
        cursor: 'pointer',
        top: window.innerWidth > 640 ? '0.15rem' : 0,
        ...props.style,
      }}
    />
  );
}
