using UtilityKit.Components.Atl.Application.Shared.Interfaces;

namespace UtilityKit.Components.Atl.Api.WebApi.ServicesInstallers
{
    public class SwaggerServiceInstaller : IServiceInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration, List<IProjectStartup> projectStartups)
        {
            services.AddSwaggerGen();
        }
    }
}