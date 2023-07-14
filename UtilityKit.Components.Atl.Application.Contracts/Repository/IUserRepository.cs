using G2Kit.Components.Identity.Core;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Application.Contracts.Repository
{
    public interface IUserRepository
    {
        User GetAdminUser();
    }
}
