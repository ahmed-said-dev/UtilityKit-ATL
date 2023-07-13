using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Responses
{
    public class GetMapRecordsByAssetGroupIdResponce
    {
        public List<GetMapRecordDto> GetMapRecords { get; set; }
    }
}