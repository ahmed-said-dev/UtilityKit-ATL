using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Shared.Delegates;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;
using UtilityKit.Components.Atl.Infrastrcuture.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UtilityKit.Components.Atl.Infrastrcuture.Caching;
using UtilityKit.Components.Atl.Infrastrcuture.Migrations.Seed.DataSeeders;

namespace UtilityKit.Components.Atl.Infrastrcuture
{
    public class Startup : IProjectStartup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void Configure(IServiceProvider provider)
        {
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<CSVFileService>();
            services.AddScoped(serviceProvider => AddFileServiceResolver(serviceProvider));
            services.AddMemoryCache();

            #region --- Map Repository with the corresponsing interface
            services.AddScoped<ICacheManager, CacheManager>();
            services.AddScoped<IATLProjectRepository, ATLProjectRepository>();
            services.AddScoped<IDataSourceRepository, DataSourceRepository>();
            services.AddScoped<IMapRecordRepository, MapRecordRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork>(provider => provider.GetService<ATLDbContext>());
            #endregion
        }
        private ServiceResolver<IFileService> AddFileServiceResolver(IServiceProvider serviceProvider)
        {
            return key =>
            {
                switch (key)
                {
                    //case FileServiceNamesConst.CSV:
                    //    return serviceProvider.GetService<CSVFileService>();
                    default:
                        throw new KeyNotFoundException();
                }
            };
        }
    }
}