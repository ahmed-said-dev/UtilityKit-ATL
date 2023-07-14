using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class editmaprecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WherClause",
                table: "MapRecords",
                newName: "WhereClause");

            migrationBuilder.RenameColumn(
                name: "SourceEntityType",
                table: "MapRecords",
                newName: "DataSourceEntityType");

            migrationBuilder.RenameColumn(
                name: "EntityName",
                table: "MapRecords",
                newName: "DataSourceEntityName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WhereClause",
                table: "MapRecords",
                newName: "WherClause");

            migrationBuilder.RenameColumn(
                name: "DataSourceEntityType",
                table: "MapRecords",
                newName: "SourceEntityType");

            migrationBuilder.RenameColumn(
                name: "DataSourceEntityName",
                table: "MapRecords",
                newName: "EntityName");
        }
    }
}
