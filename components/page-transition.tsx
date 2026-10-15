import type { ReactNode } from 'react';

// Section entrances provide the introduction without an artificial loading delay
// or an opacity layer around the entire portfolio.
export default function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
