import React from 'react';
import LogoLightSvg from './assets/LogoLight.svg';
import LogoDarkSvg from './assets/LogoDark.svg';

export function Logo(props: {
  theme: 'light' | 'dark';
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <img
      {...props}
      src={props.theme === 'light' ? LogoLightSvg : LogoDarkSvg}
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
