namespace UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;

public class TableDto
{
    public string Name { get; set; }
    public List<FieldDto> Fields { get; set; }
    public TableDto()
    {
        Fields = new List<FieldDto>();
    }
}
