import { getRandomColor } from '@collabkit/colors';
import { ThemeProvider } from '@collabkit/react';
import React from 'react';
import { component, card } from '../styles/docs/Docs.css';

export function ComponentCard(props: {
  component: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <ThemeProvider theme="dark">
      <div className={component}>
        {/* <H3 className={componentTitle}>{props.title}</H3> */}
        <div className={card}>{props.component}</div>
        {/* <div style={{ textAlign: 'left', marginTop: '16px' }}>
          <p className={componentDescription}>{props.description}</p>
        </div> */}
      </div>
    </ThemeProvider>
  );
}
