using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;

namespace UtilityKit.Components.Atl.Infrastrcuture.Configurations
{
    internal class DataSourceTypeConfigurations : IEntityTypeConfiguration<DataSourceType>
    {
        public void Configure(EntityTypeBuilder<DataSourceType> builder)
        {
            builder
                .HasMany(a => a.DataSources)
                .WithOne(z => z.DataSourceType)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
