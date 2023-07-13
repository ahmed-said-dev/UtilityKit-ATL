using G2Kit.Core.Mapper;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
public class ATLProject_Response : ATLProjectDto, IBaseDto<Guid>, IResponseMapper<ATLProject_Response, ATLProject>
{
    public Guid Id { get; set; }

    #region --- IResponseMapper Implementation
    public ATLProject_Response MapToResponse(ATLProject aTLProject)
    {
        if (aTLProject == null)
            return new ATLProject_Response();

        return new ATLProject_Response()
        {
            Id = aTLProject.Id,
            Name = aTLProject.Name,
            CreatorUserId = aTLProject.CreatorUserId,
            CreationDate = aTLProject.CreationDate,
            Description = aTLProject.Description,
            LastModifiedUserId = aTLProject.LastModifiedUserId,
            ModifiedData = aTLProject.ModifiedData,
            UndProjectId = aTLProject.UndProjectId,
           
        };
    }
    public List<ATLProject_Response> MapToResponseList(List<ATLProject> aTLProjectList)
    {
        List<ATLProject_Response> lstResults = new List<ATLProject_Response>();

        if (aTLProjectList != null)
            foreach (var item in aTLProjectList)
                lstResults.Add(MapToResponse(item));

        return lstResults;
    }
    #endregion
}