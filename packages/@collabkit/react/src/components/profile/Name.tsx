import { styled } from '../UIKit';

export const StyledName = styled('div', {
  fontSize: '$fontSize$1',
  fontWeight: '$fontWeights$1',
  lineHeight: '$lineHeights$0',
  display: 'flex',
  gap: '$padding$0',
  flexDirection: 'row',
  color: '$colors$primaryText',
  alignItems: 'baseline',
});

const Name = StyledName;

export { Name };
