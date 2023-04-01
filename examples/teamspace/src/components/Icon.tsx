import { IconContext } from 'phosphor-react';

export function Icon({
  isActive,
  color,
  children,
  size,
}: {
  isActive?: boolean;
  size: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <IconContext.Provider value={{ size, color, weight: isActive ? 'bold' : 'regular' }}>
      {children}
    </IconContext.Provider>
  );
}
