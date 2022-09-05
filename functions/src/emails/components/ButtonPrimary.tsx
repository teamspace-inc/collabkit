import React from 'react';

import { MjmlButton } from 'mjml-react';

type ButtonPrimaryProps = {
  link: string;
  uiText: string;
  color?: string;
};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ link, uiText, color }) => {
  return (
    <>
      <MjmlButton
        lineHeight={'22px'}
        fontSize={'14px'}
        fontWeight={600}
        height={44}
        padding="20px 24px"
        align="left"
        href={link}
        backgroundColor={color}
        borderRadius={'6px'}
        cssClass="light-mode"
      >
        {uiText}
      </MjmlButton>
    </>
  );
};

export default ButtonPrimary;
