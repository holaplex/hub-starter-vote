import { createContext } from 'react';
import { Me } from '../graphql.types';

interface MeContext {
  me: Me | undefined;
}

export const MeContext = createContext<MeContext>({ me: undefined });

export default function MeProvider({
  me,
  children
}: {
  me: Me | undefined;
  children: React.ReactNode;
}) {
  return <MeContext.Provider value={{ me }}>{children}</MeContext.Provider>;
}
