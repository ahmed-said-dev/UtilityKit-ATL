using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_Schema_DataSource
{
    public class DeleteSchemaFromATLCommand : IRequest<bool>
    {
        public Guid DataSourceId;
        public class Handler : IRequestHandler<DeleteSchemaFromATLCommand, bool>
        {
            private readonly IDataSourceRepository _dataSourceRepository;
            private readonly IUnitOfWork _unitOfWork;
            public Handler(IDataSourceRepository dataSourceRepository, IUnitOfWork unitOfWork)
            {
                _dataSourceRepository = dataSourceRepository;
                _unitOfWork = unitOfWork;
            }

            public async Task<bool> Handle(DeleteSchemaFromATLCommand request, CancellationToken cancellationToken)
            {
                var isDataSourceIdExist = await _dataSourceRepository.IsDataSourceExist(request.DataSourceId, cancellationToken);
                if (!isDataSourceIdExist)
                    throw new DataSourceNotFoundException();

                var isDeleted = await _dataSourceRepository.DeleteDataSource(request.DataSourceId, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return isDeleted;
            }
        }
    }
}
