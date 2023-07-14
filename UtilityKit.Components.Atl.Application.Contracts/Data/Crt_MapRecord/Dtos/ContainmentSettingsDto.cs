using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class ContainmentSettingsDto
    {
        public SpatialRelationShip RelationShip { get; set; }
        public List<ContainmentTargetDto> ContainmentTargets { get; set; }
        public ContainmentSettingsDto()
        {
            ContainmentTargets = new List<ContainmentTargetDto>();
        }

    }
}
