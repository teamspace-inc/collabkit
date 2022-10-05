import { createGlobalThemeContract } from '@vanilla-extract/css';
import { avatarTheme } from './AvatarTheme';
import { baseTheme } from './BaseTheme';
import { buttonTheme } from './ButtonTheme';
import { commentTheme } from './CommentTheme';
import { composerTheme } from './ComposerTheme';
import { facepileTheme } from './FacepileTheme';
import { inboxTheme } from './InboxTheme';
import { mentionsTheme } from './MentionsTheme';
import { menuTheme } from './MenuTheme';
import { popoverThreadTheme } from './PopoverThreadTheme';
import { profileTheme } from './ProfileTheme';
import { scrollBarTheme } from './ScrollbarTheme';
import { sidebarTheme } from './SidebarTheme';
import { threadTheme } from './ThreadTheme';

export const vars = createGlobalThemeContract(
  {
    ...baseTheme,
    ...profileTheme,
    ...scrollBarTheme,
    ...avatarTheme,
    ...facepileTheme,
    ...sidebarTheme,
    ...inboxTheme,
    ...mentionsTheme,
    ...menuTheme,
    ...buttonTheme,
    ...commentTheme,
    ...composerTheme,
    ...threadTheme,
    ...popoverThreadTheme,
  },
  (value) => `collabkit-${value}`
);

export type Theme = typeof vars;
