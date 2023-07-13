using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Shared.GIS;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject
{
    public class GetAllATLProjectQuery : IRequest<List<ATLProject_Response>>
    {
        public class Handler : IRequestHandler<GetAllATLProjectQuery, List<ATLProject_Response>>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            public Handler(IATLProjectRepository aTLProjectRepository)
            {
                _aTLProjectRepository = aTLProjectRepository;
            }

            public async Task<List<ATLProject_Response>> Handle(GetAllATLProjectQuery request, CancellationToken cancellationToken)
            {
                var aTLProjects = await _aTLProjectRepository.GetAll(cancellationToken);
                if (aTLProjects != null)
                {
                    return new ATLProject_Response().MapToResponseList(aTLProjects);
                }
                return new List<ATLProject_Response>();
            }
        }
    }
}
