using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema
{
    public class Schema
    {
        public string Name { get; set; }
        public List<Table> Tables { get; set; }
        public List<FeatureClass> FeatureClasses { get; set; }
        public DataSourceSchemaTypeEnum DataSourceSchemaType { get; set; }
    }
}
