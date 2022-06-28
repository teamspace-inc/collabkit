import { createContext } from 'react';
import { Target as TargetType } from '../constants';

export const TargetContext = createContext<{ target: TargetType | null }>({
  target: null,
});

export function Target(props: { target: TargetType; children: React.ReactNode }) {
  return (
    <TargetContext.Provider value={{ target: props.target }}>
      {props.children}
    </TargetContext.Provider>
  );
}
