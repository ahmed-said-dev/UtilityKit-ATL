using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs
{
    public class ProjectReportDto
    {
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
        public Guid MapRecordId { get; set; }
        public List<Guid> MapRecordIds { get; set; }
        public List<CompletenessCriteriaDto>? CompletenessCriteriaJson { get; set; }
        public double MapRecordCompletenessValue { get; set; }

        public int MapRecordOrderInsideAssetGroup { get; set; }
        // most important pros

        //public int NumberOfMapRecord { get; set; }
    }
}
