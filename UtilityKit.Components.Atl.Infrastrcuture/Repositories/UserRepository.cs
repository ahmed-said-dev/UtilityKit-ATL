using G2Kit.Components.Identity.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Infrastrcuture.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DbSet<User> _userContext;

        #region --- Constructor
        public UserRepository(ATLDbContext context)
        {
            _userContext = context.Set<User>();
        }
        #endregion

        #region --- Methods
        public User GetAdminUser()
        {
            var user = _userContext.FirstOrDefault(u => u.Name.ToLower() == "admin");
            return user;
        }
        #endregion

    }
}
