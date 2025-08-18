namespace PipelineSummaryApi.Models;

public class Loan
{
    public string Id { get; set; } = string.Empty;
    public string LoanNumber { get; set; } = string.Empty;
    public string LoanStatus { get; set; } = string.Empty;
    public DateTime StatusDateTime { get; set; }
    public string LoanTypePurpose { get; set; } = string.Empty;
    public string SellerName { get; set; } = string.Empty;
    public string XpressType { get; set; } = string.Empty;
    public int BorrowerCount { get; set; }
    public string MortgageProgramType { get; set; } = string.Empty;
    public string? AssignedTo { get; set; }
    public DateTime? AssignedDateTime { get; set; }
    public string? GroupAssignedTo { get; set; }
    public string? Sla { get; set; }
}