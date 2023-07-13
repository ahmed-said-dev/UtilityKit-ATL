using G2Kit.Components.Identity.Core;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Infrastrcuture.Caching
{
    public interface ICacheManager
    {
        User GetAdminUserFromCache();
    }
}