interface Props {
  disabled: boolean;
  onClick: () => void;
}

export function AssignLoansButton({ disabled, onClick }: Props) {
  return (
    <button disabled={disabled} onClick={onClick} style={{ marginBottom: '1rem' }}>
      Assign Loans
    </button>
  );
}
