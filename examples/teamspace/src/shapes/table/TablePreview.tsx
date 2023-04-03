import { cardCss } from 'styles/cardStyles';

export const TablePreview = () => {
  const style: React.CSSProperties = {
    width: 440,
    height: 200,
    opacity: 0.66,
  };
  return (
    <div style={style}>
      <div className={cardCss({ isRounded: true }).className} />
    </div>
  );
};
