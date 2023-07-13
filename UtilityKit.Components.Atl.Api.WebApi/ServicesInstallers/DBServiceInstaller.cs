using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Infrastrcuture;
using Microsoft.EntityFrameworkCore;

namespace UtilityKit.Components.Atl.Api.WebApi.ServicesInstallers
{
    public class DBServiceInstaller : IServiceInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration, List<IProjectStartup> projectStartups)
        {
            services.AddDbContext<ATLDbContext>(options =>
                options.UseNpgsql(configuration.GetValue<string>("DBSettigs:ConnectionString")));
        }
    }
}
