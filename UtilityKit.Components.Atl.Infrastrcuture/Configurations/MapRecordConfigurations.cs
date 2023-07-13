using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.AssemblySettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.CompletenessCriteria;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.Destination;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.SourceData;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.TerminalSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;

namespace UtilityKit.Components.Atl.Infrastrcuture.Configurations
{
    internal class MapRecordConfigurations : IEntityTypeConfiguration<MapRecord>
    {
        public void Configure(EntityTypeBuilder<MapRecord> builder)
        {

            builder.Property(e => e.FieldMapsJson).HasConversion(
           v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
           v => JsonConvert.DeserializeObject<List<FieldMap>>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<List<FieldMap>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()));


            builder.Property(e => e.ContainmentSettingsJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<ContainmentSettings>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<ContainmentSettings>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));


            builder.Property(e => e.StructureSettingsJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<StructureSettings>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<StructureSettings>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));


            builder.Property(e => e.AssemblySettingsJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<AssemblySettings>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<AssemblySettings>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));


            builder.Property(e => e.DestinationNetworkJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<Destination>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<Destination>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));

            builder.Property(e => e.SourceDataJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<SourceData>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<SourceData>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));

            builder.Property(e => e.TerminalSettingsJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<TerminalSettings>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<TerminalSettings>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));

            builder.Property(e => e.ZValueSettingsJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<ZValueSettings>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<ZValueSettings>(
            (c1, c2) => c1.Equals(c2),
            c => c.GetHashCode(),
            c => c));

            builder.Property(e => e.CompletenessCriteriaJson).HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            v => JsonConvert.DeserializeObject<List<CompletenessCriteria>>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
            new ValueComparer<List<CompletenessCriteria>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList()));
        }
    }
}
