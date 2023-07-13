using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class SourceDataDto
    {
        public DataSourceEntityTypeEnum DataSourceEntityType { get; set; }
        public string DataSourceEntityName { get; set; }
        public string? WhereClause { get; set; }
    }
}