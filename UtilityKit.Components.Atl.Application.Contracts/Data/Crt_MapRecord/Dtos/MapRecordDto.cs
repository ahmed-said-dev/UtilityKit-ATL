using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Domain.BusinessModel.Auditing;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.Destination;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.SourceData;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.TerminalSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class MapRecordDto
    {
        #region --- Columns

        #region 0. Map Record Basic Data
        public Guid? Id { get; set; }
        public Guid ATLProjectId { get; set; }
        public bool IsActive { get; set; }
        public MapModeEnum MapMode { get; set; }
        public int? Order { get; set; }
        #endregion

        #region 1. Source Data
        public Guid DataSourceId { get; set; }
        public SourceDataDto SourceDataJson { get; set; }
        #endregion

        #region 2. Destination
        public DestinationDto DestinationNetworkJson { get; set; }
        #endregion

        #region 3. Terminal Settings
        public TerminalSettingsDto? TerminalSettingsJson { get; set; }
        #endregion

        #region 4. ZValue Settings
        public ZValueSettingsDto? ZValueSettingsJson { get; set; }
        #endregion

        #region 5. Field Maps Settings
        public List<FieldMapDto>? FieldMapsJson { get; set; }
        #endregion

        #endregion
    }
}


