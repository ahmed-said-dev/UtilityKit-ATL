using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings
{
    public class StructureSettings
    {
        public SpatialRelationShip RelationShip { get; set; }
        public List<StructureTarget> StructureTargets { get; set; }
        public StructureSettings()
        {
            StructureTargets = new List<StructureTarget>();
        }

    }
}
