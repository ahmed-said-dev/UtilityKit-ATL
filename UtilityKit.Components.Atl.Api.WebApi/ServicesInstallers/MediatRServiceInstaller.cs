using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using MediatR;

namespace UtilityKit.Components.Atl.Api.WebApi.ServicesInstallers
{
    public class MediatRServiceInstaller : IServiceInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration, List<IProjectStartup> projectStartups)
        {
            services.AddMediatR(projectStartups.Select(startup => startup.GetType().Assembly).ToArray());
        }
    }
}