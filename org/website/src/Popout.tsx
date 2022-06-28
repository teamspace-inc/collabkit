import React from 'react';

export function Popout(props: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', flex: 1 }}>
      <style type="text/css">{`body, html, #root { overflow: hidden; width: 100%; height: 100%; }`}</style>
      <div
        style={{
          position: 'fixed',
          left: '28vw',
          top: '20vh',
          width: '300px',
          height: '600px',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
