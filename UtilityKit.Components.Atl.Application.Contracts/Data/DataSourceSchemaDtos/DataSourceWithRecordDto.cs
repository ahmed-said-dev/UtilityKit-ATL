using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos
{
    public class DataSourceWithRecordDto
    {
        public DataSource DataSource { get; set; }
        public bool HasMapRecord { get; set; }
    }
}