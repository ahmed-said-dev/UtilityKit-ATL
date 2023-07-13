using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses
{
    public class GetATLProjectReportResponce
    {
        public List<ProjectReportDto> ProjectReportJson { get; set; }
        public double ProjectCompletenessValue { get; set; }
    }
}
