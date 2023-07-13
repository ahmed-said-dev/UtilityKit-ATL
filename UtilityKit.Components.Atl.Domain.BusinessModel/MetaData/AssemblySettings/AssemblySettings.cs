using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.AssemblySettings
{
    public class AssemblySettings
    {
        public SpatialRelationShip RelationShip { get; set; }
        public List<AssemblyTarget> AssemblyTargets { get; set; }
        public AssemblySettings()
        {
            AssemblyTargets = new List<AssemblyTarget>();
        }

    }
}
