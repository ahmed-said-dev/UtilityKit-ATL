using AutoMapper;
using FluentValidation;
using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord
{
    public class EditMapRecordCommand : IRequest
    {
        public EditMapRecordRequest EditMapRecordRequest { get; set; }
        public class Handler : IRequestHandler<EditMapRecordCommand>
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
            public async Task<Unit> Handle(EditMapRecordCommand request, CancellationToken cancellationToken)
            {
                var isMapRecordIdExist = await _mapRecordRepository.IsMapRecordExist((Guid)request.EditMapRecordRequest.MapRecord.Id, cancellationToken);
                if (!isMapRecordIdExist)
                    throw new MapRecordNotFoundException();

                var mapRecordEntity = await _mapRecordRepository.GetMapRecordById((Guid)request.EditMapRecordRequest.MapRecord.Id, cancellationToken);

                mapRecordEntity.DataSourceId = request.EditMapRecordRequest.MapRecord.DataSourceId;
                mapRecordEntity.MapMode = request.EditMapRecordRequest.MapRecord.MapMode;
                mapRecordEntity.SourceDataJson.DataSourceEntityName = request.EditMapRecordRequest.MapRecord.SourceDataJson.DataSourceEntityName;
                mapRecordEntity.SourceDataJson.DataSourceEntityType = request.EditMapRecordRequest.MapRecord.SourceDataJson.DataSourceEntityType;
                mapRecordEntity.SourceDataJson.WhereClause = request.EditMapRecordRequest.MapRecord.SourceDataJson.WhereClause;
                mapRecordEntity.DestinationNetworkJson.AssetTypeId = request.EditMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeId;
                mapRecordEntity.DestinationNetworkJson.AssetTypeName = request.EditMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeName;


                _mapRecordRepository.Update(mapRecordEntity);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(Unit.Value);
            }
            public class Validator : AbstractValidator<EditMapRecordCommand>
            {
                private readonly IATLProjectRepository _aTLProjectRepository;
                public Validator()
                {
                    RuleLevelCascadeMode = CascadeMode.Stop;
                    RuleFor(x => x.EditMapRecordRequest.MapRecord.DataSourceId).NotEmpty().WithMessage(MapRecordErrors.DATASOURCE_EMPTY);
                    RuleFor(x => x.EditMapRecordRequest.MapRecord.MapMode).NotEmpty().WithMessage(MapRecordErrors.MAPMODE_EMPTY);
                    RuleFor(x => x.EditMapRecordRequest.MapRecord.SourceDataJson.DataSourceEntityName).NotEmpty().WithMessage(MapRecordErrors.DATASOURCEENTITYNAME_EMPTY);
                    RuleFor(x => x.EditMapRecordRequest.MapRecord.SourceDataJson.DataSourceEntityType).NotEmpty().WithMessage(MapRecordErrors.DATASOURCEENTITYTYPE_EMPTY);
                    RuleFor(x => x.EditMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeId).NotEmpty().WithMessage(MapRecordErrors.ASSETTYPE_ID_EMPTY);
                    RuleFor(x => x.EditMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeName).NotEmpty().WithMessage(MapRecordErrors.ASSETTYPE_NAME_EMPTY);
                }
            }
            #endregion
        }
    }
}
