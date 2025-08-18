export interface Loan {
  id: string;
  loanNumber: string;
  loanStatus: string;
  statusDateTime: string;
  loanTypePurpose: string;
  sellerName: string;
  xpressType: string;
  borrowerCount: number;
  mortgageProgramType: string;
  assignedTo?: string;
  assignedDateTime?: string;
  groupAssignedTo?: string;
  sla: number;
}

export interface Processor {
  id: string;
  name: string;
}

export interface ColumnDef {
  id: string;
  label: string;
}

export interface SortState {
  columnId: string;
  direction: 'asc' | 'desc';
}

export type FilterState = Record<string, unknown>;
