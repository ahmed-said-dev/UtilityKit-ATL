using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Repository;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject
{
    public class GetATLProjectQuery : IRequest<ATLProject_Response>
    {
        public Guid Id { get; set; }

        public class Handler : IRequestHandler<GetATLProjectQuery, ATLProject_Response>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            public Handler(IATLProjectRepository aTLProjectRepository)
            {
                _aTLProjectRepository = aTLProjectRepository;
            }

            public async Task<ATLProject_Response> Handle(GetATLProjectQuery request, CancellationToken cancellationToken)
            {
                var aTLProjects = await _aTLProjectRepository.Get(request.Id, cancellationToken);
                if (aTLProjects != null)
                {
                    var projectResponse = new ATLProject_Response().MapToResponse(aTLProjects);
                    return projectResponse;
                }
                return new ATLProject_Response();
            }


        }
    }
}
