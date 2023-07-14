using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs
{
    public class AtlProjectDetailsDto : FullAuditedDto
    {
        public AtlProjectDetailsDto()
        {
            DataSources = new List<DataSourceDto>();
            MapRecords = new List<MapRecordDto>();
        }

        #region --- Columns
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid? UndProjectId { get; set; }
        #endregion

        #region --- Navigation Properties
        public List<DataSourceDto> DataSources { get; set; }
        public List<MapRecordDto> MapRecords { get; set; }

        #endregion
    }
}