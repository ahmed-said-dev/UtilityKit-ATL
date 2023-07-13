using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema
{
    public class FeatureClass
    {
        public string Name { get; set; }
        public FeatureClassTypeEnum FeatureClassType { get; set; }
        public List<Field> Fields { get; set; }
        public FeatureClass()
        {
            Fields = new List<Field>();
        }
    }
}