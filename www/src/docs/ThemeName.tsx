import { docDemoOverlay } from '../styles/docs/Docs.css';
import { vars } from '../styles/Theme.css';

export function ThemeName(props: { children: React.ReactNode }) {
  return (
    <div
      className={docDemoOverlay}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        fontWeight: '500',
        color: vars.color.textContrastLow,
      }}
    >
      {props.children}
    </div>
  );
}
