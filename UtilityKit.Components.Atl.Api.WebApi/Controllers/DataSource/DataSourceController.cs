using Microsoft.AspNetCore.Mvc;
using UtilityKit.Components.Atl.Application.Commands.Cmd_Schema_DataSource;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject;
using UtilityKit.Components.Atl.Application.Queries.Qry_SchemaDataSource;

namespace UtilityKit.Components.Atl.Api.WebApi.Controllers.DataSource
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataSourceController : BaseController
    {
        [HttpGet("{aTLProjectId}")]
        public async Task<IActionResult> Get(Guid aTLProjectId, CancellationToken cancellationToken)
       => Ok(await Mediator.Send(new GetSchemaDataSource() { ATLProjectId = aTLProjectId }, cancellationToken));


        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddSchemaToATLRequest addSchemaToATLRequest, CancellationToken cancellationToken)
       => Ok(await Mediator.Send(new AddSchemaToATLCommand() { AddSchemaToATLRequest = addSchemaToATLRequest }, cancellationToken));


        [HttpDelete("{dataSourceId}")]
        public async Task<IActionResult> Delete(Guid dataSourceId, CancellationToken cancellationToken)
       => Ok(await Mediator.Send(new DeleteSchemaFromATLCommand() { DataSourceId = dataSourceId }, cancellationToken));


        [HttpPut("CheckUniqueness")]
        public async Task<IActionResult> CheckUniqueness([FromBody] CheckDataSourceUniquenessRequestDto CheckDataSourceUniquenessRequest)
            => Ok(await Mediator.Send(new CheckDataSourceUniquenessQuery() { CheckDataSourceUniquenessRequest = CheckDataSourceUniquenessRequest }));
    }
}
