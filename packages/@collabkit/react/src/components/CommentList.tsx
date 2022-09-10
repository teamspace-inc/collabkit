import React from 'react';
import { commentListStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';

export const Root = (props: React.ComponentProps<'div'>) => <div {...props} />;

export default styled(Root, commentListStyles.list);
