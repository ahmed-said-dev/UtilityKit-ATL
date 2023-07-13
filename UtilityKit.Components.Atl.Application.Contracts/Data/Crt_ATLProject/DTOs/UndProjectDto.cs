using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs
{
    public class AssetGroupDto
    {
        public Guid Id { get; set; }
        public Guid ATid { get; set; }
        public string Name { get; set; }
        public int Code { get; set; }
        public List<AssetTypeDto> AssetTypes { get; set; }
    }

    public class AssetTableDto
    {
        public Guid Id { get; set; }
        public Guid Nid { get; set; }
        public string Name { get; set; }
        public AssetTableTypeEnum TableTypeId { get; set; }
        public List<AssetGroupDto> assetGroups { get; set; }
    }

    public class AssetTypeDto
    {
        public Guid Id { get; set; }
        public Guid AGid { get; set; }
        public string Name { get; set; }
        public int Code { get; set; }
    }


    public class NetworkDto
    {
        public Guid Id { get; set; }
        public Guid Unid { get; set; }
        public bool Domain { get; set; }
        public string Name { get; set; }
        public List<AssetTableDto> AssetTables { get; set; }
    }

    public class UndProjectDto
    {
        public Guid ProjectId { get; set; }
        public Guid UtilityNetworkId { get; set; }
        public string Name { get; set; }
        public string ServiceAreaFeatureClassName { get; set; }
        public int ArcGISVersion { get; set; }
        public List<NetworkDto> Network { get; set; }
    }




}
