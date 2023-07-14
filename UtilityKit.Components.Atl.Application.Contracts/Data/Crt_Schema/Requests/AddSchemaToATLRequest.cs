using G2Kit.Core.Mapper;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.DTOs;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
public class AddSchemaToATLRequest
{
    public Guid ATLProjectId { get; set; }
    public SchemaDto? Schema { get; set; }
    public string FileUrl { get; set; }
}
