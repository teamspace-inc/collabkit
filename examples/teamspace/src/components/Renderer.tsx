import { Renderer as TLRenderer } from '@tldraw/core';

import { getPage, getPageState, getUsers } from '../data';
import { Shape, shapeUtils } from '../shapes';
import { EditingStore, GlobalStore, SpaceData, UIState } from 'state/constants';
import { neuronTheme } from 'styles/stitches.config';
import { AppEventHandlers, SpaceEventHandlers } from '../events';
import { useEditorContext } from 'hooks/useEditorContext';

type RendererProps = {
  data: SpaceData;
  globalData: Readonly<GlobalStore>;
  uiState: UIState;
  editing: Readonly<EditingStore>;
  appEvents: AppEventHandlers;
  spaceEvents: SpaceEventHandlers;
  tools?: JSX.Element;
};

export default function Renderer({
  data,
  globalData,
  uiState,
  editing,
  appEvents,
  spaceEvents,
  tools,
}: RendererProps) {
  const hideBounds = [
    'transforming',
    'translating',
    'box.creating',
    'text.creating',
    'sticky.pointing',
  ].includes(uiState);
  const editorContext = useEditorContext();

  return (
    <TLRenderer<Shape, any>
      key={data.docId}
      tools={tools}
      shapeUtils={shapeUtils}
      page={getPage(data, globalData)}
      pageState={getPageState(data, editing)}
      snapLines={data.overlays.snapLines}
      users={getUsers(data, globalData)}
      userId={globalData.clientId}
      theme={neuronTheme}
      hideHoveredIndicator={uiState !== 'link.hovering'}
      onContextMenu={appEvents.onContextMenu}
      onPointShape={spaceEvents.onPointShape}
      onReleaseShape={spaceEvents.onReleaseShape}
      onPointBounds={spaceEvents.onPointBounds}
      onPointCanvas={spaceEvents.onPointCanvas}
      onPointerDown={(info, e) => appEvents.onPointerDown(info, e, editorContext)}
      onPointerMove={appEvents.onPointerMove}
      onHoverShape={spaceEvents.onHoverShape}
      onUnhoverShape={spaceEvents.onUnhoverShape}
      onPointBoundsHandle={spaceEvents.onPointBoundsHandle}
      onPan={spaceEvents.onPan}
      onPinchStart={spaceEvents.onPinchStart}
      onPinchEnd={spaceEvents.onPinchEnd}
      onPinch={spaceEvents.onPinch}
      onPointerUp={appEvents.onPointerUp}
      onBoundsChange={spaceEvents.onBoundsChange}
      // onKeyDown={(key, info, e) => appEvents.onKeyDown(key, info, e, editorContext)}
      // onKeyUp={appEvents.onKeyUp}
      onDrag={spaceEvents.onDrag}
      onDrop={spaceEvents.onDrop}
      onDragStart={spaceEvents.onDragStart}
      onDragLeave={spaceEvents.onDragLeave}
      onDragEnd={spaceEvents.onDragEnd}
      onDragEnter={spaceEvents.onDragEnter}
      hideBounds={hideBounds}
      hideBindingHandles={true}
      hideRotateHandles={true}
    />
  );
}
