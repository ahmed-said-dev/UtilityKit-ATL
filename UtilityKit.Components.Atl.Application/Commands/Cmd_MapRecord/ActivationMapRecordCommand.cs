using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord
{
    public class ActivationMapRecordCommand : IRequest<bool>
    {
        public Guid MapRecordId;
        public class Handler : IRequestHandler<ActivationMapRecordCommand, bool>
        {
            private readonly IMapRecordRepository _mapRecordRepository;
            private readonly IUnitOfWork _unitOfWork;
            public Handler(IMapRecordRepository mapRecordRepository, IUnitOfWork unitOfWork)
            {
                _mapRecordRepository = mapRecordRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<bool> Handle(ActivationMapRecordCommand request, CancellationToken cancellationToken)
            {
                var isMapRecordIdExist = await _mapRecordRepository.IsMapRecordExist(request.MapRecordId, cancellationToken);
                if (!isMapRecordIdExist)
                    throw new MapRecordNotFoundException();

                var activationDone = await _mapRecordRepository.ActivationMapRecord(request.MapRecordId, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return activationDone;
            }
        }
    }
}
