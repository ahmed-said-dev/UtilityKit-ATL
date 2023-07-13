using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Application.Contracts.AuditingDto;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos
{
    public class DataSourceDto : IBaseDto<Guid>
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public SchemaDto DataSourceSchemaJson { get; set; }

        public int TablesCount { get; set; }

        public int FeatureClassesCount { get; set; }

        public Guid ATLProjectId { get; set; }

        public int DataSourceTypeId { get; set; }
    }
}
