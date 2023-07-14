using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Domain.BusinessModel.Auditing;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.SharedKernel;


namespace UtilityKit.Components.Atl.Domain.BusinessModel.Entities
{
    [Table("ATLProjects")]
    public class ATLProject : FullAuditedEntity<Guid>
    {
        public ATLProject()
        {
            DataSources = new List<DataSource>();
            MapRecords = new List<MapRecord>();
        }

        #region --- Columns
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid? UndProjectId { get; set; }
        public List<ProjectReport>? ProjectReportJson { get; set; }
        #endregion

        #region --- Navigation Properties
        public List<DataSource> DataSources { get; set; }
        public List<MapRecord> MapRecords { get; set; }

        #endregion


    }

}
