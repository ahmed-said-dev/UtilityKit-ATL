using Microsoft.AspNetCore.Mvc;
using UtilityKit.Components.Atl.Application.Commands.Cmd_ATLProject;
using UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject;
using UtilityKit.Components.Atl.Application.Queries.Qry_MapRcord;

namespace UtilityKit.Components.Atl.Api.WebApi.Controllers.ATLProject
{
    [Route("api/[controller]")]
    [ApiController]
    public class ATLProjectController : BaseController
    {
        [HttpPost()]
        public async Task<IActionResult> Add([FromBody] ATLProject_Add_Request aTLProject, CancellationToken cancellationToken)
              => Ok(await Mediator.Send(new AddATLProjectCommand() { AddATLProjectModel = aTLProject }, cancellationToken));

        [HttpGet()]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new GetAllATLProjectQuery() { }, cancellationToken));


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new GetATLProjectQuery() { Id = id }, cancellationToken));


        [HttpPut()]
        public async Task<IActionResult> Edit([FromBody] ATLProject_Edit_Request aTLProject_Edit_Request, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new EditATLProjectCommand() { EditATLProjectModel = aTLProject_Edit_Request }, cancellationToken));
        }

        [HttpGet("GetATLMapRecordCount/{id}")]
        public async Task<IActionResult> GetATLMapRecordCount(Guid id, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new GetATLProjectWithMapRecordCountQuery() { Id = id }, cancellationToken));
        }

        [HttpGet("GetATLProjectReport/{id}")]
        public async Task<IActionResult> GetATLProjectReport(Guid id, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new GetATLProjectReportQuery() { Id = id }, cancellationToken));
        }


        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateATLProjectRequestDto updateATLProjectRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new UpdateATLProjectCommand() { UpdateATLProjectRequest = updateATLProjectRequest }, cancellationToken));
        }


        [HttpPut("CheckUniqueness")]
        public async Task<IActionResult> CheckUniqueness([FromBody] CheckUniquenessRequestDto checkUniquenessRequest)
            => Ok(await Mediator.Send(new CheckUniquenessQuery() { CheckUniquenessRequest = checkUniquenessRequest }));


        [HttpGet("GetATLProjectDetails/{id}")]
        public async Task<IActionResult> GetATLProjectDetails(Guid id, CancellationToken cancellationToken)
          => Ok(await Mediator.Send(new GetATLProjectDetailsQuery() { Id = id }, cancellationToken));
    }
}
