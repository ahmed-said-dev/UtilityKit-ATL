using G2Kit.Core.Mapper;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
public class ATLProject_Edit_Response : IResponseMapper<ATLProject_Edit_Response, ATLProject>
{
    public Guid Id { get; set; }
    public Guid? UndProjectId { get; set; }

    #region --- IResponseMapper Implementation
    public ATLProject_Edit_Response MapToResponse(ATLProject aTLProject)
    {
        if (aTLProject == null)
            return new ATLProject_Edit_Response();

        return new ATLProject_Edit_Response()
        {
            Id = aTLProject.Id,
            UndProjectId = aTLProject.UndProjectId
        };
    }

    public List<ATLProject_Edit_Response> MapToResponseList(List<ATLProject> domainObjectList)
    {
        throw new NotImplementedException();
    }
    #endregion
}