using AutoMapper;
using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Repository;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_MapRcord
{

    public class GetStructureSettingsForEditQuery : IRequest<GetStructureSettingsMapRecordForEditResponce>
    {
        public Guid MapRecordId { get; set; }
        public class Handler : IRequestHandler<GetStructureSettingsForEditQuery, GetStructureSettingsMapRecordForEditResponce>
        {
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;

            public Handler(IMapRecordRepository mapRecordRepository, IMapper mapper)
            {
                _mapper = mapper;
                _mapRecordRepository = mapRecordRepository;
            }

            public async Task<GetStructureSettingsMapRecordForEditResponce> Handle(GetStructureSettingsForEditQuery request, CancellationToken cancellationToken)
            {

                var isMapRecordIdExist = await _mapRecordRepository.IsMapRecordExist(request.MapRecordId, cancellationToken);
                if (!isMapRecordIdExist)
                    throw new MapRecordNotFoundException();


                var mapRecord = _mapRecordRepository.GetContainmentSettingsForEdit(request.MapRecordId);

                var structureSettings = _mapper.Map<GetStructureSettingsForEditDto>(mapRecord);

                return new GetStructureSettingsMapRecordForEditResponce()
                {
                    GetStructureSettingsForEdit = structureSettings
                };

            }

        }
    }
}
