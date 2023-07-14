using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class AssemblySettingsDto
    {
        public SpatialRelationShip RelationShip { get; set; }
        public List<AssemblyTargetDto> AssemblyTargets { get; set; }
        public AssemblySettingsDto()
        {
            AssemblyTargets = new List<AssemblyTargetDto>();
        }

    }
}
