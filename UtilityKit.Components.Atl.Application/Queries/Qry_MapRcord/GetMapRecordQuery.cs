using AutoMapper;
using MediatR;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Repository;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_MapRcord
{
    public class GetMapRecordQuery : IRequest<GetMapRecordResponse>
    {
        public Guid Id { get; set; }
        public class Handler : IRequestHandler<GetMapRecordQuery, GetMapRecordResponse>
        {
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;

            public Handler(IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
                _mapper = mapper;
            }

            public async Task<GetMapRecordResponse> Handle(GetMapRecordQuery request, CancellationToken cancellationToken)
            {
                var mapRecordEntity = await _mapRecordRepository.GetMapRecordById(request.Id, cancellationToken);
                var getMapRecordResponse = new GetMapRecordResponse();
                if (mapRecordEntity != null)
                {
                    getMapRecordResponse.MapRecord = _mapper.Map<MapRecordDto>(mapRecordEntity);
                }
                return getMapRecordResponse;
            }
        }
    }
}
