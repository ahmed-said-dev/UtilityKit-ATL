using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Application.Contracts.Repository
{
    public interface IATLProjectRepository
    {
        Task<ATLProject> AddATLProject(ATLProject aTLProject, CancellationToken token);
        Task<List<ATLProject>> GetAll(CancellationToken token);
        Task<ATLProject> Get(Guid id, CancellationToken token);
        Task<ATLProject> EditATLProject(ATLProject aTLProject, CancellationToken token);
        Task<bool> IsAtlProjectNameExist(string name);
        Task<GetAtlWithMapRecords> GetAtlWithMapRecords(Guid id, CancellationToken token);
        Task AddMapRecordIdToReport(MapRecord addMapRecord, CancellationToken token);
        Task RemoveMapRecordIdFromReport(MapRecord mapRecord, CancellationToken token);
        bool UpdateATLProject(ATLProject aTLProject, CancellationToken token);
        Task<bool> IsAtlProjectNameExistForUpdate(UpdateATLProjectRequestDto aTLProject);
        Task<bool> IsAtlProjectNameExist1(CheckUniquenessRequestDto atlproject);
        Task<ATLProject> GetAtlProjectDetails(Guid atlProjectId, CancellationToken token);
    }
}
