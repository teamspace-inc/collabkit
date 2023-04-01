import { useEffect } from 'react';
import { sand } from '@radix-ui/colors';
import { TextCard } from 'shapes/textcard/TextCard';
import { useSnapshot } from 'valtio';

import { SIDEBAR_WIDTH } from 'components/Sidebar';
import { useAppContext } from 'hooks/useAppContext';
import { loadAllCards } from 'network/loadCard';

export function CardCatalog() {
  const { store } = useAppContext();
  const data = useSnapshot(store);

  useEffect(() => {
    // TODO(ville): do this earlier, when the page is loading?
    loadAllCards(store);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        padding: 11,
        overflowY: 'auto',
        left: SIDEBAR_WIDTH,
        background: sand.sand3,
      }}
    >
      <h1
        style={{
          paddingTop: 11,
          paddingLeft: 11,
          marginBottom: 11,
          fontSize: 33,
          lineHeight: '33px',
          color: sand.sand12,
        }}
      >
        Catalog
      </h1>

      <div
        style={{
          padding: 11,
          display: 'grid',
          gridTemplateColumns: 'minmax(10px, 1fr) minmax(10px, 1fr) minmax(10px, 1fr)',
          gap: 11,
        }}
      >
        {Object.values(data.cards).map((cardData) => (
          <div
            key={cardData.docId}
            style={{
              minHeight: 240,
              maxHeight: 240,
            }}
          >
            <TextCard
              isSmall={true}
              editable={false}
              target={{ type: 'card', id: cardData.docId }}
              isRounded={true}
              isEditing={false}
              isDragging={false}
              fullHeight={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
