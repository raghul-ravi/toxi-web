using Microsoft.AspNetCore.Mvc;
using PipelineSummaryApi.Models;
using PipelineSummaryApi.Services;

namespace PipelineSummaryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoansController : ControllerBase
{
    private readonly LoanService _loanService;

    public LoansController(LoanService loanService)
    {
        _loanService = loanService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Loan>>> GetLoans([FromQuery] string status = "all")
    {
        var loans = await _loanService.GetLoansAsync(status);
        return Ok(loans);
    }

    [HttpGet("kpis")]
    public async Task<ActionResult<Dictionary<string, int>>> GetKpis()
    {
        var kpis = await _loanService.GetKpisAsync();
        return Ok(kpis);
    }

    [HttpPost("assign")]
    public async Task<ActionResult> AssignLoans([FromBody] AssignLoansRequest request)
    {
        if (request.LoanIds.Length == 0 || string.IsNullOrWhiteSpace(request.ProcessorId))
        {
            return BadRequest("Invalid request");
        }

        var success = await _loanService.AssignLoansAsync(request.LoanIds, request.ProcessorId);
        
        if (!success)
        {
            return BadRequest("Failed to assign loans");
        }

        return Ok(new { message = "Loans assigned successfully" });
    }
}