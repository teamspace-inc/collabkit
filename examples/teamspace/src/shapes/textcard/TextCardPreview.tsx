import { TextCardDefaultSize } from './TextCardComponent';
import { basicCardCss } from 'styles/cardStyles';

export const TextCardPreview = () => {
  const style: React.CSSProperties = {
    width: TextCardDefaultSize[0],
    height: TextCardDefaultSize[1],
    opacity: 0.66,
  };
  return <div style={style} className={basicCardCss({ isRounded: true }).className}></div>;
};
