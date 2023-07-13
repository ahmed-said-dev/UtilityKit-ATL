using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.AssemblySettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.CompletenessCriteria;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ContainmentSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.Destination;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.FieldMapping;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.SourceData;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.TerminalSettings;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.ZContition;

namespace UtilityKit.Components.Atl.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SchemaDto, Schema>().ReverseMap();
            CreateMap<DataSourceDto, DataSource>().ReverseMap();
            CreateMap<TableDto, Table>().ReverseMap();
            CreateMap<FeatureClassDto, FeatureClass>().ReverseMap();
            CreateMap<FieldDto, Field>().ReverseMap();
            CreateMap<MapRecordDto, MapRecord>().ReverseMap();
            CreateMap<GetMapRecordDto, MapRecord>().ReverseMap();
            CreateMap<ATLProjectDto, ATLProject>().ReverseMap();
            CreateMap<FieldMapDto, FieldMap>().ReverseMap();
            CreateMap<ReplacementFilterDto, ReplacementFilter>().ReverseMap();
            CreateMap<ZConditionDto, ZCondition>().ReverseMap();
            CreateMap<GetFieldMapForEditDto, FieldMap>().ReverseMap();
            CreateMap<ContainmentSettingsDto, ContainmentSettings>().ReverseMap();
            CreateMap<ContainmentTargetDto, ContainmentTarget>().ReverseMap();
            CreateMap<StructureSettingsDto, StructureSettings>().ReverseMap();
            CreateMap<StructureTargetDto, StructureTarget>().ReverseMap();
            CreateMap<AssemblySettingsDto, AssemblySettings>().ReverseMap();
            CreateMap<AssemblyTargetDto, AssemblyTarget>().ReverseMap();
            CreateMap<DestinationDto, Destination>().ReverseMap();
            CreateMap<SourceDataDto, SourceData>().ReverseMap();
            CreateMap<TerminalSettingsDto, TerminalSettings>().ReverseMap();
            CreateMap<ZValueSettingsDto, ZValueSettings>().ReverseMap();
            CreateMap<CompletenessCriteriaDto, CompletenessCriteria>().ReverseMap();
            CreateMap<ProjectReportDto, ProjectReport>().ReverseMap();
            CreateMap<AtlProjectDetailsDto, ATLProject>().ReverseMap();

            CreateMap<GetConfigureThreeDForEditDto, MapRecord>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MapRecordId))
                .ReverseMap();

            CreateMap<GetConfigureTerminalForEditDto, MapRecord>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MapRecordId))
               .ReverseMap();

            CreateMap<GetContainmentSettingsForEditDto, MapRecord>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MapRecordId))
                .ReverseMap();

            CreateMap<GetStructureSettingsForEditDto, MapRecord>()
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MapRecordId))
             .ReverseMap();

            CreateMap<GetAssemblySettingsForEditDto, MapRecord>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MapRecordId))
           .ReverseMap();









        }
    }
}
