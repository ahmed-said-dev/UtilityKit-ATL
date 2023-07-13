using Microsoft.Extensions.DependencyInjection;

namespace UtilityKit.Components.Atl.Application.Shared.Interfaces
{
    public interface IProjectStartup
    {
        void ConfigureServices(IServiceCollection services);
        void Configure(IServiceProvider provider);
    }
}