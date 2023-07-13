using Microsoft.AspNetCore.Mvc;
using UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Requests;
using UtilityKit.Components.Atl.Application.Queries.Qry_MapRcord;

namespace UtilityKit.Components.Atl.Api.WebApi.Controllers.ATLProject
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapRecordController : BaseController
    {
        [HttpPost()]
        public async Task<IActionResult> Add([FromBody] AddMapRecordRequest addMapRecordRequest, CancellationToken cancellationToken)
              => Ok(await Mediator.Send(new AddMapRecordCommand() { AddMapRecordRequest = addMapRecordRequest }, cancellationToken));

        [HttpGet("{atlId}/{assetGroupId}")]
        public async Task<IActionResult> GetByAssetGroupId(Guid atlId, Guid assetGroupId, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new GetMapRecordsByAssetGroupIdQuery() { AtlId = atlId, AssetGroupId = assetGroupId }, cancellationToken));

        [HttpGet("GetDistinctAssetGroupIds/{atlId}")]
        public async Task<IActionResult> GetDistinctAssetGroupIds(Guid atlId, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetDistinctAssetGroupIdsQuery() { AtlId = atlId }, cancellationToken));

        [HttpDelete("{mapRecordId}")]
        public async Task<IActionResult> Delete(Guid mapRecordId, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new DeleteMapRecordCommand() { MapRecordId = mapRecordId }, cancellationToken));


        [HttpPost("clone/{mapRecordId}")]
        public async Task<IActionResult> Clone(Guid mapRecordId, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new CloneMapRecordCommand() { MapRecordId = mapRecordId }, cancellationToken));

        [HttpPut("Activation/{mapRecordId}")]
        public async Task<IActionResult> Activation(Guid mapRecordId, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new ActivationMapRecordCommand() { MapRecordId = mapRecordId }, cancellationToken));


        [HttpGet("GetMapRecord/{id}")]
        public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new GetMapRecordQuery() { Id = id }, cancellationToken));

        [HttpPut()]
        public async Task<IActionResult> Edit([FromBody] EditMapRecordRequest editMapRecordRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new EditMapRecordCommand() { EditMapRecordRequest = editMapRecordRequest }, cancellationToken));
        }

        //Field Map
        [HttpPut("AddFieldMapToMapRecord")]
        public async Task<IActionResult> AddFieldMapToMapRecordRequest([FromBody] AddFieldMapsToMapRecordRequestDto addFieldMapsToMapRecordRequest, CancellationToken cancellationToken) => Ok(await Mediator.Send(new AddFieldMapsToMapRecordCommand() { AddFieldMapsToMapRecordRequest = addFieldMapsToMapRecordRequest }, cancellationToken));

        [HttpGet("GetFieldMapForEdit/{mapRecordId}")]
        public async Task<IActionResult> GetFieldMapForEdit(Guid mapRecordId, CancellationToken cancellationToken)
            => Ok(await Mediator.Send(new GetFieldMapForEditQuery() { MapRecordId = mapRecordId }, cancellationToken));
        //Field Map

        //Configure Three D
        [HttpPut("AddConfigureThreeDToMapRecord")]
        public async Task<IActionResult> AddConfigureThreeDToMapRecord([FromBody] AddConfigureThreeDToMapRecordRequestDto addConfigureThreeDToMapRecordRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new AddConfigureThreeDToMapRecordCommand() { AddConfigureThreeDToMapRecordRequest = addConfigureThreeDToMapRecordRequest }, cancellationToken));
        }

        [HttpGet("GetConfigureThreeDForEdit/{mapRecordId}")]
        public async Task<IActionResult> GetConfigureThreeDForEdit(Guid mapRecordId, CancellationToken cancellationToken)
     => Ok(await Mediator.Send(new GetConfigureThreeDForEditQuery() { MapRecordId = mapRecordId }, cancellationToken));
        //Configure Three D

        //Configure Terminal
        [HttpPut("AddConfigureTerminalToMapRecord")]
        public async Task<IActionResult> AddConfigureTerminalToMapRecord([FromBody] AddConfigureTerminalToMapRecordRequestDto addConfigureTerminalToMapRecordRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new AddConfigureTerminalToMapRecordCommand() { AddConfigureTerminalToMapRecordRequest = addConfigureTerminalToMapRecordRequest }, cancellationToken));
        }

        [HttpGet("GetConfigureTerminalMapRecordForEdit/{mapRecordId}")]
        public async Task<IActionResult> GetConfigureTerminalMapRecordForEdit(Guid mapRecordId, CancellationToken cancellationToken)
     => Ok(await Mediator.Send(new GetConfigureTerminalForEditQuery() { MapRecordId = mapRecordId }, cancellationToken));
        //Configure Terminal


        //Containment Settings
        [HttpPut("AddContainmentSettingsToMapRecord")]
        public async Task<IActionResult> AddContainmentSettingsToMapRecord([FromBody] AddContainmentSettingsToMapRecordRequestDto addContainmentSettingsToMapRecordRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new AddContainmentSettingsToMapRecordCommand() { AddContainmentSettingsToMapRecordRequest = addContainmentSettingsToMapRecordRequest }, cancellationToken));
        }

        [HttpGet("GetContainmentSettingsForEditQuery/{mapRecordId}")]
        public async Task<IActionResult> GetContainmentSettingsForEdit(Guid mapRecordId, CancellationToken cancellationToken)
     => Ok(await Mediator.Send(new GetContainmentSettingsForEditQuery() { MapRecordId = mapRecordId }, cancellationToken));
        //Containment Settings

        //Structure Settings
        [HttpPut("AddStructureSettingsToMapRecord")]
        public async Task<IActionResult> AddStructureSettingsToMapRecord([FromBody] AddStructureSettingsToMapRecordRequestDto addStructureSettingsToMapRecordRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new AddStructureSettingsToMapRecordCommand() { AddStructureSettingsToMapRecordRequest = addStructureSettingsToMapRecordRequest }, cancellationToken));
        }

        [HttpGet("GetStructureSettingsForEditQuery/{mapRecordId}")]
        public async Task<IActionResult> GetStructureSettingsForEdit(Guid mapRecordId, CancellationToken cancellationToken)
     => Ok(await Mediator.Send(new GetStructureSettingsForEditQuery() { MapRecordId = mapRecordId }, cancellationToken));
        //Structure Settings

        //Assembly Settings
        [HttpPut("AddAssemblySettingsToMapRecord")]
        public async Task<IActionResult> AddAssemblySettingsToMapRecord([FromBody] AddAssemblySettingsToMapRecordRequestDto addAssemblySettingsToMapRecordRequest, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new AddAssemblySettingsToMapRecordCommand() { AddAssemblySettingsToMapRecordRequest = addAssemblySettingsToMapRecordRequest }, cancellationToken));
        }

        [HttpGet("GetAssemblySettingsForEditQuery/{mapRecordId}")]
        public async Task<IActionResult> GetAssemblySettingsForEdit(Guid mapRecordId, CancellationToken cancellationToken)
     => Ok(await Mediator.Send(new GetAssemblySettingsForEditQuery() { MapRecordId = mapRecordId }, cancellationToken));
        //Assembly Settings

        [HttpGet("GetAllMapRecordsForExecutionPlan/{atlId}")]
        public async Task<IActionResult> GetAllMapRecordsForExecutionPlan(Guid atlId, CancellationToken cancellationToken)
    => Ok(await Mediator.Send(new GetAllMapRecordsForExecutionPlanQuery() { AtlId = atlId }, cancellationToken));



        [HttpGet("GetAllMapRecordsByProjectId/{atlId}")]
        public async Task<IActionResult> GetAllMapRecordsByProjectId(Guid atlId, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetAllMapRecordsByProjectIdQuery() { AtlId = atlId }, cancellationToken));
    }
}
