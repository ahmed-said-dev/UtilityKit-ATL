using AutoMapper;
using FluentValidation;
using MediatR;
using UtilityKit.Components.Atl.Application.Commands.Cmd_ATLProject;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord
{
    public class AddMapRecordCommand : IRequest
    {
        public AddMapRecordRequest AddMapRecordRequest { get; set; }
        public class Handler : IRequestHandler<AddMapRecordCommand>
        {
            #region --- Variables
            private readonly IMapper _mapper;
            private readonly IMapRecordRepository _mapRecordRepository;
            private readonly IUnitOfWork _unitOfWork;
            private readonly IATLProjectRepository _aTLProjectRepository;
            #endregion

            #region --- Constructor
            public Handler(IATLProjectRepository aTLProjectRepository, IMapRecordRepository mapRecordRepository, IUnitOfWork unitOfWork, IMapper mapper)
            {
                _mapRecordRepository = mapRecordRepository;
                _aTLProjectRepository = aTLProjectRepository;
                _unitOfWork = unitOfWork;
                _mapper = mapper;
            }
            #endregion

            #region --- Methods
            public async Task<Unit> Handle(AddMapRecordCommand request, CancellationToken cancellationToken)
            {
                var maRecord = _mapper.Map<MapRecord>(request.AddMapRecordRequest.MapRecord);
                var allMapRecord = await _mapRecordRepository.GetByAssetGroupId(maRecord.ATLProjectId, maRecord.DestinationNetworkJson.AssetGroupId, cancellationToken);
                int maxOrder = 0;
                if (allMapRecord.Any())
                    maxOrder = allMapRecord.Max(c => c.Order);
                maRecord.Order = maxOrder + 1;
                _mapRecordRepository.SetCompletenessCriteria(maRecord);
                var addMapRecord = await _mapRecordRepository.Add(maRecord, cancellationToken);
                await _aTLProjectRepository.AddMapRecordIdToReport(addMapRecord, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(Unit.Value);
            }

            public class Validator : AbstractValidator<AddMapRecordCommand>
            {
                private readonly IATLProjectRepository _aTLProjectRepository;
                public Validator()
                {
                    RuleLevelCascadeMode = CascadeMode.Stop;
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.NetworkId).NotEmpty().WithMessage(MapRecordErrors.NETWORK_ID_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.NetworkName).NotEmpty().WithMessage(MapRecordErrors.NETWORK_NAME_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTableId).NotEmpty().WithMessage(MapRecordErrors.ASSETTABLE_ID_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTableName).NotEmpty().WithMessage(MapRecordErrors.ASSETTABLE_NAME_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetGroupId).NotEmpty().WithMessage(MapRecordErrors.ASSETGROUP_ID_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetGroupName).NotEmpty().WithMessage(MapRecordErrors.ASSETGROUP_NAME_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetGroupCode).NotNull().WithMessage(MapRecordErrors.ASSETGROUP_CODE_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeId).NotEmpty().WithMessage(MapRecordErrors.ASSETTYPE_ID_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeName).NotEmpty().WithMessage(MapRecordErrors.ASSETTYPE_NAME_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DestinationNetworkJson.AssetTypeCode).NotNull().WithMessage(MapRecordErrors.ASSETTYPE_CODE_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.ATLProjectId).NotEmpty().WithMessage(MapRecordErrors.ATLPROJECT_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.DataSourceId).NotEmpty().WithMessage(MapRecordErrors.DATASOURCE_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.SourceDataJson.DataSourceEntityType).NotEmpty().WithMessage(MapRecordErrors.DATASOURCEENTITYTYPE_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.SourceDataJson.DataSourceEntityName).NotEmpty().WithMessage(MapRecordErrors.DATASOURCEENTITYNAME_EMPTY);
                    RuleFor(x => x.AddMapRecordRequest.MapRecord.MapMode).NotEmpty().WithMessage(MapRecordErrors.MAPMODE_EMPTY);
                }

            }
            #endregion
        }
    }
}
