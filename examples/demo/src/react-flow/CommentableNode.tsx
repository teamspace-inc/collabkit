import { Commentable } from '@collabkit/react';
import { useNodeId } from 'reactflow';
import { Handle, Position } from 'reactflow';

function CommentableNode({ data }: { data: any }): JSX.Element {
  const nodeId = useNodeId();
  const handleStyle = { left: 10 };

  return (
    <>
      <Commentable.Container key={nodeId} objectId={nodeId ? nodeId : ''}>
        <div className="commentable-node">
          {!data.hideTop ? <Handle type="target" position={Position.Top} /> : null}
          <div>
            <label htmlFor="text">{data.position}</label>
            {data.name}
          </div>
          <Handle type="source" position={Position.Bottom} id="b" />
        </div>
      </Commentable.Container>
    </>
  );
}

export default CommentableNode;
