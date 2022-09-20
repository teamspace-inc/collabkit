import { createTheme } from '@stitches/react';
import { gray, green, red, redDark, grayDark, greenDark } from '@radix-ui/colors';

export const PIN_SIZE = 28;

const neutral = {
  neutral1: '$gray1',
  neutral2: '$gray2',
  neutral3: '$gray3',
  neutral4: '$gray4',
  neutral5: '$gray5',
  neutral6: '$gray6',
  neutral7: '$gray7',
  neutral8: '$gray8',
  neutral9: '$gray9',
  neutral10: '$gray10',
  neutral11: '$gray11',
  neutral12: '$gray12',
};

export interface Theme {
  fontSize: {
    0: string;
    1: string;
    2: string;
    3: string;
    mentionDropdownItemFontSize: string;
    sendButtonFontSize: string;
    button: string;
    indicatorText: string;
  };
  lineHeights: {
    0: string;
    1: string;
    2: string;
    3: string;
    mentionDropdownItemLineHeight: string;
    button: string;
    indicatorText: string;
  };
  fontWeights: {
    0: number;
    1: number;
    2: number;
    3: number;
    mentionDropdownItemFontWeight: string;
    mentionDropdownItemMark: number;
    sendButtonTextFontWeight: number;
    indicatorText: number;
    profileNameText: number;
    button: number;
    mention: number;
  };
  radii: {
    0: string;
    1: string;
    2: string;
    pin: string;
    mentionDropdownBorderRadius: string;
    avatar: string;
    iconButton: string;
    composer: string;
    popoverThread: string;
  };
  padding: {
    composer: string;
    commentTop: string | number;
    commentLeft: string | number;
    commentRight: string | number;
    commentBottom: string | number;
    mentionDropdownItemPadding: string;
    composerContainer: string;

    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
  };
  sizes: {
    sendButton: string;
    threadWidth: string;
    threadPreviewWidth: string;
    pin: string;
    avatar: string;
    pinBorderWidth: string;
    popoverThreadWidth: string;
    iconButton: string;
  };
  space: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    commentHeaderBodyGap: string;
  };
  borders: {
    composer: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonTertiary: string;

    buttonPrimaryActive: string;
    buttonSecondaryActive: string;
    buttonTertiaryActive: string;

    buttonPrimaryHover: string;
    buttonSecondaryHover: string;
    buttonTertiaryHover: string;
  };
  offsets: {
    composerSendButtonTop: string;
    composerSendButtonRight: string;
  };
  shadows: {
    mentionDropdownBoxShadow: string;
  };
  colors: {
    // text
    primaryText: string;
    secondaryText: string;

    badgeColor: string;
    primaryButtonBackground: string;

    bubbleHoverBackground: string;
    selectionBackground: string;
    borderColor: string;
    pinBorderColor: string;
    backgroundColor: string;
    popoverThreadBackgroundColor: string;

    // unread indicator
    indicatorLineColor: string;
    indicatorText: string;

    // typing indicator
    typingDot: string;

    // comment
    commentHoverBackgroundColor: string;
    commentUnseenBackgroundColor: string;
    commentUnseenHoverBackgroundColor: string;
    caretColor: string;

    // composer
    composerBackground: string;
    composerPlaceholder: string;
    composerButtonBackground: string;
    composerButtonIconColor: string;

    sendButtonDisabledColor: string;
    sendButtonColor: string;
    sendButtonTextColor: string;
    sendButtonDisabledTextColor: string;

    // button
    buttonPrimaryBackground: string;
    buttonPrimaryHoverBackground: string;
    buttonPrimaryHoverText: string;
    buttonPrimaryActiveBackground: string;
    buttonPrimaryText: string;
    buttonPrimaryActiveText: string;

    buttonSecondaryBackground: string;
    buttonSecondaryHoverBackground: string;
    buttonSecondaryHoverText: string;
    buttonSecondaryActiveBackground: string;
    buttonSecondaryText: string;

    buttonTertiaryBackground: string;
    buttonTertiaryHoverBackground: string;
    buttonTertiaryHoverText: string;
    buttonTertiaryActiveBackground: string;
    buttonTertiaryText: string;

    buttonDisabledBackground: string;
    buttonDisabledText: string;

    // mentions
    mentionText: string;
    mentionTextBackground: string;

    mentionDropdownBackgroundColor: string;

    mentionDropdownTextColor: string;
    mentionDropdownMarkText: string;
    mentionDropdownMarkBackground: string;

    mentionDropdownItemHoverBackgroundColor: string;
    mentionDropdownItemHoverTextColor: string;

    mentionDropdownItemSelectedBackgroundColor: string;
    mentionDropdownItemSelectedTextColor: string;
  };
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type CustomTheme = DeepPartial<Theme>;

export function createThemes(customTheme?: CustomTheme) {
  const fontSize = {
    mentionDropdownItemFontSize: '$fontSize$2',
    sendButtonFontSize: '$fontSize$2',
    indicatorText: '$fontSize$1',
    button: '$fontSize$0',

    ['0']: '11px',
    ['1']: '12px',
    ['2']: '13px',
    ['3']: '16px',
  };

  const lineHeights = {
    mentionDropdownItemLineHeight: '$lineHeights$0',
    indicatorText: '30px',

    ['0']: '18px',
    ['1']: '18px',
    ['2']: '18px',
    ['3']: '20px',
  };

  const fontWeights = {
    mentionDropdownItemFontWeight: '$fontWeights$1',
    sendButtonTextFontWeight: '$fontWeights$0',
    indicatorText: '$fontWeights$1',
    profileNameText: '$fontWeights$2',
    mentionDropdownItemMark: '$fontWeights$2',
    mention: '$fontWeights$2',

    ['0']: 400,
    ['1']: 700,
    ['2']: 700,
    ['3']: 700,
  };

  const radii = {
    pin: '24px',
    mentionDropdownBorderRadius: '$radii$0',
    avatar: '24px',
    iconButton: '24px',
    composer: '4px',
    popoverThread: '12px',

    ['0']: '4px',
    ['1']: '12px',
    ['2']: '16px',
  };

  const padding = {
    composer: '12px',
    commentTop: '8px',
    commentBottom: '8px',
    commentLeft: '$padding$2',
    commentRight: '$padding$2',
    mentionDropdownItemPadding: '$padding$1',
    composerContainer: '0 16px 0 16px',
    thread: '$padding$2',

    ['0']: '6px',
    ['1']: '8px',
    ['2']: '16px',
    ['3']: '24px',
    ['4']: '32px',
  };

  const shadows = {
    mentionDropdownBoxShadow: '6px 6px 10px rgba(0, 0, 0, 0.25)',
  };

  const sizes = {
    sendButton: '20px',
    threadWidth: '260px',
    threadPreviewWidth: '248px',
    pin: `${PIN_SIZE}px`,
    avatar: '24px',
    pinBorderWidth: '1.5px',
    popoverThreadWidth: '264px',
    iconButton: '24px',
  };

  const space = {
    ['0']: '0px',
    ['1']: '4px',
    ['2']: '8px',
    ['3']: '12px',
    ['4']: '16px',
    commentHeaderBodyGap: '8px',
  };

  const colors = {
    primaryText: '$neutral12',
    secondaryText: '$neutral9',

    typingDot: '$neutral9',
    badgeColor: '$red10',

    primaryButtonBackground: '$neutral1',
    composerButtonBackground: '$accent10',
    composerButtonIconColor: '$neutral1',
    composerBackground: '$neutral4',
    popoverThreadBackgroundColor: 'white',

    sendButtonColor: '$accent10',
    sendButtonDisabledColor: '$accent6',
    sendButtonTextColor: '$neutral1',
    sendButtonDisabledTextColor: '$neutral4',

    buttonDisabledBackground: '$neutral4',

    buttonPrimaryBackground: '$accent10',
    buttonPrimaryHoverBackground: '$neutral2',
    buttonPrimaryActiveBackground: '$neutral3',
    buttonPrimaryTextColor: '$neutral1',

    buttonSecondaryBackground: '$neutral4',
    buttonSecondaryHoverBackground: '$neutral5',
    buttonSecondaryActiveBackground: '$neutral6',
    buttonSecondaryTextColor: '$neutral0',

    indicatorLineColor: '$red10',
    indicatorText: '$red10',

    commentHoverBackgroundColor: 'unset',
    commentUnseenBackgroundColor: 'unset',
    commentUnseenHoverBackgroundColor: 'unset',

    commentMenuItemText: '$neutral12',
    commentMenuItemBackground: '$neutral1',
    commentMenuItemHoverText: '$neutral12',
    commentMenuItemHoverBackground: '$neutral4',

    bubbleHoverBackground: '$neutral4',
    selectionBackground: '$neutral10',

    borderColor: '$neutral4',
    pinBorderColor: '$neutral1',
    backgroundColor: '$neutral1',

    mentionDropdownBackgroundColor: '$neutral1',

    mentionDropdownTextColor: '$neutral12',

    mentionDropdownItemHoverBackgroundColor: '',
    mentionDropdownItemHoverTextColor: '',

    mentionDropdownItemSelectedBackgroundColor: '$accent5',
    mentionDropdownItemSelectedTextColor: '$neutral12',
  };

  const offsets = {
    composerSendButtonTop: '7px',
    composerSendButtonRight: '12px',
  };

  let baseTheme = {
    fontSize: {
      ...fontSize,
      ...customTheme?.fontSize,
    },
    lineHeights: {
      ...lineHeights,
      ...customTheme?.lineHeights,
    },
    fontWeights: {
      ...fontWeights,
      ...customTheme?.fontWeights,
    },
    borders: {
      ...customTheme?.borders,
    },
    offsets: {
      ...offsets,
      ...customTheme?.offsets,
    },
    radii: {
      ...radii,
      ...customTheme?.radii,
    },
    padding: {
      ...padding,
      ...customTheme?.padding,
    },
    sizes: {
      ...sizes,
      ...customTheme?.sizes,
    },
    space: {
      ...space,
      ...customTheme?.space,
    },
    shadows: {
      ...shadows,
      ...customTheme?.shadows,
    },
  };

  const darkTheme = createTheme({
    ...baseTheme,
    colors: {
      ...redDark,
      ...grayDark,
      ...greenDark,

      accent1: '$green1',
      accent2: '$green2',
      accent3: '$green3',
      accent4: '$green4',
      accent5: '$green5',
      accent6: '$green6',
      accent7: '$green7',
      accent8: '$green8',
      accent9: '$green9',
      accent10: '$green10',
      accent11: '$green11',
      accent12: '$green12',

      ...neutral,
      ...colors,
      ...customTheme?.['colors'],
    },
  });

  const lightTheme = createTheme({
    ...baseTheme,
    colors: {
      ...red,
      ...gray,
      ...green,

      accent1: '$green1',
      accent2: '$green2',
      accent3: '$green3',
      accent4: '$green4',
      accent5: '$green5',
      accent6: '$green6',
      accent7: '$green7',
      accent8: '$green8',
      accent9: '$green9',
      accent10: '$green10',
      accent11: '$green11',
      accent12: '$green12',

      ...neutral,
      ...colors,
      ...customTheme?.['colors'],
    },
  });

  return { darkTheme, lightTheme };
}
