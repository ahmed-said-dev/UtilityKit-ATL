using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings
{
    public class ContainmentSettings
    {
        public SpatialRelationShip RelationShip { get; set; }
        public List<ContainmentTarget> ContainmentTargets { get; set; }
        public ContainmentSettings()
        {
            ContainmentTargets = new List<ContainmentTarget>();
        }

    }
}
