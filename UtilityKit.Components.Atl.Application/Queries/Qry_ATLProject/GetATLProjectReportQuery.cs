using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject
{
    public class GetATLProjectReportQuery : IRequest<GetATLProjectReportResponce>
    {
        public Guid Id { get; set; }

        public class Handler : IRequestHandler<GetATLProjectReportQuery, GetATLProjectReportResponce>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            private readonly IMapRecordRepository _mapRecordRepository;
            private readonly IMapper _mapper;

            public Handler(IATLProjectRepository aTLProjectRepository, IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapper = mapper;
                _aTLProjectRepository = aTLProjectRepository;
                _mapRecordRepository = mapRecordRepository;
            }

            public async Task<GetATLProjectReportResponce> Handle(GetATLProjectReportQuery request, CancellationToken cancellationToken)
            {
                var aTLProject = await _aTLProjectRepository.Get(request.Id, cancellationToken);
                var mapRecordList = await _mapRecordRepository.GetAllMapRecordsByProjectId(request.Id, cancellationToken);
                if (aTLProject != null)
                {
                    var reports = aTLProject.ProjectReportJson;

                    var projectReportHasMapRecord = from mapRecord in mapRecordList
                                                    from report in reports
                                                    where report.MapRecordIds.Any(reportMapRecordId => reportMapRecordId == mapRecord.Id)

                                                    select new ProjectReportDto
                                                    {
                                                        MapRecordId = mapRecord.Id,
                                                        AssetGroupName = report.AssetGroupName,
                                                        MapRecordOrderInsideAssetGroup = mapRecord.Order,
                                                        AssetTableName = report.AssetTableName,
                                                        AssetTypeName = report.AssetTypeName,
                                                        AssetTypeId = report.AssetTypeId,
                                                        CompletenessCriteriaJson = _mapper.Map<List<CompletenessCriteriaDto>>(mapRecord.CompletenessCriteriaJson),
                                                        MapRecordCompletenessValue = mapRecord.CompletenessCriteriaJson.Sum(mapRecord => mapRecord.Value)
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
                                                           AssetGroupName = report.AssetGroupName,
                                                           AssetTableName = report.AssetTableName,
                                                           AssetTypeName = report.AssetTypeName,
                                                           MapRecordCompletenessValue = 0
                                                       };

                    var projectReport = projectReportHasMapRecord.Union(projectReportHasNotMapRecord).OrderBy(p => p.AssetGroupName).ToList();

                    var value = groupMapRecordByAssetType.Union(projectReportHasNotMapRecord).OrderBy(p => p.AssetGroupName).ToList();

                    double allValues = 0;
                    foreach (var report in value)
                    {
                        allValues += report.MapRecordCompletenessValue;
                    }

                    var getATLProjectReportResponce = new GetATLProjectReportResponce
                    {
                        ProjectReportJson = projectReport,
                        ProjectCompletenessValue = allValues / value.Count
                    };

                    return getATLProjectReportResponce;
                }
                return new GetATLProjectReportResponce();
            }

        }
    }
}
