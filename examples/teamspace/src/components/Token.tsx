import { blackA } from '@radix-ui/colors';
// import { useAppEvents } from '../events';
import { Article } from 'phosphor-react';
import ReactDOM from 'react-dom';
import { LinkableTarget } from 'state/constants';
import { store } from 'state/store';
import styled from 'styles/stitches.config';
import { useSnapshot } from 'valtio';
import { AppContext } from 'hooks/useAppContext';

const StyledToken = styled('span', {
  background: blackA.blackA4,
  padding: '2px 1px',
  margin: '-2px -1px',
  borderRadius: 6,
  fontWeight: 'inherit',
  cursor: 'pointer',
  '&:hover': {
    background: blackA.blackA6,
  },
});

export function Token(props: { target: LinkableTarget }) {
  const data = useSnapshot(store);
  // const { onTokenClick } = useAppEvents();

  if (!props.target) {
    return null;
  }

  const item = data.search.indexedItems[props.target.id];
  if (!item) {
    return null;
  }
  return (
    <StyledToken tabIndex={-1}>
      <Article
        style={{ position: 'relative', top: '0.1em', marginRight: '0.1em' }}
        weight={'regular'}
        size={'1em'}
      />
      {item.title || 'Untitled'}
    </StyledToken>
  );
}

export function renderToken(el: Element, attrs: Record<string, string>) {
  const root = ReactDOM.createRoot(el);
  const target = { id: attrs['data-target-id'], type: attrs['data-target-type'] } as LinkableTarget;
  root.render(
    <AppContext.Provider value={{ store }}>
      <Token target={target} />
    </AppContext.Provider>
  );
}
