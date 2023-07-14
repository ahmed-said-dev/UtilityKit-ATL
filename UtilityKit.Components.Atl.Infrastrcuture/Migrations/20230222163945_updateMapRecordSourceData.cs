using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class updateMapRecordSourceData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataSourceEntityName",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "DataSourceEntityType",
                table: "MapRecords");

            migrationBuilder.RenameColumn(
                name: "WhereClause",
                table: "MapRecords",
                newName: "SourceDataJson");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SourceDataJson",
                table: "MapRecords",
                newName: "WhereClause");

            migrationBuilder.AddColumn<string>(
                name: "DataSourceEntityName",
                table: "MapRecords",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DataSourceEntityType",
                table: "MapRecords",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
