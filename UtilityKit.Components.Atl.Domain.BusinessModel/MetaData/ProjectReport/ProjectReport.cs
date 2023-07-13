using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs
{
    public class ProjectReport
    {
        public ProjectReport()
        {
            MapRecordIds = new List<Guid>();
        }
        public Guid UndProjectId { get; set; }
        public Guid NetworkId { get; set; }
        public string NetworkName { get; set; }
        public Guid AssetTableId { get; set; }
        public string AssetTableName { get; set; }
        public Guid AssetGroupId { get; set; }
        public string AssetGroupName { get; set; }
        // most important pros
        public Guid AssetTypeId { get; set; }
        public string AssetTypeName { get; set; }
        public AssetTableTypeEnum AssetTableType { get; set; }

        public List<Guid> MapRecordIds { get; set; }
        //public List<string> Comments { get; set; }
        //public double? CompletenessValue { get; set; }
        //public bool HasMapRecord { get; set; }

        // most important pros
    }
}
