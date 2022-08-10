import React from 'react';

import { MjmlSection, MjmlColumn, MjmlText } from 'mjml-react';
import { grayDark, textSm } from './theme';

export default function Footer() {
  return (
    <MjmlSection cssClass="smooth">
      <MjmlColumn>
        <MjmlText cssClass="footer" padding="12px 24px 48px" fontSize={textSm} color={grayDark}>
          <a href="#" target="_blank">
            Turn off notifications for this thread
          </a>
          <br />
          <br />© 2022 CollabKit
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}
