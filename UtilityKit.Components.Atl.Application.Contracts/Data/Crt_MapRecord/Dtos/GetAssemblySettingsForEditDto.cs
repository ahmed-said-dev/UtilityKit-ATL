using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

public class GetAssemblySettingsForEditDto
{
    public string MapRecordId { get; set; }
    public AssemblySettingsDto AssemblySettingsJson { get; set; }
}