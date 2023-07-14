﻿using FluentValidation;
using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord
{
    public class CloneMapRecordCommand : IRequest<bool>
    {
        public Guid MapRecordId;
        public class Handler : IRequestHandler<CloneMapRecordCommand, bool>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            private readonly IMapRecordRepository _mapRecordRepository;
            private readonly IUnitOfWork _unitOfWork;
            public Handler(IATLProjectRepository aTLProjectRepository,IMapRecordRepository mapRecordRepository, IUnitOfWork unitOfWork)
            {
                _aTLProjectRepository = aTLProjectRepository;
                _mapRecordRepository = mapRecordRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<bool> Handle(CloneMapRecordCommand request, CancellationToken cancellationToken)
            {
                var isMapRecordIdExist = await _mapRecordRepository.IsMapRecordExist(request.MapRecordId, cancellationToken);
                if (!isMapRecordIdExist)
                    throw new MapRecordNotFoundException();

                var mapRecord = await _mapRecordRepository.CloneMapRecord(request.MapRecordId, cancellationToken);
                await _aTLProjectRepository.AddMapRecordIdToReport(mapRecord, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return mapRecord is not null;
            }
            public class Validator : AbstractValidator<CloneMapRecordCommand>
            {
                public Validator()
                {
                    RuleFor(x => x.MapRecordId).NotEmpty().WithMessage(MapRecordErrors.ID_EMPTY);
                }
            }
        }
    }
}
