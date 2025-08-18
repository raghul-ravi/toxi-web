import axios from 'axios';
import type { Loan, Processor, AssignLoansRequest } from '../types/types';

const API_BASE_URL = 'http://localhost:5139/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loansApi = {
  getLoans: async (status: string = 'all'): Promise<Loan[]> => {
    const response = await api.get(`/loans?status=${status}`);
    return response.data;
  },

  getKpis: async (): Promise<Record<string, number>> => {
    const response = await api.get('/loans/kpis');
    return response.data;
  },

  assignLoans: async (request: AssignLoansRequest): Promise<void> => {
    await api.post('/loans/assign', request);
  },
};

export const processorsApi = {
  getProcessors: async (search?: string): Promise<Processor[]> => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await api.get(`/processors${params}`);
    return response.data;
  },
};