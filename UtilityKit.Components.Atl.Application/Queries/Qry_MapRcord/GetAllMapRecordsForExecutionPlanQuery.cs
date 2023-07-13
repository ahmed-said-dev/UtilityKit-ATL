using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_XMLSchema.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject;
using UtilityKit.Components.Atl.Application.Queries.Qry_SchemaDataSource;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_MapRcord
{
    public class GetAllMapRecordsForExecutionPlanQuery : IRequest<GetAllMapRecordsForExecutionPlanResponce>
    {
        public Guid AtlId { get; set; }
        public class Handler : IRequestHandler<GetAllMapRecordsForExecutionPlanQuery, GetAllMapRecordsForExecutionPlanResponce>
        {
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;

            public Handler(IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
                _mapper = mapper;
            }

            public async Task<GetAllMapRecordsForExecutionPlanResponce> Handle(GetAllMapRecordsForExecutionPlanQuery request, CancellationToken cancellationToken)
            {
                var getAllMapRecordsForExecutionPlanResponce = new GetAllMapRecordsForExecutionPlanResponce();
                var entityMapRecords = await _mapRecordRepository.GetAllMapRecordsForExecutionPlan(request.AtlId, cancellationToken);
                if (entityMapRecords != null)
                {
                    var mapRecords = _mapper.Map<List<GetMapRecordDto>>(entityMapRecords);
                    getAllMapRecordsForExecutionPlanResponce.GetMapRecords = mapRecords;
                    return getAllMapRecordsForExecutionPlanResponce;
                }
                return getAllMapRecordsForExecutionPlanResponce;
            }

            public class Validator : AbstractValidator<GetAllMapRecordsForExecutionPlanQuery>
            {
                public Validator()
                {
                    RuleFor(x => x.AtlId).NotEmpty().WithMessage(MapRecordErrors.ATL_PROJECT_ID_EMPTY);
                }
            }
        }
    }
}