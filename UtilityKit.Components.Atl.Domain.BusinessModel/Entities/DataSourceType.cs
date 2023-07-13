using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Auditing;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.Entities
{
    [Table("DataSourceTypes")]
    public class DataSourceType : BaseEntity<int>
    {
        #region --- Columns
        public string Name { get; set; }
        #endregion

        #region --- Navigation Properties
        public List<DataSource> DataSources { get; set; }
     

        #endregion


    }
}
