//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Runtime.InteropServices;
//using System.Text;
//using System.Threading.Tasks;
//using UtilityKit.Components.Atl.Domain.BusinessModel.Auditing;
//using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings;
//using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.Destination;
//using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
//using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;
//using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

//namespace UtilityKit.Components.Atl.Domain.BusinessModel.Entities
//{

//    public class MapRecordUpdate : BaseEntity<Guid>
//    {
//        #region --- Columns

//        #region 0. Map Record Basic Data
//        [ForeignKey(nameof(ATLProject))]
//        public Guid ATLProjectId { get; set; }
//        public bool IsActive { get; set; }
//        public MapModeEnum MapMode { get; set; }
//        public int Order { get; set; }
//        #endregion

//        #region 1. Source Data
//        [ForeignKey(nameof(Entities.DataSource))]
//        public Guid DataSourceId { get; set; }
//        public string SourceDataJson { get; set; }
//        [NotMapped]
//        public SourceData SourceData { get; set; }
//        #endregion

//        #region 2. Destination
//        [NotMapped]
//        public Destination DestinationNetwork { get; set; }
//        public string DestinationNetworkJson { get; set; }
//        #endregion

//        #region 3. Terminal Settings
//        public TerminalSettings TerminalSettings { get; set; }
//        public string TerminalSettingsJson { get; set; }
//        #endregion

//        #region 4. ZValue Settings
//        public ZValueSettings ZValueSettings { get; set; }
//        #endregion

//        #region 5. Field Mapping
//        [NotMapped]
//        public List<FieldMap>? FieldsMaps { get; set; }
//        public string FieldMappingJson { get; set; }
//        #endregion

//        #region 6. Containment
//        [NotMapped]
//        public ContainmentSettings ContainmentSettings { get; set; }
//        public string ContainmentSettingsJson { get; set; }
//        #endregion

//        #region 7. Assembly
//        [NotMapped]
//        public AssemblySettings AssemblySettings { get; set; }
//        public string AssemblySettingsJson { get; set; }
//        #endregion

//        #region 8. StructureAttachment
//        [NotMapped]
//        public StructureAttachmentSettings StructureAttachmentSettings { get; set; }
//        public string StructureAttachmentSettingsJson { get; set; }
//        #endregion

//        #endregion
//        #region --- Navigation Properties
//        public ATLProject ATLProject { get; set; }
//        public DataSource DataSource { get; set; }

//        #endregion
//    }
//    public class SourceData
//    {
//        public DataSourceEntityTypeEnum DataSourceEntityType { get; set; }
//        public string DataSourceEntityName { get; set; }
//        public string WhereClause { get; set; }
//    }
 
//    public class TerminalSettings
//    {
//        public string? FromTerminalId { get; set; }
//        public string FromTerminalName { get; set; }
//        public string? ToTerminalId { get; set; }
//        public string ToTerminalName { get; set; }
//    }
//    public class ZValueSettings
//    {
//        public string? ZFieldName { get; set; }
//        public double? ZDefaultValue { get; set; }
//        public ZValueSettingType? ZValueSettingType { get; set; }
//        public List<ZCondition>? ZConditions { get; set; }
//    }

//    public enum ZValueSettingType
//    {
//        FromSourceField = 1,
//        DefaultValue = 2,
//        ConditionalValue = 3,
//    }



//    public class AssemblySettings
//    {
//        public SpatialRelationShip RelationShip { get; set; }
//    }
//    public class StructureAttachmentSettings
//    {
//        public SpatialRelationShip RelationShip { get; set; }
//        public int Buffer { get; set; }
//        public List<AttachmentTarget> AttachmentTargets { get; set; }
//    }

//    public class ContainmentTarget
//    {
//        public string AssetTableName { get; set; }
//        public string AssetGroupName { get; set; }
//        public string AssetTypeName { get; set; }
//        public int AssetGroupCode { get; set; }
//        public int AssetTypeCode { get; set; }
//        public ContainmentMode ContainmentMode { get; set; }
//    }
//    public class AttachmentTarget
//    {
//        public string AssetTableName { get; set; }
//        public string AssetGroupName { get; set; }
//        public string AssetTypeName { get; set; }
//        public int AssetGroupCode { get; set; }
//        public int AssetTypeCode { get; set; }
//    }
  

//    public class ContainmentSettingsInputDto{
//        public Guid NetworkID { get; set; }
//        public Guid AssetTableID { get; set; }
//        public Guid AssetGroupID { get; set; }
//        public Guid AssetTypeID { get; set; }

//    }

//    public class StructureAttachmentSettingsInputDto
//    {
//        public Guid NetworkID { get; set; }
//        public Guid AssetTableID { get; set; }
//        public Guid AssetGroupID { get; set; }
//        public Guid AssetTypeID { get; set; }

//    }
//}