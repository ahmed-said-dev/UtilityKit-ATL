using G2Kit.Components.Identity.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Infrastrcuture.Caching;

namespace UtilityKit.Components.Atl.Infrastrcuture.Repositories
{
    public class CacheManager : ICacheManager
    {
        private readonly IUserRepository _userRepository;
        private readonly IMemoryCache _cache;
        private const string userCacheKey = "adminUser";

        #region --- Constructor
        public CacheManager(IUserRepository userRepository, IMemoryCache cache)
        {
            _userRepository = userRepository;
            _cache = cache;
        }
        #endregion

        #region --- Methods
        public User GetAdminUserFromCache()
        {
            if (_cache.TryGetValue(userCacheKey, out User user))
            {
                return user;
            }
            else
            {
                user = _userRepository.GetAdminUser();
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromSeconds(60))
                        .SetPriority(CacheItemPriority.Normal);
                _cache.Set(userCacheKey, user, cacheEntryOptions);
                return user;
            }
        }
        #endregion

    }
}
