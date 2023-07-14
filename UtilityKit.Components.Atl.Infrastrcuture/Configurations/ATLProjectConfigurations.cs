using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;

namespace UtilityKit.Components.Atl.Infrastrcuture.Configurations
{
    internal class ATLProjectConfigurations : IEntityTypeConfiguration<ATLProject>
    {
        public void Configure(EntityTypeBuilder<ATLProject> builder)
        {
            builder
                .HasMany(a => a.DataSources)
                .WithOne(z => z.ATLProject)
                .OnDelete(DeleteBehavior.Restrict);
            builder
                .HasMany(a => a.MapRecords)
                .WithOne(z => z.ATLProject)
                .OnDelete(DeleteBehavior.Restrict);
            builder
               .HasIndex(u => u.Name)
               .IsUnique();


            builder.Property(e => e.ProjectReportJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<List<ProjectReport>>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<List<ProjectReport>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()));

        }
    }
}
