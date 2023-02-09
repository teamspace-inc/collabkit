import { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from 'reactflow';
import CommentableNode from '../react-flow/CommentableNode';
import ViewportListener from '../react-flow/ViewportListener';
import 'reactflow/dist/base.css';
import '../react-flow/commentable-node.css';

const nodeTypes = { commentable: CommentableNode };

function Flow() {
  const initialNodes = [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: { position: 'CEO', name: 'Namit Chadha', hideTop: true },
      type: 'commentable',
    },
    {
      id: '2',
      position: { x: 150, y: 150 },
      data: { position: 'Developer', name: 'Ville Immonen', hideTop: false },
      type: 'commentable',
    },
    {
      id: '3',
      position: { x: -150, y: 150 },
      data: { position: 'Designer', name: 'Dominic Burt', hideTop: false },
      type: 'commentable',
    },
    {
      id: '4',
      position: { x: 10, y: 240 },
      data: { position: 'Intern', name: 'Meet Shah', hideTop: false },
      type: 'commentable',
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '1', target: '4' },
    { id: 'e2-4', source: '2', target: '4' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="flex h-screen">
      <div style={{ height: 'calc(100% - 156px)', width: '100%' }}>
        <ReactFlow
          defaultViewport={{ zoom: 1, x: 250, y: 200 }}
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
