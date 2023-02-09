import { Commentable } from '@collabkit/react';
import { useNodeId } from 'reactflow';

function CommentableNode(): JSX.Element {
    const nodeId = useNodeId();

    return (
        <>
            <Commentable.Container key={nodeId} objectId={nodeId ? nodeId : ""}>
                <label htmlFor="text">Test:</label>
            </Commentable.Container>
        </>
    );
}

export default CommentableNode;