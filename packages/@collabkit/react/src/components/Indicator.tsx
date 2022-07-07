import { styled, theme, themeIds, themes } from './UIKit';

const StyledIndicator = styled('div', {
  width: 32,
  height: 32,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$accent10',
  color: '$accent4',
  borderRadius: 32,
  borderBottomLeftRadius: 32,
  border: '0px solid $neutral12',
  boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  '&:hover': {
    background: '$accent9',
  },
  variants: {
    color: {},
  },
});

export function Indicator(props: { letter: string }) {
  return (
    <div className={themes[themeIds[Math.floor(Math.random() * themeIds.length)]]}>
      <StyledIndicator>{props.letter}</StyledIndicator>
    </div>
  );
}
