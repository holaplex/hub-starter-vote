import { Me } from '@/graphql.types';
import { MeContext } from '@/providers/MeProvider';
import { useContext } from 'react';

export default function useMe(): Me | undefined {
  const { me } = useContext(MeContext);

  return me;
}
