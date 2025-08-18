using PipelineSummaryApi.Models;

namespace PipelineSummaryApi.Services;

public class LoanService
{
    private static List<Loan> _loans = new()
    {
        new Loan
        {
            Id = "1",
            LoanNumber = "080234567B",
            LoanStatus = "Not Assigned",
            StatusDateTime = new DateTime(2023, 11, 1, 9, 0, 0),
            LoanTypePurpose = "Purchase - Conventional",
            SellerName = "Alice Johnson",
            XpressType = "Standard",
            BorrowerCount = 1,
            MortgageProgramType = "Fixed Rate",
            AssignedDateTime = new DateTime(2023, 9, 1, 9, 0, 0)
        },
        new Loan
        {
            Id = "2",
            LoanNumber = "080234568D",
            LoanStatus = "Not Assigned",
            StatusDateTime = new DateTime(2023, 11, 1, 10, 0, 0),
            LoanTypePurpose = "Refinance - FHA",
            SellerName = "Bob Smith",
            XpressType = "Express",
            BorrowerCount = 3,
            MortgageProgramType = "Adjustable Rate",
            AssignedDateTime = new DateTime(2023, 10, 29, 9, 0, 0)
        },
        new Loan
        {
            Id = "3",
            LoanNumber = "080234569E",
            LoanStatus = "Not Assigned",
            StatusDateTime = new DateTime(2023, 11, 1, 11, 0, 0),
            LoanTypePurpose = "Refinance - Conventional",
            SellerName = "Charlie Brown",
            XpressType = "Standard",
            BorrowerCount = 2,
            MortgageProgramType = "Fixed Rate",
            AssignedDateTime = new DateTime(2023, 11, 1, 10, 0, 0)
        },
        new Loan
        {
            Id = "4",
            LoanNumber = "080234570F",
            LoanStatus = "Assigned",
            StatusDateTime = new DateTime(2023, 11, 2, 8, 30, 0),
            LoanTypePurpose = "Purchase - FHA",
            SellerName = "Diana Wilson",
            XpressType = "Express",
            BorrowerCount = 2,
            MortgageProgramType = "Fixed Rate",
            AssignedTo = "Avery Johnson",
            AssignedDateTime = new DateTime(2023, 11, 2, 9, 15, 0),
            GroupAssignedTo = "Loan Processing Team A"
        }
    };

    private static List<Processor> _processors = new()
    {
        new Processor { Id = "1", Name = "Avery Johnson", Email = "avery.johnson@moxi.com" },
        new Processor { Id = "2", Name = "Mia Thompson", Email = "mia.thompson@moxi.com" },
        new Processor { Id = "3", Name = "Liam Smith", Email = "liam.smith@moxi.com" },
        new Processor { Id = "4", Name = "Noah Brown", Email = "noah.brown@moxi.com" },
        new Processor { Id = "5", Name = "Sophia Wilson", Email = "sophia.wilson@moxi.com" }
    };

    public Task<List<Loan>> GetLoansAsync(string status = "all")
    {
        var filteredLoans = status.ToLower() switch
        {
            "unassigned" => _loans.Where(l => string.IsNullOrEmpty(l.AssignedTo)).ToList(),
            "assigned" => _loans.Where(l => !string.IsNullOrEmpty(l.AssignedTo)).ToList(),
            "pending" => _loans.Where(l => l.LoanStatus == "Pending").ToList(),
            _ => _loans
        };

        return Task.FromResult(filteredLoans);
    }

    public Task<List<Processor>> GetProcessorsAsync(string? search = null)
    {
        var processors = _processors.AsEnumerable();
        
        if (!string.IsNullOrWhiteSpace(search))
        {
            processors = processors.Where(p => 
                p.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                p.Email.Contains(search, StringComparison.OrdinalIgnoreCase));
        }

        return Task.FromResult(processors.ToList());
    }

    public Task<bool> AssignLoansAsync(string[] loanIds, string processorId)
    {
        var processor = _processors.FirstOrDefault(p => p.Id == processorId);
        if (processor == null) return Task.FromResult(false);

        foreach (var loanId in loanIds)
        {
            var loan = _loans.FirstOrDefault(l => l.Id == loanId);
            if (loan != null)
            {
                loan.AssignedTo = processor.Name;
                loan.AssignedDateTime = DateTime.Now;
                loan.LoanStatus = "Assigned";
            }
        }

        return Task.FromResult(true);
    }

    public Task<Dictionary<string, int>> GetKpisAsync()
    {
        return Task.FromResult(new Dictionary<string, int>
        {
            ["Total Loans"] = _loans.Count,
            ["Unassigned Loans"] = _loans.Count(l => string.IsNullOrEmpty(l.AssignedTo))
        });
    }
}