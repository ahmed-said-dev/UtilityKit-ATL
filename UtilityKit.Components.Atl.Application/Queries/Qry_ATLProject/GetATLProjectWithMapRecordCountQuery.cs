using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject
{
    public class GetATLProjectWithMapRecordCountQuery : IRequest<GetATLProjectWithMapRecordCountResponce>
    {
        public Guid Id { get; set; }

        public class Handler : IRequestHandler<GetATLProjectWithMapRecordCountQuery, GetATLProjectWithMapRecordCountResponce>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            private readonly IMapRecordRepository _mapRecordRepository;
            private readonly IMapper _mapper;
            public Handler(IATLProjectRepository aTLProjectRepository, IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _aTLProjectRepository = aTLProjectRepository;
                _mapRecordRepository = mapRecordRepository;
                _mapper = mapper;
            }

            public async Task<GetATLProjectWithMapRecordCountResponce> Handle(GetATLProjectWithMapRecordCountQuery request, CancellationToken cancellationToken)
            {
                var aTLProjects = await _aTLProjectRepository.GetAtlWithMapRecords(request.Id, cancellationToken);
                var responce = new GetATLProjectWithMapRecordCountResponce();
                if (aTLProjects != null)
                {
                    responce.ATLProject = _mapper.Map<ATLProjectDto>(aTLProjects.ATLProject);
                    responce.MapRecordsCount = aTLProjects.MapRecordsCount;
                    responce.ProjectCompletenessValue = await GetProjectCompletenessValue(request.Id, cancellationToken);
                    return responce;
                }
                return new GetATLProjectWithMapRecordCountResponce();
            }


            private async Task<double> GetProjectCompletenessValue(Guid atlId, CancellationToken cancellationToken)
            {
                var aTLProject = await _aTLProjectRepository.Get(atlId, cancellationToken);
                var mapRecordList = await _mapRecordRepository.GetAllMapRecordsByProjectId(atlId, cancellationToken);
                var reports = aTLProject.ProjectReportJson;
                if (aTLProject != null && reports != null)
                {

                    var projectReportHasMapRecord = from mapRecord in mapRecordList
                                                    from report in reports
                                                    where report.MapRecordIds.Any(reportMapRecordId => reportMapRecordId == mapRecord.Id)

                                                    select new ProjectReportDto
                                                    {
                                                        MapRecordCompletenessValue = mapRecord.CompletenessCriteriaJson.Sum(mapRecord => mapRecord.Value),
                                                        AssetTypeId = report.AssetTypeId
                                                    };

                    var groupMapRecordByAssetType = from t in projectReportHasMapRecord
                                                    group t by new
                                                    {
                                                        t.AssetTypeId
                                                    } into g
                                                    select new ProjectReportDto
                                                    {
                                                        MapRecordCompletenessValue = g.Average(p => p.MapRecordCompletenessValue),
                                                        AssetTypeId = g.Key.AssetTypeId
                                                    };


                    var projectReportHasNotMapRecord = from report in reports
                                                       where report.MapRecordIds.Count == 0
                                                       select new ProjectReportDto
                                                       {
                                                           MapRecordCompletenessValue = 0
                                                       };

                    var projectReport = projectReportHasMapRecord.Union(projectReportHasNotMapRecord).ToList();
                    var value = groupMapRecordByAssetType.Union(projectReportHasNotMapRecord).ToList();

                    double allValues = 0;
                    foreach (var report in value)
                    {
                        allValues += report.MapRecordCompletenessValue;
                    }

                    double ProjectCompletenessValue = allValues / value.Count;


                    return ProjectCompletenessValue;
                }
                return 0;
            }

        }
    }
}
