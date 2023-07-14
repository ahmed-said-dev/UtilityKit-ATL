using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Infrastrcuture.Constants;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Reflection.Emit;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using System.Diagnostics;
using G2Kit.Components.Identity.Core;
using System.Reflection.Metadata;
using UtilityKit.Components.Atl.Infrastrcuture.Configurations;

namespace UtilityKit.Components.Atl.Infrastrcuture;
public class ATLDbContext : DbContext, IUnitOfWork
{
    #region --- Constructor
    public ATLDbContext(DbContextOptions<ATLDbContext> options) : base(options) { }
    #endregion

    #region --- Methods
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresExtension(PostgresExtensions.UUID_AUTOGENERATE);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder //TODO : Should to delete this before go to production 
         .LogTo(message => Debug.WriteLine(message))
         .EnableDetailedErrors();
    }
    #endregion

    #region --- Register Tables
    public DbSet<ATLProject> ATLProjects { get; set; }
    public DbSet<DataSource> DataSources { get; set; }
    public DbSet<DataSourceType> DataSourceTypes { get; set; }
    public DbSet<MapRecord> MapRecords { get; set; }
    public DbSet<User> Users { get; set; }
    #endregion
}