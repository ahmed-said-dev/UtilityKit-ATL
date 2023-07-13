using G2Kit.Components.Identity.Core;

namespace UtilityKit.Components.Atl.Application.Settings
{
    public static class AppConfig
    {
        public static Guid id = new Guid();
        public static string Name = "Pete";
        public static G2User User = new G2User()
        {
             Id = id,
             Name = Name
        };
        public static string SubnetworkController = "Subnetwork Controller";
        public static string SubnetworkTap = "Subnetwork Tap";
        public static string AttributeSubstitution = "Attribute Substitution";
        public static string StructureNetworkName = "Structure";
        public static string DomainDeviceTableSuffix = "Device";
        public static string DomainLineTableSuffix = "Line";
        public static string DomainJunctionTableSuffix = "Junction";
        public static string DomainAssemblyTableSuffix = "Assembly";
        public static string DomainEdgeObjectTableSuffix = "EdgeObject";
        public static string DomainJunctionObjectTableSuffix = "JunctionObject";     
        public static string StructureLineTableSuffix = "StructureLine";
        public static string StructureJunctionTableSuffix = "StructureJunction";
        public static string StructureBoundryTableSuffix = "StructureBoundry";
        public static string StructureEdgeObjectTableSuffix = "StructureEdgeObject";
        public static string StructureJunctionObjectTableSuffix = "StructureJunctionObject";
    }
}