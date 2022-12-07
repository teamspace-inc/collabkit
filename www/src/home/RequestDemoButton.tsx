import { vars } from '../styles/Theme.css';
import * as styles from '../styles/Website.css';

export function RequestDemoButton(props: {
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <a
      className={styles.button({ type: 'primary', size: props.size ?? 'medium' })}
      style={{ ...props.style, color: `${vars.color.bgContrastLowest}` }}
      target="_blank"
      href="https://calendly.com/namit-chadha/collabkit-demo"
    >
      Request Demo
    </a>
  );
}
