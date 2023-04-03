import { Page } from '@playwright/test';

export const BOX_SELECTOR = '[data-testid="BoxComponent"]';
export const IMAGE_SELECTOR = '[data-testid="ImageComponent"]';
export const TEXT_SELECTOR = '[data-testid="TextComponent"] > div';
export const CARD_SELECTOR = '[data-testid="TextCardComponent"] > div';
export const MODAL_SELECTOR = '[data-testid="Modal"]';
export const STICKY_SELECTOR = '[data-testid="StickyComponent"] > div > div';
export const BOUNDS_SELECTOR = '[data-test-id="Bounds"]';
export const SPACE_MENU_SELECTOR = '[data-test-id="SpaceDropdownMenu"]';
export const SIDEBAR_ADD_SPACE_SELECTOR = '[data-test-id="SidebarItem-add-space"]';
export const SIDEBAR_CARD_SELECTOR = '[data-test-id="SidebarItem-card"]';
export const ARROW_SELECTOR = '[data-testid="ArrowComponent"]';

export const IS_EDITING_SELECTOR = '[data-test-is-editing=true]';
export const FORMATTiNG_TOOLBAR_SELECTOR = '[data-test-id="FormattingToolbar"]';
export const FORMATTING_TOOLBAR_SELECT = '[data-test-id="FormattingToolbarSelect"]';

export const FORMATTING_TOOLBAR_OPTION = (block) =>
  '[data-test-id="FormattingToolbarOption-' + block + '"]';

export const CONTEXT_MENU_ITEM_SELECTOR = (action) =>
  '[data-testid="ContextMenuItem-' + action + '"]';

export const SEARCH_BAR_INPUT_SELECTOR = '[data-testid="SearchBarInput"]';
export const SEARCH_BAR_RESULT_SELECTOR = (nth: number) =>
  '[data-testid="SearchBarResult-' + nth + '"]';

export const SELECTED_SELECTOR = '.tl-selected';
export const FILE_INPUT_SELECTOR = '#image';

export const SPACE_NAME_SELECTOR = '[data-test-id="space-name"]';
export const SPACE_NAME_PM_SELECTOR = '[data-test-id="space-name"] .ProseMirror';

export const ONLINE_SELECTOR = '[data-test-id=connection-state-online]';
export const CANVAS_SELECTOR = '#canvas > .tl-absolute.tl-layer';
export const SPACE_URL_REGEX = /^\/[A-Za-z0-9]{24}$/;
export const FACEPILE_SELECTOR = '[data-test-id="facepile-face"]';
export const FACEPILE_SELF_SELECTOR = '[data-test-id="facepile-face-self"]';
export const ZOOM_CONTROLS_SELECTOR = `[data-test-id="zoom-controls"]`;

export const AUTOCOMPLETE_SELECTOR = '[data-test-id="Autocomplete"]';
export const AUTOCOMPLETE_LIST_ITEM_SELECTOR = '[data-test-id="AutocompleteListItem"]';

export const toolSelectors = {
  box: '#box',
  text: '#text',
  sticky: '#sticky',
  card: '#card',
  link: '#link',
};

export function useSelectors(page: Page) {
  const cards = page.locator(CARD_SELECTOR);
  const links = page.locator(ARROW_SELECTOR);
  const linkMenuItem = page.locator(CONTEXT_MENU_ITEM_SELECTOR('link'));
  const unlinkMenuItem = page.locator(CONTEXT_MENU_ITEM_SELECTOR('unlink'));

  return { cards, links, linkMenuItem, unlinkMenuItem };
}

export const $ = {
  box: BOX_SELECTOR,
  image: IMAGE_SELECTOR,
  text: TEXT_SELECTOR,
  card: CARD_SELECTOR,
  cardBackground: '[data-testid="CardBackground"]',
  modal: MODAL_SELECTOR,
  sticky: STICKY_SELECTOR,
  bounds: BOUNDS_SELECTOR,
  sidebarSpace: '[data-test-id="SidebarItem-space"]',
  sidebarAddSpace: SIDEBAR_ADD_SPACE_SELECTOR,
  sidebarCard: SIDEBAR_CARD_SELECTOR,
  sidebarSearch: '[data-testid=SidebarItem-Search]',
  colorPicker: '[data-testid=ColorPicker]',
  colorPickerColor: (colorId: string) => `[data-testid=ColorPicker-${colorId}]`,
  arrow: ARROW_SELECTOR,
  formattingToolbar: FORMATTiNG_TOOLBAR_SELECTOR,
  formattingToolbarOption: FORMATTING_TOOLBAR_OPTION,
  formattingToolbarSelect: FORMATTING_TOOLBAR_SELECT,
  autocomplete: AUTOCOMPLETE_SELECTOR,
  autocompleteListItem: AUTOCOMPLETE_LIST_ITEM_SELECTOR,
  isEditing: IS_EDITING_SELECTOR,
  contextMenu: '[data-testid="ContextMenu"]',
  contextMenuItem: CONTEXT_MENU_ITEM_SELECTOR,
  searchBarInput: SEARCH_BAR_INPUT_SELECTOR,
  searchBarResult: SEARCH_BAR_RESULT_SELECTOR,
  selected: SELECTED_SELECTOR,
  fileInput: FILE_INPUT_SELECTOR,
  spaceName: SPACE_NAME_SELECTOR,
  spaceNameEditor: SPACE_NAME_PM_SELECTOR,
  online: ONLINE_SELECTOR,
  canvas: CANVAS_SELECTOR,
  facepile: FACEPILE_SELECTOR,
  facepileSelf: FACEPILE_SELF_SELECTOR,
  zoomControls: ZOOM_CONTROLS_SELECTOR,
  yTextEditor: '[data-testid="YTextEditor"]',
  linkToolHint: '[data-testid="LinkToolHint"]',
};
