using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

public class GetFieldMapForEditDto
{
    public string DestinationFieldName { get; set; }
    public string SourceFieldName { get; set; }
    public bool IsNull { get; set; }
    public string? StaticValue { get; set; }
    public bool IsMapped { get; set; }
    public List<ReplacementFilterDto>? ReplacementFilters { get; set; }
}