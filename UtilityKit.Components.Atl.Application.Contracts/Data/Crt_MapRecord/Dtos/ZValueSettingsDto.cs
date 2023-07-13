using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class ZValueSettingsDto
    {
        public ZValueSettingsDto()
        {
            ZConditionsJson = new List<ZConditionDto>();
        }
        public string? ZFieldName { get; set; }
        public double? ZDefaultValue { get; set; }
        public ZValueSettingTypeEnum? ZValueSettingType { get; set; }
        public List<ZConditionDto>? ZConditionsJson { get; set; }
    }
}