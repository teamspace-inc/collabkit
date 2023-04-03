import { TextCardTarget } from 'state/constants';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): Readonly<T>;
  function snapshot<T extends object>(p: T): Readonly<T>;
}

export type IndexItem = {
  title?: string;
  text?: string;
  target: TextCardTarget;
  links?: string[];
};

export type SpaceMenuActionType = 'hide';

export type SpaceMenuItemInfo = {
  target: string;
  action: SpaceMenuActionType;
};

export type Block = 'h1' | 'h2' | 'h3' | 'p' | 'ol' | 'ul' | 'li' | 'multiple';

export type Mark = 'strong' | 'em';
