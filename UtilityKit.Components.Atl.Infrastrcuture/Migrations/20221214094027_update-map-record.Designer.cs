﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using UtilityKit.Components.Atl.Infrastrcuture;

#nullable disable

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations
{
    [DbContext(typeof(ATLDbContext))]
    [Migration("20221214094027_update-map-record")]
    partial class updatemaprecord
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "uuid-ossp");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.ATLProject", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CreatorUserId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("LastModifiedUserId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ModifiedData")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("UndProjectId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("CreatorUserId");

                    b.HasIndex("LastModifiedUserId");

                    b.ToTable("ATLProjects");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSource", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ATLProjectId")
                        .HasColumnType("uuid");

                    b.Property<string>("DataSourceSchemaJson")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("DataSourceTypeId")
                        .HasColumnType("integer");

                    b.Property<int>("FeatureClassesCount")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("TablesCount")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ATLProjectId");

                    b.HasIndex("DataSourceTypeId");

                    b.ToTable("DataSources");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSourceType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("DataSourceTypes");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.MapRecord", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ATLProjectId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("AssetGroupId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("AssetTableId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("AssetTypeId")
                        .HasColumnType("uuid");

                    b.Property<string>("AssetTypeName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DataSourceEntityName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("DataSourceEntityType")
                        .HasColumnType("integer");

                    b.Property<Guid>("DataSourceId")
                        .HasColumnType("uuid");

                    b.Property<string>("FieldMapsJson")
                        .HasColumnType("text");

                    b.Property<Guid?>("FromTerminalId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<int>("MapMode")
                        .HasColumnType("integer");

                    b.Property<Guid>("NetworkId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ToTerminalId")
                        .HasColumnType("uuid");

                    b.Property<string>("WhereClause")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ZConditionsJson")
                        .HasColumnType("text");

                    b.Property<string>("ZDefaultValue")
                        .HasColumnType("text");

                    b.Property<string>("ZFieldName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ATLProjectId");

                    b.HasIndex("DataSourceId");

                    b.ToTable("MapRecords");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.ATLProject", b =>
                {
                    b.HasOne("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.User", "CreatedBy")
                        .WithMany("ATLProjects")
                        .HasForeignKey("CreatorUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedUserId");

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSource", b =>
                {
                    b.HasOne("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.ATLProject", "ATLProject")
                        .WithMany("DataSources")
                        .HasForeignKey("ATLProjectId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSourceType", "DataSourceType")
                        .WithMany("DataSources")
                        .HasForeignKey("DataSourceTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ATLProject");

                    b.Navigation("DataSourceType");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.MapRecord", b =>
                {
                    b.HasOne("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.ATLProject", "ATLProject")
                        .WithMany("MapRecords")
                        .HasForeignKey("ATLProjectId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSource", "DataSource")
                        .WithMany("MapRecords")
                        .HasForeignKey("DataSourceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ATLProject");

                    b.Navigation("DataSource");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.ATLProject", b =>
                {
                    b.Navigation("DataSources");

                    b.Navigation("MapRecords");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSource", b =>
                {
                    b.Navigation("MapRecords");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.DataSourceType", b =>
                {
                    b.Navigation("DataSources");
                });

            modelBuilder.Entity("UtilityKit.Components.Atl.Domain.BusinessModel.Entities.User", b =>
                {
                    b.Navigation("ATLProjects");
                });
#pragma warning restore 612, 618
        }
    }
}
