using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Auditing;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.AssemblySettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.CompletenessCriteria;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.Destination;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.SourceData;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.TerminalSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.Entities
{
    [Table("MapRecords")]
    public class MapRecord : BaseEntity<Guid>
    {
        public MapRecord()
        {
            CompletenessCriteriaJson = new List<CompletenessCriteria>();
        }
        #region --- Columns

        #region 0. Map Record Basic Data
        [ForeignKey(nameof(ATLProject))]
        public Guid ATLProjectId { get; set; }
        public bool IsActive { get; set; }
        public MapModeEnum MapMode { get; set; }
        public int Order { get; set; }
        public List<CompletenessCriteria> CompletenessCriteriaJson { get; set; }
        #endregion

        #region 1. Source Data
        [ForeignKey(nameof(Entities.DataSource))]
        public Guid DataSourceId { get; set; }
        public SourceData SourceDataJson { get; set; }
        #endregion

        #region 2. Destination
        public Destination DestinationNetworkJson { get; set; }
        #endregion

        #region 3. Terminal Settings
        public TerminalSettings? TerminalSettingsJson { get; set; }
        #endregion

        #region 4. ZValue Settings
        public ZValueSettings? ZValueSettingsJson { get; set; }
        #endregion

        #region 5. Containment Settings
        public ContainmentSettings? ContainmentSettingsJson { get; set; }
        #endregion

        #region 6. Structure Settings
        public StructureSettings? StructureSettingsJson { get; set; }
        #endregion


        public AssemblySettings? AssemblySettingsJson { get; set; }
        #endregion

        #region --- Navigation Properties
        public List<FieldMap>? FieldMapsJson { get; set; }
        public ATLProject ATLProject { get; set; }
        public DataSource DataSource { get; set; }


        #endregion
    }

}
