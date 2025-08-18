import { useEffect, useState } from 'react';
import { Loan } from '../types';

export function useLoansQuery(status: string) {
  const [data, setData] = useState<Loan[]>([]);

  useEffect(() => {
    fetch(`/api/loans?status=${status}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, [status]);

  return data;
}
