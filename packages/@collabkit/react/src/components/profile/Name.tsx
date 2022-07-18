import { styled } from '../UIKit';

export const StyledName = styled('div', {
  fontSize: '$fontSize$2',
  fontWeight: '$fontWeights$1',
  lineHeight: '$lineHeights$0',
  gap: '12px',
  flexDirection: 'row',
  color: '$colors$primaryText',
  alignItems: 'baseline',
});

const Name = StyledName;

export { Name };
