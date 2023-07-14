using G2Kit.Core.Mapper;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
public class ATLProject_Add_Request : ATLProjectDto, IRequestMapper<ATLProject>
{
    #region --- IRequestMapper Implementation
    public ATLProject? MapToDomain()
    {
        return new()
        {
            Name = this.Name,
            UndProjectId = this.UndProjectId,
            ModifiedData = this.ModifiedData,
            LastModifiedUserId = this.LastModifiedUserId,
            Description = this.Description,
        };
    }
    #endregion
}