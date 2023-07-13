using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Repository
{
    public interface IMapRecordRepository
    {
        Task<MapRecord> Add(MapRecord mapRecord, CancellationToken token);
        Task<List<MapRecord>> GetByAssetGroupId(Guid atlId, Guid? assetGroupId, CancellationToken token);
        Task<List<Guid>> GetDistinctAssetGroupIds(Guid atlId, CancellationToken token);
        Task<bool> IsMapRecordExist(Guid id, CancellationToken cancellationToken);
        Task<bool> DeleteMapRecord(Guid id, CancellationToken token);
        Task<MapRecord> GetMapRecordById(Guid id, CancellationToken token);
        MapRecord Update(MapRecord mapRecord);
        MapRecord GetConfigureThreeDForEdit(Guid mapRecordId);
        MapRecord GetConfigureTerminalForEdit(Guid mapRecordId);
        MapRecord GetFieldMapForEdit(Guid mapRecordId);
        Task<MapRecord> CloneMapRecord(Guid id, CancellationToken token);
        Task<bool> ActivationMapRecord(Guid id, CancellationToken token);
        MapRecord GetContainmentSettingsForEdit(Guid mapRecordId);
        Task<List<MapRecord>> GetAllMapRecordsForExecutionPlan(Guid atlId, CancellationToken token);
        Task<List<MapRecord>> GetAllMapRecordsByProjectId(Guid atlId, CancellationToken token);
        MapRecord UpdateMapRecordCompleteness(MapRecord mapRecord,ActionsEnum actionEnum);
        MapRecord SetCompletenessCriteria(MapRecord mapRecord);
        MapRecord DeleteMapRecordCompleteness(MapRecord mapRecord, ActionsEnum actionEnum);
    }
}