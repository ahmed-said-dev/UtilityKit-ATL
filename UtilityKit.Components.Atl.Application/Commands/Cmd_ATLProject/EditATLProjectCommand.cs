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

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_ATLProject;
public class EditATLProjectCommand : IRequest<ATLProject_Edit_Response>
{
    public ATLProject_Edit_Request EditATLProjectModel { get; set; }
    public class Handler : IRequestHandler<EditATLProjectCommand, ATLProject_Edit_Response>
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
        public async Task<ATLProject_Edit_Response> Handle(EditATLProjectCommand request, CancellationToken cancellationToken)
        {
            ATLProject? aTLProject = request.EditATLProjectModel?.MapToDomain();
            if (request.EditATLProjectModel.UndProject != null)
            {
                aTLProject.ProjectReportJson = CreateReport(request.EditATLProjectModel.UndProject);
            }
            else
            {
                aTLProject.ProjectReportJson = null;
            }
            ATLProject addATLProject = await _aTLProjectRepository.EditATLProject(aTLProject, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return new ATLProject_Edit_Response().MapToResponse(addATLProject);
        }

        private List<ProjectReport> CreateReport(UndProjectDto undProject)
        {
            var projectReportList = new List<ProjectReport>();
            undProject.Network.ForEach(network =>
            {
                network.AssetTables.ForEach(assetTable =>
                {
                    assetTable.assetGroups.ForEach(assetGroup =>
                    {
                        assetGroup.AssetTypes.ForEach(assetType =>
                        {

                            ProjectReport projectReport = new ProjectReport();
                            projectReport.NetworkId = network.Id;
                            projectReport.NetworkName = network.Name;
                            projectReport.AssetTableId = assetTable.Id;
                            projectReport.AssetTableName = assetTable.Name;
                            projectReport.AssetGroupId = assetGroup.Id;
                            projectReport.AssetGroupName = assetGroup.Name;
                            projectReport.AssetTypeId = assetType.Id;
                            projectReport.AssetTypeName = assetType.Name;
                            projectReport.AssetTableType = assetTable.TableTypeId;
                            projectReport.UndProjectId = undProject.ProjectId;

                            projectReportList.Add(projectReport);

                        });
                    });
                });
            });

            return projectReportList;
        }

        //public class Validator : AbstractValidator<EditATLProjectCommand>
        //{
        //    public Validator()
        //    {
        //        RuleFor(x => x.EditATLProjectModel)
        //            .NotEmpty()
        //                .WithMessage(ATLProjectErrors.EMPTY_MODEL);
        //    }
        //}
        #endregion
    }
}