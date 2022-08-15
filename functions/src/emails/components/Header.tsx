import React from 'react';
import { MjmlSection, MjmlColumn, MjmlImage } from 'mjml-react';

type HeaderProps = {
  big?: boolean;
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <MjmlSection padding={'48px 24px 0'}>
      <MjmlColumn>
        <MjmlImage
          padding="0 24px 0"
          width={'122px'}
          height={'20px'}
          align="left"
          src="https://firebasestorage.googleapis.com/v0/b/collabkit-dev.appspot.com/o/Logo.png?alt=media&token=bdcb52d0-e216-425b-8482-fed9890a963c"
          cssClass="logo light-mode"
        />
        <MjmlImage
          padding="0 24px 0"
          width={'122px'}
          height={'20px'}
          align="left"
          src="https://firebasestorage.googleapis.com/v0/b/collabkit-dev.appspot.com/o/Logo-white.png?alt=media&token=3a86d0fe-1165-4c63-8748-821fccbb01f0"
          cssClass="logo dark-mode"
        />
      </MjmlColumn>
    </MjmlSection>
  );
};

export default Header;
