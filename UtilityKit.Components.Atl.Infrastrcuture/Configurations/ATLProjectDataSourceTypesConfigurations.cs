using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace UtilityKit.Components.Atl.Infrastrcuture.Configurations
{
    internal class ATLProjectDataSourceTypesConfigurations : IEntityTypeConfiguration<DataSource>
    {
        public void Configure(EntityTypeBuilder<DataSource> builder)
        {
            builder.Property(e => e.DataSourceSchemaJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<Schema>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<Schema>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));
        }
    }
}
