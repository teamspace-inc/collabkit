import React from 'react';

import {
  TextAa,
  NavigationArrow,
  NoteBlank,
  Image,
  Hand,
  Table,
  Article,
  ArrowUpRight,
} from 'phosphor-react';

import actions from 'state/actions';
import styled from 'styles/stitches.config';
import { useCallback, useMemo } from 'react';
import { DISABLED_TOOLS, TABLE_ENABLED, Tool, Tools, Z } from 'state/constants';
import { useSpaceState } from 'hooks/useSpaceContext';
import { useAppContext } from 'hooks/useAppContext';
import { useSnapshot } from 'valtio';
import { ToggleSidebarButton } from 'components/Sidebar';
import { IconButton } from 'components/IconButton';
import { Hint } from './Tooltip';

export interface ToolbarProps {
  tool: Tool;
  disabled?: boolean;
}

function getFileFromInputChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
  if (e.target.files) {
    const file = e.target.files[0];
    if (file) {
      return file;
    }
  }
  return null;
}

function readFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = () => {
      // it's pretty instant we can
      // ignore this for now
      console.debug('reading file...');
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
}

const toolIcons: Record<Tool, React.ReactNode> = {
  select: <NavigationArrow />,
  hand: <Hand />,
  text: <TextAa />,
  image: <Image />,
  sticky: <NoteBlank />,
  card: <Article />,
  table: <Table />,
  link: <ArrowUpRight />,
};

const tooltips: Record<Tool, string | React.ReactNode> = {
  select: (
    <>
      Move Tool <Hint>V</Hint>
    </>
  ),
  table: (
    <>
      Table <Hint>X</Hint>
    </>
  ),
  hand: (
    <>
      Hand Tool <Hint>␣</Hint>
    </>
  ),
  text: (
    <>
      Text <Hint>T</Hint>
    </>
  ),
  image: 'Image',
  sticky: (
    <>
      Sticky Note <Hint>S</Hint>
    </>
  ),
  card: (
    <>
      Card <Hint>C</Hint>
    </>
  ),
  link: (
    <>
      Link <Hint>L</Hint>
    </>
  ),
};

type ToolProps = {
  isActive: boolean;
  tool: Tool;
  disabled?: boolean;
};

export function ToolButton({ isActive, tool, disabled }: ToolProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const state = useSpaceState();

  const onToolSelect = useCallback(
    (tool: Tool, ref: React.RefObject<HTMLInputElement>) => {
      if (tool === 'image') {
        document.body.onfocus = () => {
          if (ref.current?.files?.length === 0) {
            actions.selectTool(state, 'select');
          }
          document.body.onfocus = null;
        };
        ref.current?.click();
      }
      actions.selectTool(state, tool);
    },
    [state]
  );

  const onFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = getFileFromInputChangeEvent(e);
      if (!file) {
        // reset back to original tool
        actions.selectTool(state, 'select');
        return;
      }

      try {
        const data = await readFile(file);
        actions.uploadImageFile(state, { file, data });
      } catch (e) {
        console.error(e);
      }
    },
    [state]
  );

  const onFileSelectCancel = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      actions.selectTool(state, 'select');
    },
    [state]
  );

  return (
    <IconButton
      activeIconWeight="regular"
      iconWeight="regular"
      id={tool}
      isActive={isActive}
      onClick={() => onToolSelect(tool, fileInputRef)}
      // disabled={disabled}
      tooltip={tooltips[tool]}
    >
      {toolIcons[tool]}
      {tool === 'image' && (
        <div style={{ display: 'none' }}>
          <input
            accept="image/*"
            onBlur={onFileSelectCancel}
            onChange={onFileSelect}
            ref={fileInputRef}
            type="file"
            data-test-id="upload-file"
          />
        </div>
      )}
    </IconButton>
  );
}

export function Toolbar(props: ToolbarProps) {
  const { isSidebarOpen } = useSnapshot(useAppContext().store);

  return useMemo(() => {
    const toolsButtons: React.ReactElement[] = [];
    for (const tool of Tools) {
      if (DISABLED_TOOLS.includes(tool)) continue;
      if (tool === 'table' && !TABLE_ENABLED) continue;
      toolsButtons.push(
        <ToolButton
          key={tool}
          isActive={props.tool === tool}
          tool={tool}
          disabled={props.disabled}
        />
      );
    }

    return (
      <ToolbarContainer>
        <PrimaryTools>
          {' '}
          {!isSidebarOpen && <ToggleSidebarButton onlyShowIfHidden={true} />}
          {toolsButtons}
        </PrimaryTools>
      </ToolbarContainer>
    );
  }, [props.tool, props.disabled, isSidebarOpen]);
}

const ToolbarContainer = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  zIndex: Z.CANVAS_TOOL,
});

const PrimaryTools = styled('div', {
  display: 'flex',
  marginTop: '$space$1',
  marginLeft: '$space$1',
  padding: '$space$0',
  gap: '$space$0',
  pointerEvents: 'all',
  borderRadius: '100px',
  overflow: 'hidden',
  alignSelf: 'center',
  backgroundColor: 'white',
});

export const UIState = styled('span');

export const ConnectionStatus = styled('span', {
  variants: {
    status: {
      connected: { color: 'green' },
      offline: { color: 'orange' },
    },
  },
});

export const LoadingStatus = styled('span');
