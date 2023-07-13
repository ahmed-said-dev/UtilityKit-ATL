using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

public class GetStructureSettingsForEditDto
{
    public string MapRecordId { get; set; }
    public StructureSettingsDto StructureSettingsJson { get; set; }
}