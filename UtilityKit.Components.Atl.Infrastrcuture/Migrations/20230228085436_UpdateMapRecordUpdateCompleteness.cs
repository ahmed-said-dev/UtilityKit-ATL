using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class UpdateMapRecordUpdateCompleteness : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completeness",
                table: "MapRecords");

            migrationBuilder.AddColumn<string>(
                name: "CompletenessCriteriaJson",
                table: "MapRecords",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletenessCriteriaJson",
                table: "MapRecords");

            migrationBuilder.AddColumn<double>(
                name: "Completeness",
                table: "MapRecords",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
