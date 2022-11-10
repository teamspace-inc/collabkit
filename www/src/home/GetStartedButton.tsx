import { Link } from 'wouter';
import { vars } from '../styles/Theme.css';
import * as styles from '../styles/Website.css';

export function GetStartedButton(props: {
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <Link
      className={styles.button({ type: 'primary', size: props.size ?? 'large' })}
      style={{ ...props.style, color: `${vars.color.bgContrastLowest}` }}
      to="/getstarted"
    >
      Get started
    </Link>
  );
}
