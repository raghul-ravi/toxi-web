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
  sla?: string;
}

export interface Processor {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface ColumnDef {
  id: string;
  label: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
}

export interface SortState {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  [columnId: string]: string | number | Date | null;
}

export interface AssignLoansRequest {
  loanIds: string[];
  processorId: string;
}

export interface KpiItem {
  label: string;
  value: number;
}