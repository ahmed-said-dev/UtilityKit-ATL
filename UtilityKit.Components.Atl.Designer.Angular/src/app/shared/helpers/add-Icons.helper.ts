import {
  AssetTableTypeEnum,
  Network,
} from 'src/app/pages/models/atl-project-model';

export function addIcons(networks: Network[]): Network[] {
  networks.forEach((network) => {
    network.assetTables.forEach((assetTable) => {
      switch (assetTable.tableTypeId) {
        case AssetTableTypeEnum.DomainLine:
        case AssetTableTypeEnum.StructureLine:
          assetTable.icon = './assets/media/icons/duotune/esri/line.svg';
          break;

        case AssetTableTypeEnum.DomainJunction:
        case AssetTableTypeEnum.StructureJunction:
          assetTable.icon = './assets/media/icons/duotune/esri/Junction.svg';
          break;

        case AssetTableTypeEnum.DomainEdgeObject:
        case AssetTableTypeEnum.StructureEdgeObject:
          assetTable.icon = './assets/media/icons/duotune/esri/EdgeObject.svg';
          break;

        case AssetTableTypeEnum.DomainJunctionObject:
        case AssetTableTypeEnum.StructureJunctionObject:
          assetTable.icon =
            './assets/media/icons/duotune/esri/JunctionObject.svg';
          break;

        case AssetTableTypeEnum.DomainAssembly:
          assetTable.icon = './assets/media/icons/duotune/esri/Assembly.svg';
          break;

        case AssetTableTypeEnum.StructureBoundry:
          assetTable.icon = './assets/media/icons/duotune/esri/Boundry.svg';
          break;

        case AssetTableTypeEnum.DomainDevice:
          assetTable.icon = './assets/media/icons/duotune/esri/Device.svg';
          break;

        case AssetTableTypeEnum.DomainSubnetLine:
          assetTable.icon = './assets/media/icons/duotune/esri/SubnetLine.svg';
          break;
      }
    });
  });

  return networks;
}
