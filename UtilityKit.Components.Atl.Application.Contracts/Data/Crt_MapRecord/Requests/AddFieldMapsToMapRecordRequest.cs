using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Requests
{
    public class AddFieldMapsToMapRecordRequestDto
    {

        public MapRecordFieldMapsDto MapRecordFieldMaps { get; set; }
    }
}
