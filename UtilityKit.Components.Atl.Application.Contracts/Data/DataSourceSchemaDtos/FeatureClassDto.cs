namespace UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;

public class FeatureClassDto
{
    public string Name { get; set; }
    public int FeatureClassType { get; set; }
    public List<FieldDto> Fields { get; set; }
    public FeatureClassDto()
    {
        Fields = new List<FieldDto>();
    }

}
