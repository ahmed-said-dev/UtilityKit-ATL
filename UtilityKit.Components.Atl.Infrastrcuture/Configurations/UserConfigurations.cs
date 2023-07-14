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
using G2Kit.Components.Identity.Core;
using System.Reflection.Emit;

namespace UtilityKit.Components.Atl.Infrastrcuture.Configurations
{
    internal class UserConfigurations : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
               .HasMany(a => a.ATLProjects)
               .WithOne(z => z.CreatedBy)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
