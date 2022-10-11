import { createGlobalThemeContract } from '@vanilla-extract/css';
import { AvatarTheme } from './AvatarTheme';
import { ButtonTheme } from './ButtonTheme';
import { ColorTheme } from './ColorTheme';
import { CommentTheme } from './CommentTheme';
import { ComposerTheme } from './ComposerTheme';
import { FacepileTheme } from './FacepileTheme';
import { InboxTheme } from './InboxTheme';
import { MentionsTheme } from './MentionsTheme';
import { MenuTheme } from './MenuTheme';
import { NewIndicatorTheme } from './NewIndicatorTheme';
import { PopoverThreadTheme } from './PopoverThreadTheme';
import { ProfileTheme } from './ProfileTheme';
import { ScrollbarTheme } from './ScrollbarTheme';
import { ShadowTheme } from './ShadowTheme';
import { SidebarTheme } from './SidebarTheme';
import { SpaceTheme } from './SpaceTheme';
import { TextTheme } from './TextTheme';
import { ThreadTheme } from './ThreadTheme';

export const vars = createGlobalThemeContract(
  {
    ...AvatarTheme,
    ...ButtonTheme,
    ...ColorTheme,
    ...CommentTheme,
    ...ComposerTheme,
    ...FacepileTheme,
    ...InboxTheme,
    ...MentionsTheme,
    ...MenuTheme,
    ...PopoverThreadTheme,
    ...ProfileTheme,
    ...ScrollbarTheme,
    ...ShadowTheme,
    ...SidebarTheme,
    ...SpaceTheme,
    ...TextTheme,
    ...ThreadTheme,
    ...NewIndicatorTheme,
  },
  (value) => `collabkit-${value}`
);

export type Theme = typeof vars;
