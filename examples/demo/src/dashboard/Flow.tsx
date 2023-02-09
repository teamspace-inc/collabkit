import { useCallback, useMemo, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, useOnViewportChange, Viewport } from 'reactflow';
import { Commentable, Thread } from '@collabkit/react';
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
            type: 'textUpdater'
        },
        {
            id: '3',
            position: { x: 100, y: 100 },
            data: { label: 'ghj' },
        }
    ];

    const e = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];
    const [nodes, setNodes] = useState(n);
    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

    return (
        <div className="flex h-screen">
            <div style={{ height: '60%', width: '100%' }}>
                <ReactFlow nodes={nodes} onNodeDragStart={() => { }} onNodeDragStop={() => {  }} onNodesChange={onNodesChange} nodeTypes={nodeTypes} >
                    <ViewportListener />
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}

export default Flow;