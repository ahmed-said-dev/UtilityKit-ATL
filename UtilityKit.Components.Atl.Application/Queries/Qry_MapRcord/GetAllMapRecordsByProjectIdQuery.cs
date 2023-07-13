using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord;
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
    public class GetAllMapRecordsByProjectIdQuery : IRequest<GetAllMapRecordsByProjectIdResponce>
    {
        public Guid AtlId { get; set; }
        public class Handler : IRequestHandler<GetAllMapRecordsByProjectIdQuery, GetAllMapRecordsByProjectIdResponce>
        {
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;

            public Handler(IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
                _mapper = mapper;
            }

            public async Task<GetAllMapRecordsByProjectIdResponce> Handle(GetAllMapRecordsByProjectIdQuery request, CancellationToken cancellationToken)
            {
                var GetAllMapRecordsByProjectIdResponce = new GetAllMapRecordsByProjectIdResponce();
                var entityMapRecords = await _mapRecordRepository.GetAllMapRecordsByProjectId(request.AtlId, cancellationToken);
                if (entityMapRecords != null)
                {
                    var mapRecords = _mapper.Map<List<GetMapRecordDto>>(entityMapRecords);
                    GetAllMapRecordsByProjectIdResponce.GetMapRecords = mapRecords;
                    return GetAllMapRecordsByProjectIdResponce;
                }
                return GetAllMapRecordsByProjectIdResponce;
            }

            public class Validator : AbstractValidator<GetAllMapRecordsByProjectIdQuery>
            {
                public Validator()
                {
                    RuleFor(x => x.AtlId).NotEmpty().WithMessage(MapRecordErrors.ATL_PROJECT_ID_EMPTY);
                }

            }
        }
    }
}