using AutoMapper;
using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord
{
    public class AddStructureSettingsToMapRecordCommand : IRequest
    {
        public AddStructureSettingsToMapRecordRequestDto AddStructureSettingsToMapRecordRequest { get; set; }
        public class Handler : IRequestHandler<AddStructureSettingsToMapRecordCommand>
        {
            #region --- Variables
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;
            private readonly IUnitOfWork _unitOfWork;

            #endregion

            #region --- Constructor
            public Handler(IMapRecordRepository mapRecordRepository, IUnitOfWork unitOfWork, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
                _unitOfWork = unitOfWork;
                _mapper = mapper;
            }
            #endregion

            #region --- Methods
            public async Task<Unit> Handle(AddStructureSettingsToMapRecordCommand request, CancellationToken cancellationToken)
            {
                var mapRecordId = request.AddStructureSettingsToMapRecordRequest.MapRecordId;
                var isMapRecordIdExist = await _mapRecordRepository.IsMapRecordExist(mapRecordId, cancellationToken);
                if (!isMapRecordIdExist)
                    throw new MapRecordNotFoundException();

                var mapRecordEntity = await _mapRecordRepository.GetMapRecordById(mapRecordId, cancellationToken);
                if (mapRecordEntity.StructureSettingsJson == null && request.AddStructureSettingsToMapRecordRequest.StructureSettingsJson != null)
                {
                    _mapRecordRepository.UpdateMapRecordCompleteness(mapRecordEntity, ActionsEnum.AddStructureAttachmentSetting);
                }
                if (mapRecordEntity.StructureSettingsJson != null && request.AddStructureSettingsToMapRecordRequest.StructureSettingsJson == null)
                {
                    _mapRecordRepository.DeleteMapRecordCompleteness(mapRecordEntity, ActionsEnum.AddStructureAttachmentSetting);
                }
                mapRecordEntity.StructureSettingsJson = _mapper.Map<StructureSettings>(request.AddStructureSettingsToMapRecordRequest.StructureSettingsJson);

                _mapRecordRepository.Update(mapRecordEntity);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(Unit.Value);
            }
            #endregion
        }
    }
}
