using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.Exceptions.Broker;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;
using UtilityKit.Components.Atl.Infrastrcuture.Caching;

namespace UtilityKit.Components.Atl.Infrastrcuture.Repositories
{
    public class DataSourceRepository : IDataSourceRepository
    {
        private readonly DbSet<DataSource> _dataSourceContext;

        #region --- Constructor
        public DataSourceRepository(ATLDbContext context, ICacheManager cacheManager)
        {
            _dataSourceContext = context.Set<DataSource>();
        }

        #endregion

        #region ---  Methods
        public async Task<DataSource> Add(DataSource aTLProjectDataSourceType, CancellationToken token)
        {
            await _dataSourceContext.AddAsync(aTLProjectDataSourceType, token);
            return aTLProjectDataSourceType;
        }

        public async Task<List<DataSourceWithRecordDto>> GetAtlSchema(Guid ATLProjectId, CancellationToken cancellationToken)
        {
            var atlDataSource =
                await _dataSourceContext
                .AsNoTracking()
                .Where(ds => ds.ATLProjectId == ATLProjectId)
                .Select(c => new DataSourceWithRecordDto
                {
                    DataSource = c,
                    HasMapRecord = c.MapRecords.Any(),
                })
                .ToListAsync();
            return atlDataSource;
        }


        public async Task<bool> DeleteDataSource(Guid id, CancellationToken token)
        {
            var dataSource = await GetDataSourceById(id, token);
            var removeResponse = _dataSourceContext.Remove(dataSource);
            return removeResponse is not null;
        }

        public async Task<DataSource> GetDataSourceById(Guid id, CancellationToken token)
        {
            var dataSource = await _dataSourceContext.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync(token);
            return dataSource;
        }

        public Task<bool> IsDataSourceExist(Guid id, CancellationToken cancellationToken)
        {
            return _dataSourceContext.AsNoTracking().AnyAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<bool> IsDataSourceNameExist(CheckDataSourceUniquenessRequestDto dataSource)
        {

            return
                await _dataSourceContext
                .AsNoTracking()
                .AnyAsync(x => x.Name.ToLower() == dataSource.Name.ToLower() && x.ATLProjectId == dataSource.atlProjectId);

        }
        #endregion

    }
}
