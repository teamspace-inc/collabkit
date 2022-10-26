import { AvatarBase } from './base/AvatarBase';
import { ButtonBase } from './base/ButtonBase';
import { ColorBase } from './base/ColorBase';
import { CommentBase } from './base/CommentBase';
import { CommentListBase } from './base/CommentListBase';
import { ComposerBase } from './base/ComposerBase';
import { FacepileBase } from './base/FacepileBase';
import { InboxBase } from './base/InboxBase';
import { MentionsBase } from './base/MentionsBase';
import { MenuBase } from './base/MenuBase';
import { NewIndicatorBase } from './base/NewIndicatorBase';
import { PopoverThreadBase } from './base/PopoverThreadBase';
import { ProfileBase } from './base/ProfileBase';
import { ScrollbarBase } from './base/ScrollbarBase';
import { ShadowBase } from './base/ShadowBase';
import { SidebarBase } from './base/SidebarBase';
import { SpaceBase } from './base/SpaceBase';
import { TextBase } from './base/TextBase';
import { ThreadBase } from './base/ThreadBase';

export const BaseTheme = {
  ...CommentListBase,
  ...NewIndicatorBase,
  ...ColorBase,
  ...TextBase,
  ...SpaceBase,
  ...ButtonBase,
  ...AvatarBase,
  ...CommentBase,
  ...ComposerBase,
  ...FacepileBase,
  ...InboxBase,
  ...MentionsBase,
  ...MenuBase,
  ...PopoverThreadBase,
  ...ProfileBase,
  ...ScrollbarBase,
  ...ShadowBase,
  ...SidebarBase,
  ...ThreadBase,
};
