import React from 'react';
import LogoSvg from './assets/Logo.svg';

export function Logo(props: { style?: React.CSSProperties }) {
  return (
    <img
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
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
