using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

public class GetConfigureThreeDForEditDto
{
    public GetConfigureThreeDForEditDto()
    {
        ZValueSettingsJson = new ZValueSettingsDto();
    }
    public Guid MapRecordId { get; set; }
    public ZValueSettingsDto? ZValueSettingsJson { get; set; }

}