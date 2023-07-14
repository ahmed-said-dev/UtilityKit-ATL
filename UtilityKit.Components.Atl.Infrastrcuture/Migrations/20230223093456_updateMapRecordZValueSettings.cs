using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class updateMapRecordZValueSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfigureThreeDType",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "ZConditionsJson",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "ZDefaultValue",
                table: "MapRecords");

            migrationBuilder.RenameColumn(
                name: "ZFieldName",
                table: "MapRecords",
                newName: "ZValueSettingsJson");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ZValueSettingsJson",
                table: "MapRecords",
                newName: "ZFieldName");

            migrationBuilder.AddColumn<int>(
                name: "ConfigureThreeDType",
                table: "MapRecords",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZConditionsJson",
                table: "MapRecords",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZDefaultValue",
                table: "MapRecords",
                type: "text",
                nullable: true);
        }
    }
}
