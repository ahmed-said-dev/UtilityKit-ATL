using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class AssemblyTargetDto
    {
        public string Key { get; set; }
        public string AssetTableName { get; set; }
        public string AssetGroupName { get; set; }
        public string AssetTypeName { get; set; }
        public int AssetGroupCode { get; set; }
        public int AssetTypeCode { get; set; }
        public AssemblyMode AssemblyMode { get; set; }
    }
}
