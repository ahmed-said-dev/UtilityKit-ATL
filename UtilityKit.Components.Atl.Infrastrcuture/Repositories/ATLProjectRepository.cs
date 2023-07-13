using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.Exceptions.Broker;
using UtilityKit.Components.Atl.Infrastrcuture.Caching;

namespace UtilityKit.Components.Atl.Infrastrcuture.Repositories
{
    public class ATLProjectRepository : IATLProjectRepository
    {
        private readonly DbSet<ATLProject> _aTLProjectContext;
        private readonly ICacheManager _cacheManager;
        #region --- Constructor
        public ATLProjectRepository(ATLDbContext context, ICacheManager cacheManager)
        {
            _aTLProjectContext = context.Set<ATLProject>();
            _cacheManager = cacheManager;
        }
        #endregion

        #region --- Add ATLProject
        public async Task<ATLProject> AddATLProject(ATLProject aTLProject, CancellationToken token)
        {
            aTLProject.CreatorUserId = _cacheManager.GetAdminUserFromCache().Id;
            await _aTLProjectContext.AddAsync(aTLProject, token);
            return aTLProject;
        }

        public async Task<bool> IsAtlProjectNameExist(string name)
        {
            return
          await _aTLProjectContext
                .AsNoTracking()
                .AnyAsync(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<bool> IsAtlProjectNameExist1(CheckUniquenessRequestDto atlproject)
        {
            if (atlproject.Id != null)
                return
                    await _aTLProjectContext
                    .AsNoTracking()
                    .AnyAsync(x => x.Name.ToLower() == atlproject.Name.ToLower() && x.Id != atlproject.Id);

            else
                return
                    await _aTLProjectContext
                    .AsNoTracking()
                    .AnyAsync(x => x.Name.ToLower() == atlproject.Name.ToLower());
        }

        public async Task<ATLProject> EditATLProject(ATLProject aTLProject, CancellationToken token)
        {
            ATLProject atlPorjectObject = new ATLProject();
            try
            {

                atlPorjectObject = await Get(aTLProject.Id, token);
                atlPorjectObject.LastModifiedUserId = _cacheManager.GetAdminUserFromCache().Id;
                atlPorjectObject.UndProjectId = aTLProject.UndProjectId;
                atlPorjectObject.ProjectReportJson = aTLProject.ProjectReportJson;

                _aTLProjectContext.Update(atlPorjectObject);
            }
            catch (Exception)
            {
                throw new AssetTableNotFoundException();
            }
            return atlPorjectObject;
        }

        public async Task<bool> IsAtlProjectNameExistForUpdate(UpdateATLProjectRequestDto aTLProject)
        {
            return
          await _aTLProjectContext
                .AsNoTracking()
                .AnyAsync(x => x.Name.ToLower() == aTLProject.Name.ToLower() && x.Id != aTLProject.Id);
        }

        public bool UpdateATLProject(ATLProject aTLProject, CancellationToken token)
        {
            _aTLProjectContext.Update(aTLProject);
            return aTLProject is not null;
        }

        public async Task<ATLProject> Get(Guid id, CancellationToken token)
        {
            var aTLProject =
                await _aTLProjectContext
                .AsNoTracking()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(token);

            return aTLProject;
        }

        public async Task<GetAtlWithMapRecords> GetAtlWithMapRecords(Guid id, CancellationToken token)
        {
            var aTLProject =
                      await _aTLProjectContext
                      .AsNoTracking()
                      .Where(x => x.Id == id)
                      .Select(atl => new GetAtlWithMapRecords
                      {
                          ATLProject = atl,
                          MapRecordsCount = atl.MapRecords.Count
                      }).FirstOrDefaultAsync(token);

            return aTLProject;
        }

        public async Task<List<ATLProject>> GetAll(CancellationToken token)
        {
            return await _aTLProjectContext.OrderByDescending(f => f.ModifiedData != null ? f.ModifiedData : f.CreationDate).ToListAsync();
        }

        public async Task AddMapRecordIdToReport(MapRecord mapRecord, CancellationToken token)
        {

            ATLProject atlPorjectObject = new ATLProject();

            atlPorjectObject = await Get(mapRecord.ATLProjectId, token);

            atlPorjectObject.ProjectReportJson
                  .FirstOrDefault(report => report.AssetTableId == mapRecord.DestinationNetworkJson.AssetTableId &&
                  report.AssetGroupId == mapRecord.DestinationNetworkJson.AssetGroupId &&
                  report.AssetTypeId == mapRecord.DestinationNetworkJson.AssetTypeId)?.MapRecordIds.Add(mapRecord.Id);
            _aTLProjectContext.Update(atlPorjectObject);
        }

        public async Task RemoveMapRecordIdFromReport(MapRecord mapRecord, CancellationToken token)
        {

            ATLProject atlPorjectObject = new ATLProject();

            atlPorjectObject = await Get(mapRecord.ATLProjectId, token);

            atlPorjectObject.ProjectReportJson
                  .FirstOrDefault(report => report.AssetTableId == mapRecord.DestinationNetworkJson.AssetTableId &&
                  report.AssetGroupId == mapRecord.DestinationNetworkJson.AssetGroupId &&
                  report.AssetTypeId == mapRecord.DestinationNetworkJson.AssetTypeId)?.MapRecordIds.Remove(mapRecord.Id);
            _aTLProjectContext.Update(atlPorjectObject);
        }

        public async Task<ATLProject> GetAtlProjectDetails(Guid atlProjectId, CancellationToken token)
        {
            var atlProject =
                await _aTLProjectContext
                .Include(atl => atl.DataSources)
                .Include(atl => atl.MapRecords)
                .FirstOrDefaultAsync(atl => atl.Id == atlProjectId, cancellationToken: token);
            if (atlProject != null)
            {
                return atlProject;
            }
            return new ATLProject();
        }
    }
    #endregion

}
