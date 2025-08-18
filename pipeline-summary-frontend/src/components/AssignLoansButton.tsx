
interface AssignLoansButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const AssignLoansButton = ({ disabled, onClick }: AssignLoansButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      ASSIGN LOANS
    </button>
  );
};