import { DEV } from '../../environment';
import * as camera from './camera';
import * as realtime from './realtime';
import * as savedSpaces from './savedSpaces';
import * as selection from './selection';
import * as setInitialPoint from './setInitialPoint';
import * as setViewport from './setViewport';
import * as shapes from './shapes';
import * as snaps from './snaps';
import * as transform from './transform';
import * as translate from './translate';
import * as enter from './enter';
import * as cancel from './cancel';
import * as tool from './tool';
import * as clipboard from './clipboard';
import * as contextMenu from './contextMenu';
import * as follow from './follow';
import * as undo from './undo';
import * as drag from './drag';
import * as file from './file';
import * as links from './links';
import * as commandBar from './quickSearch';
import * as search from './search';
import * as navigation from './navigation';
import * as preview from './focusMode';
import * as space from './space';
import * as autocomplete from './autocomplete';
import * as editor from './editor';
import * as table from './table';

import { snapshot } from 'valtio';

const actions = {
  ...camera,
  ...realtime,
  ...savedSpaces,
  ...selection,
  ...setInitialPoint,
  ...setViewport,
  ...shapes,
  ...snaps,
  ...transform,
  ...translate,
  ...enter,
  ...cancel,
  ...tool,
  ...clipboard,
  ...contextMenu,
  ...follow,
  ...undo,
  ...drag,
  ...file,
  ...links,
  ...commandBar,
  ...search,
  ...navigation,
  ...preview,
  ...space,
  ...autocomplete,
  ...editor,
  ...table,
};

type Actions = typeof actions;

const actionsProxy: Actions = new Proxy(actions, {
  get(target, prop, _receiver) {
    const fn = (state: any, payload: any) => {
      const key = prop as keyof Actions;
      const store = state.store ?? state;

      const prevState = snapshot(store);
      const started = performance.now();

      if (typeof target[key] !== 'function') {
        console.warn(`Action ${key} is not a function`);
      }

      // @ts-expect-error Argument of type 'any' is not assignable to parameter of type 'never'.ts(2345)
      target[key](state, payload);

      const duration = performance.now() - started;
      const nextState = snapshot(store);

      // formatters
      const timestamp = new Date().toTimeString().slice(0, 8);
      const action = key + (typeof payload === 'string' ? `[${payload}]` : ``);

      console.groupCollapsed(
        `[${timestamp}] action%c ${action}%c in ${duration.toFixed(2)} ms`,
        `color: #03A9F4; font-weight: bold`,
        `color: inherit; font-weight: normal`
      );

      console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, prevState);
      console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action, payload);
      console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);

      console.groupEnd();
    };

    return fn;
  },
});

export default DEV ? actionsProxy : actions;
