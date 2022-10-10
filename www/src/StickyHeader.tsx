import { header, headerInner } from './styles/Website.css';

export function StickyHeader(props: {
  invertFilter?: number;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={header}
      style={{ filter: `invert(${props.invertFilter ?? 0})`, ...props.style }}
    >
      <div className={headerInner}>
        <div>{props.left}</div>
        <div style={{ display: 'flex', flex: 1 }}></div>
        <div style={{ display: 'flex' }}>{props.right}</div>
      </div>
    </div>
  );
}
