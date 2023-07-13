using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs
{
    public class GetAtlWithMapRecords
    {
        public ATLProject ATLProject { get; set; }
        public int MapRecordsCount { get; set; }
    }
}
