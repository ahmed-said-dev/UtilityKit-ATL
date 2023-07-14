using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

public class GetConfigureTerminalForEditDto
{
    public string MapRecordId { get; set; }
    public TerminalSettingsDto TerminalSettingsJson { get; set; }

}