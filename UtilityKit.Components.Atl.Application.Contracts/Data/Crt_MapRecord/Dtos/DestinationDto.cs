using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class DestinationDto
    {
        public Guid NetworkId { get; set; }
        public string? NetworkName { get; set; }
        public Guid AssetTableId { get; set; }
        public string? AssetTableName { get; set; }
        public Guid AssetGroupId { get; set; }
        public string? AssetGroupName { get; set; }
        public Guid AssetTypeId { get; set; }
        public string? AssetTypeName { get; set; }
        public int AssetGroupCode { get; set; }
        public int AssetTypeCode { get; set; }
        public AssetTableTypeEnum AssetTableType { get; set; }
    }
}