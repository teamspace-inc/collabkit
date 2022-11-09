import React from 'react';
import LogoLightSvg from './assets/LogoLight.svg';
import LogoDarkSvg from './assets/LogoDark.svg';

export function LogoImg(
  props: {
    theme: 'light' | 'dark';
  } & React.ComponentPropsWithoutRef<'img'>
) {
  return (
    <img
      style={{
        position: 'relative',
        cursor: 'pointer',
        top: window.innerWidth > 640 ? '0.15rem' : 0,
        ...props.style,
      }}
      {...props}
      src={props.theme === 'light' ? LogoLightSvg : LogoDarkSvg}
    />
  );
}
