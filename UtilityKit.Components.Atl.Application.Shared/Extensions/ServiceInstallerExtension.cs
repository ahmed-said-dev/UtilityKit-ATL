using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace UtilityKit.Components.Atl.Application.Shared.Extensions
{
    public static class ServiceInstallerExtension
    {
        public static void InstallServices(this IServiceCollection services, IConfiguration configuration, Assembly assembly, List<IProjectStartup> projectStartups)
        {
            var installers = assembly.ExportedTypes.Where(x =>
              typeof(IServiceInstaller).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract).Select(
                Activator.CreateInstance).Cast<IServiceInstaller>().ToList();
            installers.ForEach(installer => installer.InstallService(services, configuration, projectStartups));
        }
    }
}