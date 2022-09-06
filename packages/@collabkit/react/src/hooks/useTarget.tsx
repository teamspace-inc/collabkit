import { useContext } from 'react';
import { TargetContext } from '../components/Target';

export function useTarget() {
  const { target } = useContext(TargetContext);
  if (!target) {
    throw new Error('Target context not found');
  }
  return { target };
}
