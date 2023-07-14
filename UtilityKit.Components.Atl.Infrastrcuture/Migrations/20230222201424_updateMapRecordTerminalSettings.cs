using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class updateMapRecordTerminalSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromTerminalId",
                table: "MapRecords");

            migrationBuilder.DropColumn(
                name: "ToTerminalId",
                table: "MapRecords");

            migrationBuilder.AddColumn<string>(
                name: "TerminalSettingsJson",
                table: "MapRecords",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TerminalSettingsJson",
                table: "MapRecords");

            migrationBuilder.AddColumn<string>(
                name: "FromTerminalId",
                table: "MapRecords",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToTerminalId",
                table: "MapRecords",
                type: "text",
                nullable: true);
        }
    }
}
