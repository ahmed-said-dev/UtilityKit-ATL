using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class updateMapRecordDestination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetGroupId",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "AssetTableId",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "AssetTypeId",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "NetworkId",
                table: "MapRecords");

            migrationBuilder.RenameColumn(
                name: "AssetTypeName",
                table: "MapRecords",
                newName: "DestinationNetworkJson");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DestinationNetworkJson",
                table: "MapRecords",
                newName: "AssetTypeName");

            migrationBuilder.AddColumn<Guid>(
                name: "AssetGroupId",
                table: "MapRecords",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AssetTableId",
                table: "MapRecords",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AssetTypeId",
                table: "MapRecords",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "NetworkId",
                table: "MapRecords",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
