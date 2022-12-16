import { Inbox, Scrollable, ThemeProvider, useUnreadThreadsCount } from '@collabkit/react';
import * as Popover from '@radix-ui/react-popover';
import { MouseEvent as ReactMouseEvent, CSSProperties, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Node,
  Viewport,
  SnapGrid,
  Connection,
  Edge,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  OnSelectionChangeParams,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

const log = (...args: any[]) => {
  // console.log(...args);
};

const onNodeDragStart = (_: ReactMouseEvent, node: Node, nodes: Node[]) =>
  log('drag start', node, nodes);
const onNodeDrag = (_: ReactMouseEvent, node: Node, nodes: Node[]) => log('drag', node, nodes);
const onNodeDragStop = (_: ReactMouseEvent, node: Node, nodes: Node[]) =>
  log('drag stop', node, nodes);
const onNodeDoubleClick = (_: ReactMouseEvent, node: Node) => log('node double click', node);
const onPaneClick = (event: ReactMouseEvent) => log('pane click', event);
const onPaneScroll = (event?: ReactMouseEvent) => log('pane scroll', event);
const onPaneContextMenu = (event: ReactMouseEvent) => log('pane context menu', event);
const onSelectionDrag = (_: ReactMouseEvent, nodes: Node[]) => log('selection drag', nodes);
const onSelectionDragStart = (_: ReactMouseEvent, nodes: Node[]) =>
  log('selection drag start', nodes);
const onSelectionDragStop = (_: ReactMouseEvent, nodes: Node[]) =>
  log('selection drag stop', nodes);
const onSelectionContextMenu = (event: ReactMouseEvent, nodes: Node[]) => {
  event.preventDefault();
  log('selection context menu', nodes);
};
const onNodeClick = (_: ReactMouseEvent, node: Node) => log('node click:', node);

const onSelectionChange = ({ nodes, edges }: OnSelectionChangeParams) =>
  log('selection change', nodes, edges);
const onInit = (reactFlowInstance: ReactFlowInstance) => {
  log('pane ready:', reactFlowInstance);
};

const onMoveStart = (_: MouseEvent | TouchEvent, viewport: Viewport) =>
  log('zoom/move start', viewport);
const onMoveEnd = (_: MouseEvent | TouchEvent, viewport: Viewport) =>
  log('zoom/move end', viewport);
const onEdgeContextMenu = (_: ReactMouseEvent, edge: Edge) => log('edge context menu', edge);
const onEdgeMouseEnter = (_: ReactMouseEvent, edge: Edge) => log('edge mouse enter', edge);
const onEdgeMouseMove = (_: ReactMouseEvent, edge: Edge) => log('edge mouse move', edge);
const onEdgeMouseLeave = (_: ReactMouseEvent, edge: Edge) => log('edge mouse leave', edge);
const onEdgeDoubleClick = (_: ReactMouseEvent, edge: Edge) => log('edge double click', edge);
const onNodesDelete = (nodes: Node[]) => log('nodes delete', nodes);
const onEdgesDelete = (edges: Edge[]) => log('edges delete', edges);
const onPaneMouseMove = (e: ReactMouseEvent) => log('pane move', e.clientX, e.clientY);

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: (
        <>
          You can find the docs on{' '}
          <a href="https://github.com/wbkd/react-flow" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </>
      ),
    },
  },
  {
    id: '5',
    data: {
      label: (
        <>
          Or check out the other <strong>examples</strong>
        </>
      ),
    },
    position: { x: 250, y: 325 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: (
        <>
          An <strong>output node (not deletable)</strong>
        </>
      ),
    },
    position: { x: 100, y: 480 },
    deletable: false,
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Another output node' },
    position: { x: 400, y: 450 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e4-5', source: '4', target: '5', label: 'edge with arrow head' },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    deletable: false,
    label: 'smooth step edge (not deletable)',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
];

const connectionLineStyle: CSSProperties = { stroke: '#ddd' };
const snapGrid: SnapGrid = [25, 25];

const OverviewFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onPaneScroll={onPaneScroll}
      onPaneContextMenu={onPaneContextMenu}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={onNodeDoubleClick}
      onSelectionDragStart={onSelectionDragStart}
      onSelectionDrag={onSelectionDrag}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveStart={onMoveStart}
      onMoveEnd={onMoveEnd}
      onInit={onInit}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      onEdgeContextMenu={onEdgeContextMenu}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseMove={onEdgeMouseMove}
      onEdgeMouseLeave={onEdgeMouseLeave}
      onEdgeDoubleClick={onEdgeDoubleClick}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      attributionPosition="bottom-right"
      maxZoom={Infinity}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onPaneMouseMove={onPaneMouseMove}
    >
      <Controls
        position="bottom-center"
        showInteractive={false}
        style={{
          display: 'flex',
        }}
      />
      <Background color="#aaa" gap={25} />
      <Menu />
    </ReactFlow>
  );
};

function Menu() {
  return (
    <div className="z-10 absolute top-4 right-4 flex">
      <CommentsPopover />

      <button
        disabled
        type="button"
        className="font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border-y px-0 w-8 h-8"
      >
        <ClockIcon />
      </button>
      <button
        disabled
        type="button"
        className="font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border px-0 rounded-r-lg w-8 h-8"
      >
        <EllipsisIcon />
      </button>
    </div>
  );
}

function CommentsPopover() {
  const unreadCount = useUnreadThreadsCount();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="relative font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border px-0 rounded-l-lg w-8 h-8 hover:bg-gray-100"
          aria-label="Open comments"
        >
          <MessageIcon hasUnread={unreadCount > 0} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="relative bg-white drop-shadow-2p rounded-lg z-40 transition-transform flex flex-col"
          sideOffset={2}
          arrowPadding={20}
          align="end"
        >
          <div className="flex justify-between px-4 py-3 border-b border-[#EFF0F1]">
            <div className="uppercase text-[#63676D] font-bold text-xs">Comments</div>
            <Popover.Close className="">
              <CloseIcon />
            </Popover.Close>
          </div>
          <ThemeProvider
            theme={{
              inbox: {
                width: '320px',
                item: {
                  borderBottom: '1px solid #EFF0F1',
                },
              },
            }}
          >
            <Inbox maxHeight="calc(100vh - 12rem)" />
            <button className="text-sm m-4 py-1.5 rounded-lg bg-[#0080FF] text-white font-semibold">
              Add comment
            </button>
          </ThemeProvider>
          <Popover.Arrow asChild>
            <svg
              width="28"
              height="11.928888"
              viewBox="0 0 28 11.928888"
              fill="none"
              className="visible"
            >
              <path
                d="m 10.4645,10.46443 c 1.9526,1.952613 5.1185,1.952611 7.0711,-10e-6 L 28,0 H 0 Z"
                fill="#ffffff"
              />
            </svg>
          </Popover.Arrow>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function MessageIcon({ hasUnread }: { hasUnread?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.6667 5H5.33333C4.97971 5 4.64057 5.14048 4.39052 5.39052C4.14048 5.64057 4 5.97971 4 6.33333V15.692C4.00039 15.8654 4.03541 16.037 4.10299 16.1966C4.17057 16.3563 4.26935 16.5008 4.39355 16.6218C4.51774 16.7427 4.66485 16.8377 4.82623 16.901C4.98761 16.9644 5.16001 16.9949 5.33333 16.9907H7V19.324C6.99992 19.4457 7.03314 19.5651 7.09607 19.6693C7.159 19.7734 7.24923 19.8583 7.35699 19.9149C7.46475 19.9714 7.58592 19.9973 7.70738 19.9899C7.82883 19.9825 7.94594 19.9419 8.046 19.8727L12.208 16.9907H18.6667C19.0203 16.9907 19.3594 16.8502 19.6095 16.6002C19.8595 16.3501 20 16.011 20 15.6574V6.33333C20 5.97971 19.8595 5.64057 19.6095 5.39052C19.3594 5.14048 19.0203 5 18.6667 5ZM18.0039 14.8341C18.0039 14.8783 17.9863 14.9207 17.9551 14.952C17.9238 14.9832 17.8814 15.0008 17.8372 15.0008H12C11.8644 15.0009 11.7321 15.0423 11.6207 15.1195L8.33333 16.9907V15.6675C8.33333 15.4907 8.2631 15.3211 8.13807 15.1961C8.01305 15.071 7.84348 15.0008 7.66667 15.0008H6.17116C6.12696 15.0008 6.08457 14.9832 6.05331 14.952C6.02205 14.9207 6.00449 14.8783 6.00449 14.8341L6.0013 7.16667C6.0013 7.12246 6.01886 7.08007 6.05012 7.04882C6.08137 7.01756 6.12377 7 6.16797 7H17.8372C17.8814 7 17.9238 7.01756 17.9551 7.04882C17.9863 7.08007 18.0039 7.12246 18.0039 7.16667V14.8341Z"
        fill="#A2A6AC"
      />
      <path
        d="M8.00065 10.0013H16.0007C16.1775 10.0013 16.347 9.93106 16.4721 9.80604C16.5971 9.68102 16.6673 9.51145 16.6673 9.33464C16.6673 9.15782 16.5971 8.98826 16.4721 8.86323C16.347 8.73821 16.1775 8.66797 16.0007 8.66797H8.00065C7.82384 8.66797 7.65427 8.73821 7.52925 8.86323C7.40422 8.98826 7.33398 9.15782 7.33398 9.33464C7.33398 9.51145 7.40422 9.68102 7.52925 9.80604C7.65427 9.93106 7.82384 10.0013 8.00065 10.0013Z"
        fill="#A2A6AC"
      />
      <path
        d="M8.00065 13.0013H16.0007C16.1775 13.0013 16.347 12.9311 16.4721 12.806C16.5971 12.681 16.6673 12.5114 16.6673 12.3346C16.6673 12.1578 16.5971 11.9883 16.4721 11.8632C16.347 11.7382 16.1775 11.668 16.0007 11.668H8.00065C7.82384 11.668 7.65427 11.7382 7.52925 11.8632C7.40422 11.9883 7.33398 12.1578 7.33398 12.3346C7.33398 12.5114 7.40422 12.681 7.52925 12.806C7.65427 12.9311 7.82384 13.0013 8.00065 13.0013Z"
        fill="#A2A6AC"
      />
      {hasUnread && (
        <rect
          x="13"
          y="1"
          width="10"
          height="10"
          rx="5"
          fill="#0080FF"
          stroke="white"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
        fill="#A2A6AC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7.5C12.5523 7.5 13 7.94772 13 8.5V11.5858L15.2071 13.7929C15.5976 14.1834 15.5976 14.8166 15.2071 15.2071C14.8166 15.5976 14.1834 15.5976 13.7929 15.2071L11 12.4142V8.5C11 7.94772 11.4477 7.5 12 7.5Z"
        fill="#A2A6AC"
      />
    </svg>
  );
}

function EllipsisIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.16667 14.1654C7.36328 14.1654 8.33333 13.1953 8.33333 11.9987C8.33333 10.8021 7.36328 9.83203 6.16667 9.83203C4.97005 9.83203 4 10.8021 4 11.9987C4 13.1953 4.97005 14.1654 6.16667 14.1654Z"
        fill="#A2A6AC"
      />
      <path
        d="M12 14.1654C13.1966 14.1654 14.1667 13.1953 14.1667 11.9987C14.1667 10.8021 13.1966 9.83203 12 9.83203C10.8034 9.83203 9.83333 10.8021 9.83333 11.9987C9.83333 13.1953 10.8034 14.1654 12 14.1654Z"
        fill="#A2A6AC"
      />
      <path
        d="M17.8333 14.1654C19.03 14.1654 20 13.1953 20 11.9987C20 10.8021 19.03 9.83203 17.8333 9.83203C16.6367 9.83203 15.6667 10.8021 15.6667 11.9987C15.6667 13.1953 16.6367 14.1654 17.8333 14.1654Z"
        fill="#A2A6AC"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4L4 12"
        stroke="#A2A6AB"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 12L4 4"
        stroke="#A2A6AB"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default () => (
  <div style={{ height: '100vh' }}>
    <OverviewFlow />
  </div>
);
