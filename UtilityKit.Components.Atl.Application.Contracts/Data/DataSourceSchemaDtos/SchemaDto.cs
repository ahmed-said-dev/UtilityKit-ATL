using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;

public class SchemaDto
{
    public string Name { get; set; }
    public List<TableDto>? Tables { get; set; }
    public List<FeatureClassDto>? FeatureClasses { get; set; }
    public DataSourceSchemaTypeEnum DataSourceSchemaType { get; set; }
}
