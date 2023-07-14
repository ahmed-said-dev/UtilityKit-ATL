namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class MapRecordFieldMapsDto
    {
        public Guid MapRecordId { get; set; }
        public List<FieldMapDto> FieldMapsJson { get; set; }
    }
}