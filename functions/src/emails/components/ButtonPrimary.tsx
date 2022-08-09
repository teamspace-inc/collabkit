import React from 'react';

import { MjmlButton } from 'mjml-react';
import { black, grayLight, textSm } from './theme';
import { leadingTight, textBase, borderBase } from './theme';

type ButtonPrimaryProps = {
  link: string;
  uiText: string;
};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ link, uiText }) => {
  return (
    <>
      <MjmlButton
        lineHeight={leadingTight}
        fontSize={textSm}
        fontWeight={'700'}
        height={32}
        padding="0"
        align="left"
        href={link}
        backgroundColor={black}
        borderRadius={borderBase}
        cssClass="light-mode"
      >
        {uiText}
      </MjmlButton>
      <MjmlButton
        lineHeight={leadingTight}
        fontSize={textSm}
        fontWeight={'700'}
        height={32}
        padding="0"
        align="left"
        href={link}
        backgroundColor={grayLight}
        color={black}
        borderRadius={borderBase}
        cssClass="dark-mode"
      >
        {uiText}
      </MjmlButton>
    </>
  );
};

export default ButtonPrimary;
