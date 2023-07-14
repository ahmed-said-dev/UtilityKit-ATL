using UtilityKit.Components.Atl.Application.Shared.Interfaces;

namespace UtilityKit.Components.Atl.Api.WebApi.ServicesInstallers
{
    public class CorsServiceInstaller : IServiceInstaller
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public void InstallService(IServiceCollection services, IConfiguration configuration, List<IProjectStartup> projectStartups)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                       builder =>
                       {
                           builder
                           .AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                           /*
                               builder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(
                               configuration.GetSection("CorsOrigins").Get<List<string>>().ToArray());

                           */
                       });
            });
        }
    }
}
