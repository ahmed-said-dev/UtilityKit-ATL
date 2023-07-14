using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class StructureSettingsDto
    {
        public SpatialRelationShip RelationShip { get; set; }
        public List<StructureTargetDto> StructureTargets { get; set; }
        public StructureSettingsDto()
        {
            StructureTargets = new List<StructureTargetDto>();
        }

    }
}
