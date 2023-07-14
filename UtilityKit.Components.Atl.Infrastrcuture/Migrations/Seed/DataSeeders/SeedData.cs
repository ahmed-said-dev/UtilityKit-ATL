using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations.Seed.DataSeeders
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ATLDbContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ATLDbContext>>()))
            {
                if (context.Users.Any())
                {
                    return;   // DB has been seeded
                }

                context.Users.AddRange(
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Name = "admin"
                    }
                );

                if (context.DataSourceTypes.Any())
                {
                    return;   // DB has been seeded
                }

                context.DataSourceTypes.AddRange(
                    new DataSourceType
                    {
                        Id = 1,
                        Name = "Xml"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}

