//using UtilityKit.Components.Atl.Application.Contracts.Repository;
//using UtilityKit.Components.Atl.Domain.BusinessModel.AssetDefinition;
//using UtilityKit.Components.Atl.Domain.BusinessModel.Configuration;
//using UtilityKit.Components.Atl.Domain.BusinessModel.Network;
//using UtilityKit.Components.Atl.Domain.RepoModel;
//using Microsoft.EntityFrameworkCore;
//using Newtonsoft.Json.Linq;
//using System.Linq.Expressions;
//using System.Threading;

//namespace UtilityKit.Components.Atl.Infrastrcuture.Repositories;
//public class AssetTableRepository : IAssetTableRepository
//{
//    #region --- Variables
//    private readonly DbSet<Tbl_AssetTable> _assetTables;
//    private readonly DbSet<Tbl_AssetGroup> _assetGroups;
//    private readonly DbSet<Tbl_AssetType> _assetTypes;
//    private readonly DbSet<Tbl_NetworkAttribute> _networkAttributes;
//    #endregion

//    #region --- Constructor
//    public AssetTableRepository(ATLDbContext context)
//    {
//        _assetTables = context.Set<Tbl_AssetTable>();
//        _assetGroups = context.Set<Tbl_AssetGroup>();
//        _assetTypes = context.Set<Tbl_AssetType>();
//        _networkAttributes = context.Set<Tbl_NetworkAttribute>();
//    }
//    #endregion

//    #region --- IAssetTableRepository Implementatioon

//    #region *** 1. Asset Table Methods
//    #region --- isExist AssetTable
//    public Task<bool> IsExist(Guid id, CancellationToken cancellationToken)
//        => _assetTables.AsNoTracking().AnyAsync(x => x.Id == id, cancellationToken);
//    #endregion
//    #region --- Get AssetTable By ID
//    public async Task<AssetTable> Get(Guid id, Expression<Func<AssetTable, object>> includes, CancellationToken cancellationToken)
//    {
//        var assetTableById = await _assetTables.AsNoTracking()
//               .Include(x => x.AssetGroups)
//               .ThenInclude(x => x.AssetTypes)
//               .ThenInclude(x => x.NetworkCategory)
//               .Include(x => x.Fields)
//               .Where(x => x.Id == id)
//               .FirstOrDefaultAsync(cancellationToken);

//        return new AssetTable().MapToBusinessObject(assetTableById);
//    }
//    #endregion
//    #region --- Get AssetTable Details By ID 
//    public async Task<AssetTable> GetDetails(Guid id, CancellationToken cancellationToken)
//    {
//        var assetTableDetails = await _assetTables.AsNoTracking()
//             .Include(x => x.AssetGroups)
//             .ThenInclude(x => x.AssetTypes)
//             .ThenInclude(x => x.NetworkCategory)
//             .Include(x => x.Fields)
//             .Where(x => x.Id == id)
//             .FirstOrDefaultAsync(cancellationToken);

//        return new AssetTable().MapToBusinessObject(assetTableDetails);
//    }
//    #endregion
//    #region --- Get AssetTable Details By UtilityNetwork ID
//    public async Task<List<AssetTable>> GetDetailsByUtilityNetworkId(Guid utilityNetworkId, CancellationToken cancellationToken)
//    {
//        var assetTableByUtilityNetwork = await _assetTables.AsNoTracking().Where(x => x.Network.UtilityNetworkId == utilityNetworkId)
//            .Include(x => x.AssetGroups)
//            .ThenInclude(x => x.AssetTypes)
//            .ThenInclude(x => x.TerminalConfiguration)
//            .ToListAsync(cancellationToken);
//        return new AssetTable().MapToBusinessList(assetTableByUtilityNetwork);
//    }
//    #endregion

//    #region *** 2. Asset Group Methods
//    #region --- isExist AssetGroup
//    public Task<bool> IsAssetGroupExist(Guid id, CancellationToken cancellationToken)
//    => _assetGroups.AsNoTracking().AnyAsync(x => x.Id == id, cancellationToken);
//    #endregion
//    #region --- GetAll AssetGroups
//    public async Task<List<AssetGroup>> GetAllAssetGroups(Guid assetTableId, CancellationToken token)
//    {
//        var assetGroups = await _assetGroups.AsNoTracking().Where(x => x.AssetTableId == assetTableId).ToListAsync(token);
//        return new AssetGroup().MapToBusinessList(assetGroups);
//    }
//    #endregion
//    #region --- Get AssetGroup
//    public async Task<AssetGroup> GetAssetGroup(Guid id, CancellationToken token)
//    {
//        var assetGroup = await _assetGroups.AsNoTracking().Include(x => x.AssetTable).Where(x => x.Id == id).FirstOrDefaultAsync(token);
//        return new AssetGroup().MapToBusinessObject(assetGroup);
//    }
//    #endregion
//    #region --- Delete AssetGroup
//    public async Task<bool> DeleteAssetGroup(Guid id, CancellationToken token)
//    {
//        var assetGroup = await GetAssetGroup(id, token);
//        var removeResponse = _assetGroups.Remove(assetGroup.MapToRepo());
//        return removeResponse is not null;
//    }
//    #endregion
//    #region --- Add AssetGroup
//    public async Task<AssetGroup> AddAssetGroup(AssetGroup assetGroup, CancellationToken token)
//    {
//        Tbl_AssetGroup repoModel = assetGroup.MapToRepo();
//        await _assetGroups.AddAsync(repoModel, token);
//        assetGroup.Id = repoModel.Id;
//        return assetGroup;
//    }
//    #endregion
//    #region --- Update AssetGroup
//    public AssetGroup UpdateAssetGroup(AssetGroup assetGroup, CancellationToken token)
//    {
//        _assetGroups.Update(assetGroup.MapToRepo());
//        return assetGroup;
//    }
//    #endregion
//    public async Task<List<AssetGroup>> GetAssetGroupsByUtilityNetworkId(Guid utilityNetworkId, CancellationToken token)
//    {
//        var assetGroups = await _assetGroups.AsNoTracking().AsSplitQuery().Include(x => x.AssetTypes).ThenInclude(x => x.NetworkCategory).Include(x=>x.AssetTable).Where(x => x.AssetTable.Network.UtilityNetworkId == utilityNetworkId).ToListAsync(token);
//        return new AssetGroup().MapToBusinessList(assetGroups);
//    }

//    #endregion

//    #region *** 3. Asset Type Methods
//    #region --- isExist AssetType
//    public Task<bool> IsAssetTypeExist(Guid id, CancellationToken cancellationToken)
//        => _assetTypes.AsNoTracking().AnyAsync(x => x.Id == id, cancellationToken);
//    #endregion
//    #region --- Get AssetType
//    public async Task<AssetType> GetAssetType(Guid id, CancellationToken token)
//    {
//        var assetType = await _assetTypes.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync(token);
//        return new AssetType().MapToBusinessObject(assetType);
//    }

//    public async Task<AssetType> GetFullAssetType(Guid id, CancellationToken token)
//    {
//        var assetType = await _assetTypes.AsNoTracking().AsSplitQuery()
//            .Include(x => x.AssetGroup)
//                .ThenInclude(x => x.AssetTable)
//            .Include(x => x.NetworkCategory)
//            .Include(x => x.TerminalConfiguration)
//            .Where(x => x.Id == id).FirstOrDefaultAsync(token);
//        return new AssetType().MapToFullBusinessObject(assetType);
//    }
//    #endregion
//    #region --- Delete AssetType
//    public async Task<bool> DeleteAssetType(Guid id, CancellationToken token)
//    {
//        var assetTypeToDelete = await _assetTypes.Where(c => c.Id == id).FirstOrDefaultAsync(token);
//        if (assetTypeToDelete != null)
//        {
//            var removeResponse = _assetTypes.Remove(assetTypeToDelete);
//            return removeResponse is not null;
//        }
//        return false;
//    }
//    #endregion

//    #region --- Add AssetType
//    public async Task<AssetType> AddAssetType(AssetType assetType, CancellationToken token)
//    {
//        Tbl_AssetType repoModel = assetType.MapToRepo();
//        await _assetTypes.AddAsync(repoModel, token);
//        assetType.Id = repoModel.Id;





//        return assetType;
//    }
//    #endregion

//    #region --- Update AssetType
//    public AssetType UpdateAssetType(AssetType assetType, CancellationToken token)
//    {
//        _assetTypes.Update(assetType.MapToRepo());
//        return assetType;
//    }
//    #endregion

//    #endregion
//    #endregion
//    #endregion
//}