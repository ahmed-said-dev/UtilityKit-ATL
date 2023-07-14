using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Shared.GIS;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_ATLProject
{
    public class GetATLProjectDetailsQuery : IRequest<AtlProjectDetailsDto>
    {
        public Guid Id { get; set; }
        public class Handler : IRequestHandler<GetATLProjectDetailsQuery, AtlProjectDetailsDto>
        {
            private readonly IATLProjectRepository _aTLProjectRepository;
            private readonly IMapper _mapper;
            public Handler(IATLProjectRepository aTLProjectRepository, IMapper mapper)
            {
                _aTLProjectRepository = aTLProjectRepository;
                _mapper = mapper;
            }

            public async Task<AtlProjectDetailsDto> Handle(GetATLProjectDetailsQuery request, CancellationToken cancellationToken)
            {
                var aTLProjectsEntity = await _aTLProjectRepository.GetAtlProjectDetails(request.Id, cancellationToken);
                if (aTLProjectsEntity != null)
                {
                    var aTLProjects = _mapper.Map<AtlProjectDetailsDto>(aTLProjectsEntity);
                    return aTLProjects;
                }
                return new AtlProjectDetailsDto();
            }
        }
    }
}