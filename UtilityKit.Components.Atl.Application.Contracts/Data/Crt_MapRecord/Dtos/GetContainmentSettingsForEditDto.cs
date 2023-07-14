using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

public class GetContainmentSettingsForEditDto
{
    public string MapRecordId { get; set; }
    public ContainmentSettingsDto ContainmentSettingsJson { get; set; }
}