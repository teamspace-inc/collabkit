import React from 'react';

import { MjmlButton } from 'mjml-react';
import { black, grayLight } from './theme';

type ButtonPrimaryProps = {
  link: string;
  uiText: string;
};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ link, uiText }) => {
  return (
    <>
      <MjmlButton
        lineHeight={'22px'}
        fontSize={'20px'}
        fontWeight={500}
        height={32}
        padding="20px 24px"
        align="left"
        href={link}
        backgroundColor={black}
        borderRadius={'50px'}
        cssClass="light-mode"
      >
        {uiText}
      </MjmlButton>
      <MjmlButton
        lineHeight={'22px'}
        fontSize={'20px'}
        fontWeight={500}
        height={32}
        padding="20px 24px"
        align="left"
        href={link}
        backgroundColor={grayLight}
        color={black}
        borderRadius={'50px'}
        cssClass="dark-mode"
      >
        {uiText}
      </MjmlButton>
    </>
  );
};

export default ButtonPrimary;
