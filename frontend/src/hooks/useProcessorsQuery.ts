import { useEffect, useState } from 'react';
import { Processor } from '../types';

export function useProcessorsQuery(search: string) {
  const [data, setData] = useState<Processor[]>([]);

  useEffect(() => {
    fetch(`/api/processors?search=${search}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, [search]);

  return data;
}
