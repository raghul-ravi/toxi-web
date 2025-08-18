using Microsoft.AspNetCore.Mvc;
using PipelineSummaryApi.Models;
using PipelineSummaryApi.Services;

namespace PipelineSummaryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserAssignmentController : ControllerBase
{
    private readonly LoanService _loanService;

    public UserAssignmentController(LoanService loanService)
    {
        _loanService = loanService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Processor>>> GetProcessors([FromQuery] string? search = null)
    {
        var processors = await _loanService.GetProcessorsAsync(search);
        return Ok(processors);
    }
}