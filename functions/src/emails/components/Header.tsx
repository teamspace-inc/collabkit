import React from 'react';
import { MjmlSection, MjmlColumn, MjmlImage } from 'mjml-react';

type HeaderProps = {
  logoUrl?: string;
  big?: boolean;
};

const Header: React.FC<HeaderProps> = ({ logoUrl }) => {
  return (
    <MjmlSection padding={'48px 24px 0'}>
      <MjmlColumn>
        <MjmlImage
          padding="0 24px 0"
          width={'122px'}
          align="center"
          src={logoUrl}
          cssClass="logo light-mode"
        />
      </MjmlColumn>
    </MjmlSection>
  );
};

export default Header;
