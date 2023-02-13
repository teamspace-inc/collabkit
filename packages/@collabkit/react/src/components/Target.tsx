import { Target } from '@collabkit/core';
import { createContext } from 'react';

export const TargetContext = createContext<Target | null>(null);
