import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';

export const SimpleLoansGrid = ({ statusTab }: { statusTab: string }) => {
  const { data: loans = [], isLoading, error } = useQuery({
    queryKey: ['loans', statusTab],
    queryFn: () => loansApi.getLoans(statusTab),
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="animate-pulse">Loading loans...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-red-600 mb-4">Error loading loans</div>
        <div className="text-sm text-gray-500">
          Make sure the backend API is running on http://localhost:5139
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Xpress Type</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="w-12 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{loan.loanNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{loan.loanStatus}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{loan.sellerName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{loan.loanTypePurpose}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{loan.xpressType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {loans.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No loans found for {statusTab} status
        </div>
      )}
    </div>
  );
};