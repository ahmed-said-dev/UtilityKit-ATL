using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_XMLSchema.Responses
{
    public class AddSchemaToATLResponce
    {
        public DataSourceDto DataSource { get; set; }
        public bool HasMapRecord { get; set; }


    }
}
