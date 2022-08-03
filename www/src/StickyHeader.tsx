import { Header, HStack } from './UIKit';

export function StickyHeader(props: {
  invertFilter?: number;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Header style={{ filter: `invert(${props.invertFilter ?? 0})`, ...props.style }}>
      <div>{props.left}</div>
      <div style={{ display: 'flex', flex: 1 }}></div>
      <HStack>{props.right}</HStack>
    </Header>
  );
}
