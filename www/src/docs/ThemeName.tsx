import { docDemoOverlay } from '../styles/docs/Docs.css';

export function ThemeName(props: { children: React.ReactNode }) {
  return (
    <div
      className={docDemoOverlay}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
      }}
    >
      {props.children}
    </div>
  );
}
