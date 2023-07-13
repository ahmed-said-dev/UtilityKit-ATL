using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.Exceptions.Broker;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using FluentValidation;
using MediatR;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using G2Kit.Components.Und.Domain.Exceptions.Broker;
using UtilityKit.Components.Atl.Infrastrcuture.Caching;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_ATLProject;
public class UpdateATLProjectCommand : IRequest<bool>
{
    public UpdateATLProjectRequestDto UpdateATLProjectRequest { get; set; }
    public class Handler : IRequestHandler<UpdateATLProjectCommand, bool>
    {
        #region --- Variables
        private readonly IATLProjectRepository _aTLProjectRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheManager _cacheManager;
        #endregion

        #region --- Constructor
        public Handler(IATLProjectRepository aTLProjectRepository, IUnitOfWork unitOfWork, ICacheManager cacheManager)
        {
            _aTLProjectRepository = aTLProjectRepository;
            _unitOfWork = unitOfWork;
            _cacheManager = cacheManager;
        }
        #endregion

        #region --- Methods
        public async Task<bool> Handle(UpdateATLProjectCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ATLProjectNotFoundException();
            }

            var aTLProjectEntity = await _aTLProjectRepository.Get(request.UpdateATLProjectRequest.Id, cancellationToken);
            if (aTLProjectEntity == null)
            {
                throw new ATLProjectNotFoundException();

            }

            var nameExist = await _aTLProjectRepository.IsAtlProjectNameExistForUpdate(request.UpdateATLProjectRequest);

            if (nameExist)
            {
                throw new ATLProjectNameExist();
            }

            aTLProjectEntity.LastModifiedUserId = _cacheManager.GetAdminUserFromCache().Id;
            aTLProjectEntity.ModifiedData = DateTime.Now;
            aTLProjectEntity.Name = request.UpdateATLProjectRequest.Name;
            aTLProjectEntity.Description = request.UpdateATLProjectRequest.Description;

            var isUpdated = _aTLProjectRepository.UpdateATLProject(aTLProjectEntity, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return isUpdated;
        }



        public class Validator : AbstractValidator<UpdateATLProjectCommand>
        {
            public Validator()
            {
                RuleFor(x => x.UpdateATLProjectRequest.Name).NotEmpty().WithMessage(ATLProjectErrors.EMPTY_NAME);
                RuleFor(x => x.UpdateATLProjectRequest.Name).Length(1, 100).WithMessage(ATLProjectErrors.NAME_LENGTH);
                RuleFor(x => x.UpdateATLProjectRequest.Description).Length(0, 250).WithMessage(ATLProjectErrors.DESCRIPTION_LENGTH);
            }
        }
        #endregion
    }
}