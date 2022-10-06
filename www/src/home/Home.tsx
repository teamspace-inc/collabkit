import { styled } from '../UIKit';
import * as styles from '../styles/Website.css';

export function RequestDemoButton(props: { style?: React.CSSProperties }) {
  return (
    <button
      className={styles.button({ type: 'primary', size: 'large' })}
      style={{ ...props.style }}
      onClick={() =>
        (window.location.href = 'https://calendly.com/namit-chadha/30min?month=2022-07')
      }
    >
      Request demo
    </button>
  );
}

export const DemoImageMobileFallback = styled('img', {
  width: '90vw',
  maxWidth: '90vw',
});
