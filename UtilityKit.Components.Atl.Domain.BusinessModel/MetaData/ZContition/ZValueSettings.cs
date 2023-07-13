using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition
{
    public class ZValueSettings
    {
        public string? ZFieldName { get; set; }
        public double? ZDefaultValue { get; set; }
        public ZValueSettingTypeEnum? ZValueSettingType { get; set; }
        public List<ZCondition>? ZConditionsJson { get; set; }
    }
}