using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses
{
    public class GetATLProjectWithMapRecordCountResponce
    {
        public ATLProjectDto ATLProject { get; set; }
        public int MapRecordsCount { get; set; }
        public double ProjectCompletenessValue { get; set; }

    }
}
