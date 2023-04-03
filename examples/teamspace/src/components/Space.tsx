import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';
import { blue, sand } from '@radix-ui/colors';
import { useSnapshot } from 'valtio';

import Renderer from './Renderer';
import useDoc from 'network/useDoc';
import { Toolbar } from 'components/Toolbar';
import styled from 'styles/stitches.config';

import {
  FORMATTING_TOOLBAR_HEIGHT,
  GlobalStore,
  SpaceData,
  SpaceTarget,
  SPACE_NAME_KEY,
} from 'state/constants';
import { Facepile } from 'components/Facepile';
import { Name } from 'components/Name';
import { ZoomControls } from 'components/ZoomControls';
import { ClientColor, ClientColors } from 'utils/Colors';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useNotifications from 'hooks/useNotifications';
import useCursor from 'hooks/useCursor';
import { useAppEvents, useSpaceEvents } from '../events';
import { useSaveCamera } from 'hooks/useSaveCamera';
import { useDelay } from 'hooks/useDelay';
import { useSpaceStoreSubscription } from 'hooks/useSpaceStoreSubscription';
import { useSpaceContext } from 'hooks/useSpaceContext';
import { useAppContext } from 'hooks/useAppContext';
import { LinkToolHint } from './LinkToolHint';
import { getShapeId } from 'state/helpers';
import Vec from '@tldraw/vec';
import { Autocomplete } from './tools/Autocomplete';
import { CanvasTool } from './tools/EditingTools';
import { FormattingToolbar } from './tools/FormattingToolbar';
import { EditorContext } from 'hooks/useEditorContext';
import { useClients } from 'hooks/useClients';
import { useNetworkConnection } from 'hooks/useNetworkConnection';

function getClientIds(data: SpaceData) {
  return Object.keys(data.realtime);
}

function getClientColors(data: SpaceData, globalData: Readonly<GlobalStore>) {
  const colors: Record<string, ClientColor | null> = {};
  const validColors = Object.keys(ClientColors);

  for (const id in data.realtime) {
    const color = globalData.clients[id]?.color;
    if (color && validColors.includes(color)) {
      colors[id] = color as ClientColor;
    } else {
      colors[id] = null;
    }
  }

  colors[globalData.clientId] = globalData.color;

  return colors;
}

export default function Space() {
  const { store: spaceStore } = useSpaceContext();
  const { store } = useAppContext();
  useDoc(spaceStore);
  const data = useSpaceStoreSubscription(spaceStore);
  const { store: globalStore } = useAppContext();
  const globalData = useSnapshot(globalStore);
  const { connectionState, uiState, editing } = globalData;
  const spaceEvents = useSpaceEvents(spaceStore);
  const appEvents = useAppEvents();

  const target: SpaceTarget = { type: 'space', id: data.docId };

  useNetworkConnection();

  useClients(spaceStore, data.docId);

  useNotifications(connectionState, 0 /* TODO: number of pending changes */);
  useCursor(uiState);
  useSaveCamera(spaceStore, data.docIsLoading);

  const nameFragment =
    !data.docIsLoading && data.doc ? data.doc.getXmlFragment(SPACE_NAME_KEY) : undefined;
  useDocumentTitle(nameFragment, 'Neuron');

  const showSpinner = useDelay(1000, [data.docId]);

  const { items } = data;

  const editingItemId = getShapeId(editing.editingId, data);
  const editingItem = editingItemId ? items[editingItemId] : null;

  const autocomplete =
    !globalData.focusModeId && uiState === 'editing.autocomplete.showing' && editingItem ? (
      <CanvasTool point={Vec.add([editingItem.x, editingItem.y], editing.autocomplete.point)}>
        <Autocomplete
          onScrollList={appEvents.onScrollList}
          autocomplete={store.editing.autocomplete}
        />
      </CanvasTool>
    ) : null;

  const formattingToolbar =
    !globalData.focusModeId && uiState.startsWith('editing') && editingItem ? (
      <CanvasTool
        point={Vec.add([editingItem.x, editingItem.y], [0, -(FORMATTING_TOOLBAR_HEIGHT + 11)])}
      >
        <FormattingToolbar
          onToggleMark={appEvents.onToggleMark}
          onSetBlockType={appEvents.onSetBlockType}
          onSelectFormatClose={appEvents.onSelectFormatClose}
          onSelectFormatOpen={appEvents.onSelectFormatOpen}
        />
      </CanvasTool>
    ) : null;

  const tools = (
    <>
      {autocomplete}
      {formattingToolbar}
    </>
  );

  return (
    <>
      {!data.doc || data.docIsLoading ? (
        <Center>
          {showSpinner && (
            <SpinnerCircularFixed
              thickness={150}
              size="40px"
              color={blue.blue10}
              secondaryColor={sand.sand4}
            />
          )}
        </Center>
      ) : (
        <>
          <EditorContext.Provider value={{ target }}>
            {uiState.startsWith('link') && <LinkToolHint />}
            {nameFragment && (
              <Name fragment={nameFragment} isEditing={uiState === 'spaceName.editing'} />
            )}
            <Renderer
              tools={tools}
              data={data}
              globalData={globalData}
              uiState={uiState}
              editing={editing}
              spaceEvents={spaceEvents}
              appEvents={appEvents}
            />
            <Facepile
              clientId={globalData.clientId}
              onClickFace={spaceEvents.onClickFace}
              clientColors={getClientColors(data, globalData)}
              clientIds={getClientIds(data)}
              followingId={data.pageState.followingId}
            />
            <Toolbar tool={data.pageState.tool} />
            <ZoomControls zoom={data.pageState.camera.zoom} />
          </EditorContext.Provider>
        </>
      )}
      <div data-test-id={`connection-state-${connectionState}`} />
    </>
  );
}

const Center = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});
