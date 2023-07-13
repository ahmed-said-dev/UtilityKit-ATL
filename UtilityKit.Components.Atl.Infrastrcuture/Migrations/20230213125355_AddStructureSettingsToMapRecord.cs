using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class AddStructureSettingsToMapRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StructureSettingsJson",
                table: "MapRecords",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StructureSettingsJson",
                table: "MapRecords");
        }
    }
}
