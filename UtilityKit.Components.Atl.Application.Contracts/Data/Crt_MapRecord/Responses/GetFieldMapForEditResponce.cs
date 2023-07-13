using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
public class GetFieldMapForEditResponce
{
    public Guid MapRecordId { get; set; }
    public List<GetFieldMapForEditDto> GetFieldMapForEdit { get; set; }

}
