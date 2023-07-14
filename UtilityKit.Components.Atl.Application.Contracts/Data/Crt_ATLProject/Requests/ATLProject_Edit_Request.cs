using G2Kit.Core.Mapper;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
public class ATLProject_Edit_Request : IRequestMapper<ATLProject>
{
    public Guid Id { get; set; }
    public Guid? UndProjectId { get; set; }
    public UndProjectDto? UndProject { get; set; }

    #region --- IRequestMapper Implementation
    public ATLProject? MapToDomain()
    {
        return new()
        {
            Id = this.Id,
            UndProjectId = this.UndProjectId,
        };
    }
    #endregion
}