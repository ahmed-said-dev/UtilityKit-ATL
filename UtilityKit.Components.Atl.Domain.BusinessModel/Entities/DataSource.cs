using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net;
using System.Reflection.PortableExecutable;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Auditing;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.Entities
{
    [Table("DataSources")]
    public class DataSource : BaseEntity<Guid>
    {
        public string Name { get; set; }

        public Schema DataSourceSchemaJson { get; set; }//Mapped to Schema Object

        public int TablesCount { get; set; }

        public int FeatureClassesCount { get; set; }


        public ATLProject ATLProject { get; set; }

        [ForeignKey(nameof(ATLProject))]
        public Guid ATLProjectId { get; set; }

        public DataSourceType DataSourceType { get; set; }

        [ForeignKey(nameof(DataSourceType))]
        public int DataSourceTypeId { get; set; }

        #region --- Navigation Properties
        public List<MapRecord> MapRecords { get; set; }
        #endregion

    }
}
