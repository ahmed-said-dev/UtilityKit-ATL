using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class FieldMapDto
    {
        public string DestinationFieldName { get; set; }
        public string? SourceFieldName { get; set; }
        public bool IsNull { get; set; }
        public string? StaticValue { get; set; }
        public bool IsMapped { get; set; }
        public List<ReplacementFilterDto>? ReplacementFilters { get; set; }
    }
}
