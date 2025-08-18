using System.Collections.Generic;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var loans = new List<Loan>
{
    new("1","LN-1001","Unassigned", DateTime.UtcNow.AddDays(-1),"Purchase","ACME Corp","Xpress",1,"Conventional",null,null,null,3),
    new("2","LN-1002","Assigned", DateTime.UtcNow.AddDays(-2),"Refinance","Foo Bank","Standard",2,"FHA","Liam Smith",DateTime.UtcNow.AddHours(-5),"Team A",2)
};

var processors = new List<Processor>
{
    new("p1","Liam Smith"),
    new("p2","Emma Johnson")
};

app.MapGet("/api/loans", () => loans);
app.MapGet("/api/processors", () => processors);
app.MapPost("/api/assign", (AssignRequest request) =>
{
    var processor = processors.FirstOrDefault(p => p.Id == request.ProcessorId);
    if (processor is null)
    {
        return Results.BadRequest("Processor not found");
    }

    foreach (var id in request.LoanIds)
    {
        var loan = loans.FirstOrDefault(l => l.Id == id);
        if (loan is null) continue;
        loans[loans.IndexOf(loan)] = loan with { AssignedTo = processor.Name, AssignedDateTime = DateTime.UtcNow };
    }

    return Results.Ok();
});

app.Run();

record Loan(
    string Id,
    string LoanNumber,
    string LoanStatus,
    DateTime StatusDateTime,
    string LoanTypePurpose,
    string SellerName,
    string XpressType,
    int BorrowerCount,
    string MortgageProgramType,
    string? AssignedTo,
    DateTime? AssignedDateTime,
    string? GroupAssignedTo,
    int SLA);

record Processor(string Id, string Name);
record AssignRequest(string[] LoanIds, string ProcessorId);
