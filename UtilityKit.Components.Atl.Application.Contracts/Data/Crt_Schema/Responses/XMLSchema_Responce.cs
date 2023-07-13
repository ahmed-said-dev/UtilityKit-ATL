using G2Kit.Core.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_XMLSchema.Responses
{
    public class XMLSchema_Responce : Schema, IResponseMapper<XMLSchema_Responce, Schema>
    {
        public XMLSchema_Responce MapToResponse(Schema domainObject)
        {
            var tables = new List<Table>();
            for (int i = 1; i <= 5; i++) //generate table list
            {
                var table = new Table();
                table.Name = "table" + i;
                for (int j = 1; j <= 4; j++)//generate feild list
                {
                    Field field = new Field();
                    field.Name = table.Name + ".field" + j;
                    field.Alias = table.Name + ".Alias" + j;
                    field.IsNullable = j % 2 == 0;
                    field.Length = j * 5;
                    field.Type = j % 2 == 0 ? "string" : "int";
                    table.Fields.Add(field);
                }

                tables.Add(table);
            }

            var featureClasses = new List<FeatureClass>();
            for (int i = 1; i <= 8; i++) //generate FeatureClass list
            {
                var featureClass = new FeatureClass();
                featureClass.Name = "featureClass" + i;
                featureClass.FeatureClassType = (FeatureClassTypeEnum)i;
                for (int j = 1; j <= 4; j++)//generate feild list
                {
                    Field field = new Field();
                    field.Name = featureClass.Name + ".field" + j;
                    field.Alias = featureClass.Name + ".Alias" + j;
                    field.IsNullable = j % 2 == 0;
                    field.Length = j * 5;
                    field.Type = j % 2 == 0 ? "string" : "int";
                    featureClass.Fields.Add(field);
                }

                featureClasses.Add(featureClass);
            }

            var schema = new Schema()
            {
                Name = "XML Schema MOC",
                DataSourceSchemaType = DataSourceSchemaTypeEnum.XMLSchema,
                FeatureClasses = featureClasses,
                Tables = tables
            };
            return new XMLSchema_Responce()
            {
                Name = schema.Name,
                DataSourceSchemaType = schema.DataSourceSchemaType,
                Tables = schema.Tables,
                FeatureClasses = schema.FeatureClasses
            };
        }
        public List<XMLSchema_Responce> MapToResponseList(List<Schema> domainObjectList)
        {
            throw new NotImplementedException();
        }
    }
}
