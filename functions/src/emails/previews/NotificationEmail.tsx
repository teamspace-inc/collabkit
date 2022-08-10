import React from 'react';

import NotificationEmail from '../NotificationEmail';

export function newComment() {
  return (
    <NotificationEmail
      body={
        <>
          <b style={{ fontSize: '14px', lineHeight: '16px', fontWeight: '700' }}>
            Dominic mentioned you in a comment on 'Headless UI'
          </b>
          <br />
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '400',
              lineHeight: '38px',
              marginBottom: '0px',
              marginTop: '16px',
            }}
          >
            "What does Headless UI mean? @Alicia"
          </h1>
        </>
      }
      ctaText="View the comment"
    />
  );
}
