using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class ConfigureThreeDTypeToMapRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConfigureThreeDType",
                table: "MapRecords",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfigureThreeDType",
                table: "MapRecords");
        }
    }
}
