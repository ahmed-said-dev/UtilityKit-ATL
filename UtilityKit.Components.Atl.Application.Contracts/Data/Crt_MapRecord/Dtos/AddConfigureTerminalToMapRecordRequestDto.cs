using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.TerminalSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class AddConfigureTerminalToMapRecordRequestDto
    {
        public Guid MapRecordId { get; set; }
        public TerminalSettingsDto? TerminalSettingsJson { get; set; }
    }
}