import { Link } from 'wouter';
import * as styles from '../styles/Website.css';

export function GetStartedButton(props: {
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'tertiary'
}) {
  return (
    <Link
      className={styles.button({ type: props.type ?? 'secondary', size: props.size ?? 'medium' })}
      style={{ ...props.style }}
      to="/getstarted"
    >
      Start for free
    </Link>
  );
}
