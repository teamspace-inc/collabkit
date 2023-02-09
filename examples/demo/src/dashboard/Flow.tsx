import { useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, NodeChange } from 'reactflow';
import 'reactflow/dist/style.css';
import CommentableNode from '../react-flow/CommentableNode';
import ViewportListener from '../react-flow/ViewportListener';

const nodeTypes = { textUpdater: CommentableNode };

function Flow() {
  const n = [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
      type: 'textUpdater',
    },
    {
      id: '2',
      position: { x: 50, y: 50 },
      data: { label: 'World' },
      type: 'textUpdater',
    },
    {
      id: '3',
      position: { x: 100, y: 100 },
      data: { label: 'ghj' },
    },
  ];

  const [nodes, setNodes] = useState(n);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div className="flex h-screen">
      <div style={{ height: 'calc(100% - 156px)', width: '100%' }}>
        <ReactFlow
          defaultViewport={{ zoom: 1, x: 250, y: 250 }}
          nodes={nodes}
          onNodeDragStart={() => {}}
          onNodeDragStop={() => {}}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
        >
          <ViewportListener />
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
