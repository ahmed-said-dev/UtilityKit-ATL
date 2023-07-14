using UtilityKit.Components.Atl.Application.Shared.Extensions;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Application.Shared.Middlewares;
using UtilityKit.Components.Atl.Infrastrcuture;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using UtilityKit.Components.Atl.Infrastrcuture.Migrations.Seed.DataSeeders;

var builder = WebApplication.CreateBuilder(args);

ConfigureLogs(builder);

var _assembliesStartup = new List<IProjectStartup>
            {
                new UtilityKit.Components.Atl.Application.Startup(builder.Configuration),
                new UtilityKit.Components.Atl.Infrastrcuture.Startup(builder.Configuration)
            };

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

ConfigureServices();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}

await ConfigurePipeLine();



void ConfigureServices()
{
    builder.Services.InstallServices(builder.Configuration, Assembly.GetExecutingAssembly(), _assembliesStartup);
    ConfigureOutServices();
}

void ConfigureOutServices()
=> _assembliesStartup.ForEach(x => x.ConfigureServices(builder.Services));

async Task ConfigurePipeLine()
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        //await builder.Services.BuildServiceProvider().GetService<RepoContext>().Database.MigrateAsync();
    }

    //auto update database
    // await builder.Services.BuildServiceProvider().GetService<ATLDbContext>().Database.MigrateAsync();

    _assembliesStartup.ForEach(x => x.Configure(app.Services));

    app.UseMiddleware<ErrorHandlingMiddleware>();


    app.UseCors(MyAllowSpecificOrigins);

    app.UseHttpsRedirection();

    app.UseRouting();

    app.UseAuthorization();
    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

    app.MapControllers();

    app.Run();
}

void ConfigureLogs(WebApplicationBuilder builder)
{
    //builder.Host
    //.UseSerilog((hostingContext, loggerConfig) =>
    //{
    //    loggerConfig
    //    .ReadFrom.Configuration(hostingContext.Configuration)
    //    .Enrich.FromLogContext()
    //    .Enrich.WithEnvironmentName()
    //    .Enrich.WithEnvironmentUserName()
    //    .Enrich.WithProcessName()
    //    .Enrich.WithProcessId()
    //    .Enrich.WithThreadName()
    //    .Enrich.WithThreadId()
    //    .Enrich.WithMemoryUsage()
    //    .Enrich.WithExceptionDetails();
    //});
}