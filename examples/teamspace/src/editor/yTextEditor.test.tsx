import React from 'react';
global.React = React;

jest.mock('../environment.ts');

import * as Y from 'yjs';
import { YTextEditor } from './index';
import { ySyncPluginKey } from 'y-prosemirror';
import '@testing-library/jest-dom';
import { render, act, screen, waitFor } from '@testing-library/react';

describe('yTextEditor', () => {
  test('renders prosemirror', () => {
    const doc = new Y.Doc();
    const fragment = doc.getXmlFragment('prosemirror');
    const undoManager = new Y.UndoManager(fragment, { trackedOrigins: new Set([ySyncPluginKey]) });
    const component = render(
      <YTextEditor editable={true} fragment={fragment} undoManager={undoManager} />
    );
    expect(component.container.getElementsByClassName('ProseMirror').length).toBe(1);
  });

  test('renders Y.XMLFragment', async () => {
    const doc = new Y.Doc({ guid: 'a', gc: false });
    const f = doc.getXmlFragment('somefragname');

    const p = new Y.XmlElement('paragraph');
    const t = new Y.XmlText('hello world');
    f.insert(0, [p]);
    p.insert(0, [t]);

    expect(f.toJSON()).toStrictEqual('<paragraph>hello world</paragraph>');

    let component = render(<YTextEditor editable={true} fragment={f} />);

    await waitFor(() => {
      expect(component.container.getElementsByClassName('ProseMirror').length).toBe(1);
    });

    await waitFor(() => {
      expect(screen.getByText('hello world')).toBeInTheDocument();
    });

    act(() => {
      const t = new Y.XmlText(' hello mars');
      p.insert(1, [t]);
    });

    await waitFor(() => {
      expect(screen.getByText('hello world hello mars')).toBeInTheDocument();
    });
  });
});
