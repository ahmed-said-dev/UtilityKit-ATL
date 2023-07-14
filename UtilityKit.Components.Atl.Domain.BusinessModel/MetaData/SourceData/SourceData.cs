using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.SourceData
{
    public class SourceData
    {
        public DataSourceEntityTypeEnum DataSourceEntityType { get; set; }
        public string DataSourceEntityName { get; set; }
        public string? WhereClause { get; set; }
    }
}