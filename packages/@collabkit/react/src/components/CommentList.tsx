import React from 'react';
import { commentListStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';

const CommentListRoot = (props: React.ComponentProps<'div'>) => <div {...props} />;
export { CommentListRoot as Root };

export default styled(CommentListRoot, commentListStyles.list);
