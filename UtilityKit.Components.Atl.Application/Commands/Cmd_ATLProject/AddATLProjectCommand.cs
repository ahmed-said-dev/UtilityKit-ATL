using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.Exceptions.Broker;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Http;
using System.Xml.Linq;
using G2Kit.Components.Und.Domain.Exceptions.Broker;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_ATLProject;
public class AddATLProjectCommand : IRequest<ATLProject_Response>
{
    public ATLProject_Add_Request AddATLProjectModel { get; set; }
    public class Handler : IRequestHandler<AddATLProjectCommand, ATLProject_Response>
    {
        #region --- Variables
        private readonly IATLProjectRepository _aTLProjectRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region --- Constructor
        public Handler(IATLProjectRepository aTLProjectRepository, IUnitOfWork unitOfWork)
        {
            _aTLProjectRepository = aTLProjectRepository;
            _unitOfWork = unitOfWork;
        }
        #endregion

        #region --- Methods
        public async Task<ATLProject_Response> Handle(AddATLProjectCommand request, CancellationToken cancellationToken)
        {
            var nameExist = await _aTLProjectRepository.IsAtlProjectNameExist(request.AddATLProjectModel.Name);
            if (nameExist)
                throw new ATLProjectNameExist();
            ATLProject? aTLProject = request.AddATLProjectModel?.MapToDomain();
            ATLProject addATLProject = await _aTLProjectRepository.AddATLProject(aTLProject, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return new ATLProject_Response().MapToResponse(addATLProject);

        }

        public class Validator : AbstractValidator<AddATLProjectCommand>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            public Validator(IATLProjectRepository aTLProjectRepository)
            {
                _aTLProjectRepository = aTLProjectRepository;
                RuleLevelCascadeMode = CascadeMode.Stop;

                RuleFor(x => x.AddATLProjectModel.Name).NotEmpty().WithMessage(ATLProjectErrors.EMPTY_NAME);
                RuleFor(x => x.AddATLProjectModel.Name)
                    .Length(1, 100).WithMessage(ATLProjectErrors.NAME_LENGTH);
                //RuleFor(x => x.AddATLProjectModel.Name)
                //    .MustAsync(async (name, cancellationToken) =>
                //        {
                //            return !await _aTLProjectRepository.IsAtlProjectNameExist(name);
                //        })
                //    .WithMessage(ATLProjectErrors.UNIQUE_NAME);

                RuleFor(x => x.AddATLProjectModel.Description).Length(0, 250).WithMessage(ATLProjectErrors.DESCRIPTION_LENGTH);

            }
            private async Task<bool> BeUnique(string name)
            {
                if (await _aTLProjectRepository.IsAtlProjectNameExist(name))
                    return true;
                return false;
            }
        }
        #endregion
    }
}