import { basicCardCss } from 'styles/cardStyles';
import { cardThemes } from 'styles/stitches.config';
import { STICKY_NOTE_HEIGHT, STICKY_NOTE_WIDTH } from './StickyComponent';

export const StickyPreview = () => {
  return (
    <div className={cardThemes.yellow}>
      <div
        className={basicCardCss()}
        style={{
          width: STICKY_NOTE_WIDTH,
          minHeight: STICKY_NOTE_HEIGHT,
          opacity: 0.8,
        }}
      >
        <div></div>
      </div>
    </div>
  );
};
