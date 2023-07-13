using UtilityKit.Components.Atl.Application.Shared.Interfaces;
namespace UtilityKit.Components.Atl.Api.WebApi.ServicesInstallers;
public class ControllerServiceInstaller : IServiceInstaller
{
    public void InstallService(IServiceCollection services, IConfiguration configuration, List<IProjectStartup> projectStartups)
    {
        services.AddControllers().AddNewtonsoftJson();
        services.AddEndpointsApiExplorer();
    }
}