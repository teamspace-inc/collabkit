import * as styles from '../styles/Website.css';

export function GetStartedButton(props: { style?: React.CSSProperties }) {
  return (
    <button
      className={styles.button({ type: 'primary', size: 'large' })}
      style={{ ...props.style }}
      onClick={() => window.open('https://calendly.com/namit-chadha/30min?month=2022-07', '_blank')}
    >
      Get started
    </button>
  );
}
