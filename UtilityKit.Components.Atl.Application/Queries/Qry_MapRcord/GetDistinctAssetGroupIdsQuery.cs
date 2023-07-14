using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Repository;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_MapRcord
{
    public class GetDistinctAssetGroupIdsQuery : IRequest<List<Guid>>
    {
        public Guid AtlId { get; set; }
        public class Handler : IRequestHandler<GetDistinctAssetGroupIdsQuery, List<Guid>>
        {
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;

            public Handler(IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
            }

            public async Task<List<Guid>> Handle(GetDistinctAssetGroupIdsQuery request, CancellationToken cancellationToken)
            {
                return await _mapRecordRepository.GetDistinctAssetGroupIds(request.AtlId,cancellationToken);
            }
        }
    }
}
