import { createGlobalThemeContract } from '@vanilla-extract/css';
import { AvatarTheme } from './AvatarTheme';
import { ButtonTheme } from './ButtonTheme';
import { ColorTheme } from './ColorTheme';
import { CommentListTheme } from './CommentListTheme';
import { CommentTheme } from './CommentTheme';
import { ComposerTheme } from './ComposerTheme';
import { FacepileTheme } from './FacepileTheme';
import { InboxTheme } from './InboxTheme';
import { MentionsTheme } from './MentionsTheme';
import { MenuTheme } from './MenuTheme';
import { NewIndicatorTheme } from './NewIndicatorTheme';
import { ProfileTheme } from './ProfileTheme';
import { ScrollbarTheme } from './ScrollbarTheme';
import { ShadowTheme } from './ShadowTheme';
import { SidebarTheme } from './SidebarTheme';
import { SpaceTheme } from './SpaceTheme';
import { TextTheme } from './TextTheme';
import { ThreadTheme } from './ThreadTheme';
import { PinTheme } from './PinTheme';
import { ZIndexTheme } from './ZIndexTheme';

export const vars = createGlobalThemeContract(
  {
    ...AvatarTheme,
    ...ButtonTheme,
    ...ColorTheme,
    ...CommentTheme,
    ...CommentListTheme,
    ...ComposerTheme,
    ...FacepileTheme,
    ...InboxTheme,
    ...MentionsTheme,
    ...MenuTheme,
    ...PinTheme,
    ...ProfileTheme,
    ...ScrollbarTheme,
    ...ShadowTheme,
    ...SidebarTheme,
    ...SpaceTheme,
    ...TextTheme,
    ...ThreadTheme,
    ...NewIndicatorTheme,
    ...ZIndexTheme,
  },
  (value) => `collabkit-${value}`
);

export type Theme = typeof vars;
