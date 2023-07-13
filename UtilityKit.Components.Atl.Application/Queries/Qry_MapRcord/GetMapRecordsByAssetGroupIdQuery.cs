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
    public class GetMapRecordsByAssetGroupIdQuery : IRequest<GetMapRecordsByAssetGroupIdResponce>
    {
        public Guid? AssetGroupId { get; set; }
        public Guid AtlId { get; set; }
        public class Handler : IRequestHandler<GetMapRecordsByAssetGroupIdQuery, GetMapRecordsByAssetGroupIdResponce>
        {
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;

            public Handler(IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
                _mapper = mapper;
            }

            public async Task<GetMapRecordsByAssetGroupIdResponce> Handle(GetMapRecordsByAssetGroupIdQuery request, CancellationToken cancellationToken)
            {
                var getMapRecordsByAssetGroupIdResponce = new GetMapRecordsByAssetGroupIdResponce();
                var mapRecordByAssetGroupId = await _mapRecordRepository.GetByAssetGroupId(request.AtlId, request.AssetGroupId, cancellationToken);
                if (mapRecordByAssetGroupId != null)
                {
                    var mapRecords = _mapper.Map<List<GetMapRecordDto>>(mapRecordByAssetGroupId);
                    getMapRecordsByAssetGroupIdResponce.GetMapRecords = mapRecords;
                    return getMapRecordsByAssetGroupIdResponce;
                }
                return getMapRecordsByAssetGroupIdResponce;
            }

            public class Validator : AbstractValidator<GetMapRecordsByAssetGroupIdQuery>
            {
                public Validator()
                {
                    RuleFor(x => x.AtlId).NotEmpty().WithMessage(MapRecordErrors.ATL_PROJECT_ID_EMPTY);
                    RuleFor(x => x.AssetGroupId).NotEmpty().WithMessage(MapRecordErrors.ASSETGROUP_ID_EMPTY);
                }
            }
        }
    }
}