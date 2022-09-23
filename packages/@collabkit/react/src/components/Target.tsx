import { createContext } from 'react';
import { Target as TargetType } from '../constants';

export const TargetContext = createContext<TargetType | null>(null);
