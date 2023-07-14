using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class AddContainmentSettingsToMapRecordRequestDto
    {
        public Guid MapRecordId { get; set; }
        public ContainmentSettingsDto? ContainmentSettingsJson { get; set; }

    }
}