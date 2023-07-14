
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations.Seed.DataSeeders

{
    public class UserCreator
    {
        private readonly ATLDbContext _aTLDbContext;

        public UserCreator(ATLDbContext aTLDbContext)
        {
            _aTLDbContext = aTLDbContext;
        }

        public void Create()
        {
            //if (_aTLDbContext.Database.EnsureCreated())
            //{
            //    var user = _aTLDbContext.Users.FirstOrDefault(u => u.Name == "admin");
            //    if (user == null)
            //    {
            //        _aTLDbContext.Users.Add(new User { Id = Guid.NewGuid(), Name = "admin" });
            //    }

            //    _aTLDbContext.SaveChanges();
            //}

        }

    }
}
