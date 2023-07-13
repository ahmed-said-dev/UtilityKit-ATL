using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Repository;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject
{
    public class CheckUniquenessQuery : IRequest<bool>
    {
        public CheckUniquenessRequestDto CheckUniquenessRequest { get; set; }


        public class Handler : IRequestHandler<CheckUniquenessQuery, bool>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            public Handler(IATLProjectRepository aTLProjectRepository)
            {
                _aTLProjectRepository = aTLProjectRepository;
            }

            public async Task<bool> Handle(CheckUniquenessQuery request, CancellationToken cancellationToken)
            {
                return await _aTLProjectRepository.IsAtlProjectNameExist1(request.CheckUniquenessRequest);
            }


        }
    }
}
