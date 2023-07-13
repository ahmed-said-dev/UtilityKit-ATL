using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class ATLProjectReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectReportJson",
                table: "ATLProjects",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectReportJson",
                table: "ATLProjects");
        }
    }
}
