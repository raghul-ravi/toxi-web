import type { ColumnDef } from '../types/types';

export const LOAN_COLUMNS: ColumnDef[] = [
  { id: 'loanNumber', label: 'Loan Number', sortable: true, filterable: true },
  { id: 'loanStatus', label: 'Loan Status', sortable: true, filterable: true },
  { id: 'statusDateTime', label: 'Status Date & Time', sortable: true, filterable: true },
  { id: 'loanTypePurpose', label: 'Loan Type & Purpose', sortable: true, filterable: true },
  { id: 'sellerName', label: 'Seller Name', sortable: true, filterable: true },
  { id: 'xpressType', label: 'Xpress Type', sortable: true, filterable: true },
  { id: 'borrowerCount', label: 'Borrower Count', sortable: true, filterable: true },
  { id: 'mortgageProgramType', label: 'Mortgage Program Type', sortable: true, filterable: true },
  { id: 'assignedTo', label: 'Assigned To', sortable: true, filterable: true },
  { id: 'assignedDateTime', label: 'Assigned Date & Time', sortable: true, filterable: true },
  { id: 'groupAssignedTo', label: 'Group Assigned To', sortable: true, filterable: true },
  { id: 'sla', label: 'SLA', sortable: true, filterable: true },
];