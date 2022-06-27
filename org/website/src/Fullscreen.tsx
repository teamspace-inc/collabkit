import React from 'react';

export function Fullscreen(props: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', flex: 1 }}>
      <style type="text/css">{`body, html, #root { overflow: hidden; width: 100%; height: 100%; }`}</style>
      {props.children}
    </div>
  );
}
