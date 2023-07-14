using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs
{
    public class ATLProjectDto : FullAuditedDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid? UndProjectId { get; set; }
    }
}