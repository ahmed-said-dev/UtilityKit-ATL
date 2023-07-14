using Microsoft.EntityFrameworkCore;
using System.Threading;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.CompletenessCriteria;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;
using UtilityKit.Components.Atl.Infrastrcuture.Constants;

namespace UtilityKit.Components.Atl.Infrastrcuture.Repositories
{
    public class MapRecordRepository : IMapRecordRepository
    {
        private readonly DbSet<MapRecord> _mapRecordContext;

        #region --- Constructor
        public MapRecordRepository(ATLDbContext context)
        {
            _mapRecordContext = context.Set<MapRecord>();
        }
        #endregion

        #region ---  Methods
        public async Task<MapRecord> Add(MapRecord mapRecord, CancellationToken token)
        {
            await _mapRecordContext.AddAsync(mapRecord, token);
            return mapRecord;
        }

        public async Task<MapRecord> CloneMapRecord(Guid id, CancellationToken token)
        {
            var mapRecord = await GetMapRecordById(id, token);
            var allMapRecord = await GetByAssetGroupId(mapRecord.ATLProjectId, mapRecord.DestinationNetworkJson.AssetGroupId, token);
            int maxOrder = 0;
            if (allMapRecord.Any())
                maxOrder = allMapRecord.Max(c => c.Order);
            mapRecord.Order = maxOrder + 1;
            mapRecord.Id = Guid.NewGuid();
            await _mapRecordContext.AddAsync(mapRecord, token);
            return mapRecord;
        }

        public async Task<bool> DeleteMapRecord(Guid id, CancellationToken token)
        {
            var mapRecord = await GetMapRecordById(id, token);
            UpdateOrderAfterDelete(mapRecord);
            var removeResponse = _mapRecordContext.Remove(mapRecord);
            return removeResponse is not null;
        }

        public async Task<bool> ActivationMapRecord(Guid id, CancellationToken token)
        {
            var mapRecord = await GetMapRecordById(id, token);
            mapRecord.IsActive = !mapRecord.IsActive;
            var activationResponse = _mapRecordContext.Update(mapRecord);
            return activationResponse is not null;
        }

        public async Task<List<MapRecord>> GetByAssetGroupId(Guid atlId, Guid? assetGroupId, CancellationToken token)
        {
            var mapRecords = await _mapRecordContext.AsNoTracking()
                .Where(mr => mr.ATLProjectId == atlId)
                .OrderBy(m => m.Order)
                .Include(mr => mr.DataSource)
                .ToListAsync();

            return mapRecords.Where(mr => mr.DestinationNetworkJson.AssetGroupId == assetGroupId).ToList();
        }

        public async Task<List<MapRecord>> GetAllMapRecordsForExecutionPlan(Guid atlId, CancellationToken token)
        {
            return
                await _mapRecordContext.AsNoTracking()
                .Where(mr => mr.ATLProjectId == atlId)
                .OrderBy(m => m.Order)
                .Include(mr => mr.DataSource)
                .ToListAsync();
        }

        public async Task<List<MapRecord>> GetAllMapRecordsByProjectId(Guid atlId, CancellationToken token)
        {
            return
                await _mapRecordContext.AsNoTracking()
                .Where(mr => mr.ATLProjectId == atlId)
                .OrderBy(m => m.Order)
                .ToListAsync();
        }

        public async Task<List<Guid>> GetDistinctAssetGroupIds(Guid atlId, CancellationToken token)
        {
            return await _mapRecordContext.AsNoTracking().Where(m => m.ATLProjectId == atlId).Select(o => o.DestinationNetworkJson.AssetGroupId).Distinct().ToListAsync();
        }

        public async Task<MapRecord> GetMapRecordById(Guid id, CancellationToken token)
        {
            var MapRecord = await _mapRecordContext.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync(token);
            return MapRecord;
        }

        public Task<bool> IsMapRecordExist(Guid id, CancellationToken cancellationToken)
        {
            return _mapRecordContext.AsNoTracking().AnyAsync(x => x.Id == id, cancellationToken);
        }

        public MapRecord Update(MapRecord mapRecord)
        {
            _mapRecordContext.Update(mapRecord);
            return mapRecord;
        }

        public MapRecord GetConfigureThreeDForEdit(Guid mapRecordId)
        {
            return _mapRecordContext.AsNoTracking().Where(m => m.Id == mapRecordId).FirstOrDefault();
        }

        public MapRecord GetContainmentSettingsForEdit(Guid mapRecordId)
        {
            return _mapRecordContext.AsNoTracking().Where(m => m.Id == mapRecordId).FirstOrDefault();
        }

        public MapRecord GetConfigureTerminalForEdit(Guid mapRecordId)
        {
            return _mapRecordContext.AsNoTracking().Where(m => m.Id == mapRecordId).FirstOrDefault();
        }

        public MapRecord GetFieldMapForEdit(Guid mapRecordId)
        {
            return _mapRecordContext.AsNoTracking().Where(m => m.Id == mapRecordId).FirstOrDefault();
        }

        private void UpdateOrderAfterDelete(MapRecord mapRecord)
        {
            var mapRecords = _mapRecordContext
                                .AsNoTracking()
                                .Where(mr => mr.ATLProjectId == mapRecord.ATLProjectId && mapRecord.Id != mr.Id)
                                .OrderBy(m => m.Order)
                                .ToList();

            var currentList = mapRecords.Where(mr => mr.DestinationNetworkJson.AssetGroupId == mapRecord.DestinationNetworkJson.AssetGroupId).ToList();

            var newOrder = 1;
            foreach (var item in currentList)
            {
                item.Order = newOrder;
                newOrder++;
                _mapRecordContext.Update(item);
            }
        }

        public MapRecord UpdateMapRecordCompleteness(MapRecord mapRecord, ActionsEnum actionName)
        {

            switch (mapRecord.DestinationNetworkJson.AssetTableType)
            {
                case AssetTableTypeEnum.DomainDevice:

                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";

                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";

                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainLine:

                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";

                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";

                            break;
                        case ActionsEnum.AddTerminalSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";

                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainAssembly:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddAssemblySetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainJunction:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainEdgeObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainJunctionObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainSubnetLine:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;


                case AssetTableTypeEnum.StructureLine:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddContainmentSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureJunction:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddStructureAttachmentSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureBoundry:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                        case ActionsEnum.AddContainmentSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureEdgeObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureJunctionObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value += 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = "";
                            break;
                    }
                    break;

            }
            return mapRecord;
        }

        public MapRecord SetCompletenessCriteria(MapRecord mapRecord)
        {

            switch (mapRecord.DestinationNetworkJson.AssetTableType)
            {
                case AssetTableTypeEnum.DomainDevice:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0 ,ActionName =ActionsEnum.AddConfigureThreeD} ,
                    });
                    break;


                case AssetTableTypeEnum.DomainLine:

                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0 ,ActionName =ActionsEnum.AddFields} ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0,ActionName =ActionsEnum.AddConfigureThreeD } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.TERMINAL_SETTING_MISSING, Value = 0 ,ActionName =ActionsEnum.AddTerminalSetting} ,
                    });
                    break;

                case AssetTableTypeEnum.DomainAssembly:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0 , ActionName = ActionsEnum.AddConfigureThreeD} ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.ASSEMBLY_SETTING_MISSING, Value = 0 ,ActionName = ActionsEnum.AddAssemblySetting } ,
                    });
                    break;

                case AssetTableTypeEnum.DomainJunction:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0,ActionName =ActionsEnum.AddConfigureThreeD } ,
                    });
                    break;

                case AssetTableTypeEnum.DomainEdgeObject:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0 ,ActionName =ActionsEnum.AddFields} ,
                    });
                    break;

                case AssetTableTypeEnum.DomainJunctionObject:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                    });
                    break;

                case AssetTableTypeEnum.DomainSubnetLine:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0,ActionName =ActionsEnum.AddConfigureThreeD } ,
                    });
                    break;

                case AssetTableTypeEnum.StructureLine:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0,ActionName =ActionsEnum.AddConfigureThreeD } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONTAINMENT_SETTING_MISSING, Value = 0 ,ActionName =ActionsEnum.AddContainmentSetting} ,
                    });
                    break;

                case AssetTableTypeEnum.StructureJunction:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0,ActionName =ActionsEnum.AddConfigureThreeD } ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.STRUCTURE_ATTACHMENT_SETTING_MISSING, Value = 0,ActionName =ActionsEnum.AddStructureAttachmentSetting } ,
                    });
                    break;

                case AssetTableTypeEnum.StructureBoundry:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0 ,ActionName =ActionsEnum.AddFields} ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING, Value = 0 ,ActionName =ActionsEnum.AddConfigureThreeD} ,
                        new CompletenessCriteria { Comment = CompletenessCriteriaComments.CONTAINMENT_SETTING_MISSING, Value = 0 ,ActionName =ActionsEnum.AddContainmentSetting} ,
                    });
                    break;

                case AssetTableTypeEnum.StructureEdgeObject:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                    });
                    break;

                case AssetTableTypeEnum.StructureJunctionObject:
                    mapRecord.CompletenessCriteriaJson.AddRange(new List<CompletenessCriteria>(){
                        new CompletenessCriteria { Comment =CompletenessCriteriaComments.FIELD_MAP_MISSING, Value = 0,ActionName =ActionsEnum.AddFields } ,
                    });
                    break;

            }
            return mapRecord;
        }

        public MapRecord DeleteMapRecordCompleteness(MapRecord mapRecord, ActionsEnum actionName)
        {
            switch (mapRecord.DestinationNetworkJson.AssetTableType)
            {
                case AssetTableTypeEnum.DomainDevice:

                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;

                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;

                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainLine:

                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;

                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;

                            break;
                        case ActionsEnum.AddTerminalSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.TERMINAL_SETTING_MISSING;

                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainAssembly:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;
                            break;
                        case ActionsEnum.AddAssemblySetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.ASSEMBLY_SETTING_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainJunction:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainEdgeObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainJunctionObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.DomainSubnetLine:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 50;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureLine:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;
                            break;
                        case ActionsEnum.AddContainmentSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONTAINMENT_SETTING_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureJunction:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;
                            break;
                        case ActionsEnum.AddStructureAttachmentSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.STRUCTURE_ATTACHMENT_SETTING_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureBoundry:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 40;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                        case ActionsEnum.AddConfigureThreeD:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONFIGURE_THREE_D_MISSING;
                            break;
                        case ActionsEnum.AddContainmentSetting:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 30;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.CONTAINMENT_SETTING_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureEdgeObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                    }
                    break;

                case AssetTableTypeEnum.StructureJunctionObject:
                    switch (actionName)
                    {
                        case ActionsEnum.AddFields:
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Value -= 100;
                            mapRecord.CompletenessCriteriaJson.First(cc => cc.ActionName == actionName).Comment = CompletenessCriteriaComments.FIELD_MAP_MISSING;
                            break;
                    }
                    break;

            }
            return mapRecord;
        }

        #endregion

    }
}