import { styled } from '../UIKit';

export const StyledName = styled('div', {
  fontSize: 14,
  fontWeight: '500',
  lineHeight: '20px',
  display: 'flex',
  gap: 5,
  flexDirection: 'row',
  alignItems: 'baseline',
});

const Name = StyledName;

export { Name };
