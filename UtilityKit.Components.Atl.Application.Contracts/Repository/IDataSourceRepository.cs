using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Repository
{
    public interface IDataSourceRepository
    {
        Task<DataSource> Add(DataSource aTLProjectDataSourceType, CancellationToken token);
        Task<bool> DeleteDataSource(Guid id, CancellationToken token);
        Task<List<DataSourceWithRecordDto>> GetAtlSchema(Guid ATLProjectId, CancellationToken cancellationToken);
        Task<bool> IsDataSourceExist(Guid id, CancellationToken cancellationToken);
        Task<bool> IsDataSourceNameExist(CheckDataSourceUniquenessRequestDto dataSource);
    }
}
