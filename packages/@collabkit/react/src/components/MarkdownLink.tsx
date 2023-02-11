import React from 'react';
import { ComposerPin } from '@collabkit/editor';

export function MarkdownLink(props: any) {
  if (props.href.startsWith('#PIN')) {
    return <ComposerPin id={'foo'} />;
  }
  return <a {...props} />;
}
