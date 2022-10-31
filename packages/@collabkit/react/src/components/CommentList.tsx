import React from 'react';
import { root } from '../styles/components/CommentList.css';

const CommentListRoot = (props: React.ComponentProps<'div'>) => <div className={root} {...props} />;

export { CommentListRoot as Root };

export default function CommentList() {}

CommentList.Root = CommentListRoot;
