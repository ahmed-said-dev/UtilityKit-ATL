using AutoMapper;
using CsvHelper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_XMLSchema.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;

namespace UtilityKit.Components.Atl.Application.Queries.Qry_SchemaDataSource
{
    public class GetSchemaDataSource : IRequest<List<AddSchemaToATLResponce>>
    {
        public Guid ATLProjectId { get; set; }
        public class Handler : IRequestHandler<GetSchemaDataSource, List<AddSchemaToATLResponce>>
        {
            private readonly IDataSourceRepository _dataSourceRepository;
            private readonly IMapper _mapper;

            public Handler(IDataSourceRepository dataSourceRepository, IMapper mapper)
            {
                _dataSourceRepository = dataSourceRepository;
                _mapper = mapper;
            }

            public async Task<List<AddSchemaToATLResponce>> Handle(GetSchemaDataSource request, CancellationToken cancellationToken)
            {
                var addSchemaToATLResponce = new List<AddSchemaToATLResponce>();
                var aTLProjectDataSource = await _dataSourceRepository.GetAtlSchema(request.ATLProjectId, cancellationToken);
                if (aTLProjectDataSource != null)
                {
                    addSchemaToATLResponce = aTLProjectDataSource.Select(v => new AddSchemaToATLResponce
                    {
                        DataSource = _mapper.Map<DataSourceDto>(v.DataSource),
                        HasMapRecord = v.HasMapRecord,
                    }).ToList();

                    return addSchemaToATLResponce;
                }
                return addSchemaToATLResponce;
            }
        }
    }
}
