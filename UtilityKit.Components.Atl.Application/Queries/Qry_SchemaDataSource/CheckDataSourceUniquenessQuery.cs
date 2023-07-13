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
    public class CheckDataSourceUniquenessQuery : IRequest<bool>
    {
        public CheckDataSourceUniquenessRequestDto CheckDataSourceUniquenessRequest { get; set; }

        public class Handler : IRequestHandler<CheckDataSourceUniquenessQuery, bool>
        {
            private readonly IDataSourceRepository _dataSourceRepository;
            public Handler(IDataSourceRepository dataSourceRepository)
            {
                _dataSourceRepository = dataSourceRepository;
            }

            public async Task<bool> Handle(CheckDataSourceUniquenessQuery request, CancellationToken cancellationToken)
            {
                return await _dataSourceRepository.IsDataSourceNameExist(request.CheckDataSourceUniquenessRequest);
            }
        }
    }
}