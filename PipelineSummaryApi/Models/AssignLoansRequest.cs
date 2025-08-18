namespace PipelineSummaryApi.Models;

public class AssignLoansRequest
{
    public string[] LoanIds { get; set; } = Array.Empty<string>();
    public string ProcessorId { get; set; } = string.Empty;
}