import { useLocation } from 'wouter';
import * as styles from '../styles/Website.css';

export function GetStartedButton(props: { style?: React.CSSProperties }) {
  const [, setLocation] = useLocation();
  return (
    <button
      className={styles.button({ type: 'primary', size: 'large' })}
      style={{ ...props.style }}
      onClick={() => setLocation('/getstarted')}
    >
      Get started
    </button>
  );
}
