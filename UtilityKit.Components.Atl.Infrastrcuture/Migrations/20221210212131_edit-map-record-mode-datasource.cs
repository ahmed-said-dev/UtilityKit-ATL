using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class editmaprecordmodedatasource : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapRecords_DataSourceTypes_DataSourceTypeId",
                table: "MapRecords");

            migrationBuilder.DropIndex(
                name: "IX_MapRecords_DataSourceTypeId",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "DataSourceTypeId",
                table: "MapRecords");

            migrationBuilder.RenameColumn(
                name: "MapModeEnum",
                table: "MapRecords",
                newName: "MapMode");

            migrationBuilder.AddColumn<Guid>(
                name: "DataSourceId",
                table: "MapRecords",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_MapRecords_DataSourceId",
                table: "MapRecords",
                column: "DataSourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_MapRecords_DataSources_DataSourceId",
                table: "MapRecords",
                column: "DataSourceId",
                principalTable: "DataSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapRecords_DataSources_DataSourceId",
                table: "MapRecords");

            migrationBuilder.DropIndex(
                name: "IX_MapRecords_DataSourceId",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "DataSourceId",
                table: "MapRecords");

            migrationBuilder.RenameColumn(
                name: "MapMode",
                table: "MapRecords",
                newName: "MapModeEnum");

            migrationBuilder.AddColumn<int>(
                name: "DataSourceTypeId",
                table: "MapRecords",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MapRecords_DataSourceTypeId",
                table: "MapRecords",
                column: "DataSourceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MapRecords_DataSourceTypes_DataSourceTypeId",
                table: "MapRecords",
                column: "DataSourceTypeId",
                principalTable: "DataSourceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
