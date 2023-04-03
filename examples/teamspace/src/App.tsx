import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Redirect, Route, Switch } from 'wouter';

import Space from 'components/Space';
import { nanoid } from './utils/nanoid';
import { SpaceContext } from './hooks/useSpaceContext';
import { getSpaceStore } from 'state/store';
import { CardCatalog } from './components/CardCatalog';
import { Page } from './components/Page';
import { CardsInSpace } from 'components/Sidebar';
import * as Tooltip from './components/Tooltip';

import './styles.css';
import { useSnapshot } from 'valtio';
import { AppBanner } from 'components/AppBanner';
import { useAppContext } from 'hooks/useAppContext';
import { ContextMenu } from 'components/ContextMenu';
import { sand, sandA } from '@radix-ui/colors';
import { FocusMode } from 'components/FocusMode';
import { EditorContext } from 'hooks/useEditorContext';
import { SHOW_GENERATE_CLIENT_ID_BUTTON } from 'state/constants';

function Debug() {
  const store = useSnapshot(useAppContext().store);
  return (
    <div
      style={{
        position: 'fixed',
        right: 11,
        bottom: 11,
        maxWidth: 'calc(100vw - 22px)',
        minWidth: '22vw',
        zIndex: 9999,
        minHeight: 44,
        lineHeight: '22px',
        color: sand.sand4,
        fontFamily: 'SF Compact',
        fontSize: 14,
        fontWeight: 300,
        padding: 11,
        borderRadius: 6,
        background: sandA.sandA12,
      }}
    >
      {/* <br /> */}
      <span style={{ fontWeight: '500', color: sand.sand2, textTransform: 'uppercase' }}>
        {store.uiState}
      </span>
      <code style={{ fontFamily: 'SF Compact' }}>
        {' – Selected: '}
        {JSON.stringify(store.editing.selectedIds, null, '\t')}
      </code>
      {/* <br /> */}
      {/* <dl> */}
      {/*<dt>selected: </dt>
        <dd>
          <code style={{ userSelect: 'all' }}>
            {JSON.stringify(store.editing.selectedIds, null, '\t')}
          </code>
        </dd> */}
      {/* <dd>
          <code style={{ userSelect: 'all' }}>
            {JSON.stringify(store.editing.tables, null, '\t')}
          </code>
    </dd> */}
      <br />
      {/* <dt>focusModeId: </dt>
        <dd>
          <code style={{ userSelect: 'all' }}>{JSON.stringify(store.focusModeId, null, '\t')}</code>
        </dd>
        <br /> */}

      {/* <dt>editing: </dt>
        <dd>
          <code style={{ userSelect: 'all' }}>
            {JSON.stringify(store.editing.editingId, null, '\t')}
          </code>
        </dd> */}
      {/* <dt>pointing: </dt>
        <dd>
          <code style={{ userSelect: 'all' }}>
            {JSON.stringify(store.editing.pointingId, null, '\t')}
          </code>
        </dd> */}
      {/* <br /> */}

      {/* <dt>drag: </dt>
        <dd>
          <code style={{ userSelect: 'all' }}>
            {JSON.stringify(store.editing.dragInsertAt, null, '\t')}
            {' – '}
            {JSON.stringify(store.editing.dragY, null, '\t')}
          </code>
        </dd>
        <br /> */}
      {/* 
        <dt>formatting: </dt>
        <dd>
          <code style={{ userSelect: 'all' }}>
            {JSON.stringify(store.editing.formatting, null, '\t')}
          </code>
        </dd> */}
      {/* </dl> */}
    </div>
  );
}

export default function App() {
  const { store } = useAppContext();
  const { promptToRefresh, uiState, lastOpenedSpaceId } = useSnapshot(store);

  const contextMenu = uiState === 'contextMenu.showing' ? <ContextMenu /> : undefined;

  return (
    <>
      {import.meta.env.DEV ? <Debug /> : null}
      {SHOW_GENERATE_CLIENT_ID_BUTTON && (
        <button
          onClick={() => {
            store.clientId = nanoid();
          }}
          style={{ position: 'fixed', top: 0, right: 100, zIndex: 9999 }}
        >
          Generate New ClientId
        </button>
      )}
      <Tooltip.Provider delayDuration={700} skipDelayDuration={1000}>
        <Toaster />
        <EditorContext.Provider value={{ target: { type: 'app', id: 'app' } }}>
          <AppBanner showBanner={promptToRefresh}>
            <div>
              <Switch>
                <Route path="/">
                  {() => (
                    <Redirect to={`/${lastOpenedSpaceId ? lastOpenedSpaceId : nanoid()}`} replace />
                  )}
                </Route>
                <Route path="/cards">
                  <Page>
                    <CardCatalog />
                  </Page>
                </Route>
                <Route path="/:id">
                  {(params) => (
                    <SpaceContext.Provider value={{ store: getSpaceStore(params.id) }}>
                      {contextMenu}
                      <Page sidebarContent={<CardsInSpace />}>
                        <Space />
                      </Page>
                      <FocusMode />
                    </SpaceContext.Provider>
                  )}
                </Route>
              </Switch>
            </div>
          </AppBanner>
        </EditorContext.Provider>
      </Tooltip.Provider>
    </>
  );
}
