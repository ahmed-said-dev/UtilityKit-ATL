using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:uuid-ossp", ",,");

            migrationBuilder.CreateTable(
                name: "DataSourceTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSourceTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ATLProjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    UndProjectId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ModifiedData = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatorUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModifiedUserId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ATLProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ATLProjects_Users_CreatorUserId",
                        column: x => x.CreatorUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ATLProjects_Users_LastModifiedUserId",
                        column: x => x.LastModifiedUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DataSources",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DataSourceSchemaJson = table.Column<string>(type: "text", nullable: false),
                    TablesCount = table.Column<int>(type: "integer", nullable: false),
                    FeatureClassesCount = table.Column<int>(type: "integer", nullable: false),
                    ATLProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    DataSourceTypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSources_ATLProjects_ATLProjectId",
                        column: x => x.ATLProjectId,
                        principalTable: "ATLProjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DataSources_DataSourceTypes_DataSourceTypeId",
                        column: x => x.DataSourceTypeId,
                        principalTable: "DataSourceTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MapRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NetworkId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssetTableId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssetGroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssetTypeId = table.Column<Guid>(type: "uuid", nullable: false),
                    ATLProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    DataSourceTypeId = table.Column<int>(type: "integer", nullable: false),
                    SourceEntityType = table.Column<int>(type: "integer", nullable: false),
                    EntityName = table.Column<string>(type: "text", nullable: false),
                    WherClause = table.Column<string>(type: "text", nullable: false),
                    FromTerminalId = table.Column<Guid>(type: "uuid", nullable: false),
                    ToTerminalId = table.Column<Guid>(type: "uuid", nullable: false),
                    ZFieldName = table.Column<string>(type: "text", nullable: false),
                    ZDefaultValue = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    MapModeEnum = table.Column<int>(type: "integer", nullable: false),
                    ZConditionsJson = table.Column<string>(type: "text", nullable: false),
                    FieldMapsJson = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapRecords_ATLProjects_ATLProjectId",
                        column: x => x.ATLProjectId,
                        principalTable: "ATLProjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MapRecords_DataSourceTypes_DataSourceTypeId",
                        column: x => x.DataSourceTypeId,
                        principalTable: "DataSourceTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ATLProjects_CreatorUserId",
                table: "ATLProjects",
                column: "CreatorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ATLProjects_LastModifiedUserId",
                table: "ATLProjects",
                column: "LastModifiedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSources_ATLProjectId",
                table: "DataSources",
                column: "ATLProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSources_DataSourceTypeId",
                table: "DataSources",
                column: "DataSourceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MapRecords_ATLProjectId",
                table: "MapRecords",
                column: "ATLProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_MapRecords_DataSourceTypeId",
                table: "MapRecords",
                column: "DataSourceTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataSources");

            migrationBuilder.DropTable(
                name: "MapRecords");

            migrationBuilder.DropTable(
                name: "ATLProjects");

            migrationBuilder.DropTable(
                name: "DataSourceTypes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
