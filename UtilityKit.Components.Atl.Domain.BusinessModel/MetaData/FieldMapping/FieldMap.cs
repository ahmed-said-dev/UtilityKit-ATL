using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping
{
    public class FieldMap
    {
        public string DestinationFieldName { get; set; }
        public string SourceFieldName { get; set; }
        public bool IsNull { get; set; }
        public string StaticValue { get; set; }
        public bool IsMapped { get; set; }
        public List<ReplacementFilter> ReplacementFilters { get; set; }
    }
}
