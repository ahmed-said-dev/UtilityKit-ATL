using ArcGIS.Core.Data;
using ArcGIS.Core.Hosting;

namespace UtilityKit.Components.Shared.GIS
{
    public class SchemaManager
    {
        public static Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Schema ConnectToSchema(string gDBPath= "D:\\QSIT\\ATL\\Final_Test.gdb\\Final_Test.gdb")
        {
            //Call Host.Initialize before constructing any objects from ArcGIS.Core
            Host.Initialize();

            Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Schema mappedSchema = new Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Schema();
            mappedSchema.FeatureClasses = new List<Atl.Domain.BusinessModel.MetaData.DataSourceSchema.FeatureClass>();
            mappedSchema.Tables = new List<Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Table>();
            mappedSchema.Name = "Mapped_Schema";
            mappedSchema.DataSourceSchemaType = Atl.Domain.SharedKernel.Enum.DataSourceSchemaTypeEnum.GeodatabaseFile;
            //string path = "C:\\Users\\abdelrahman.mohamed\\Documents\\ArcGIS\\Projects\\MyProject1\\Final_Test.gdb";
            FileGeodatabaseConnectionPath connectionPath = new FileGeodatabaseConnectionPath(new Uri(gDBPath));


            Geodatabase geodatabase = new Geodatabase(connectionPath);

            foreach (var featureClass in geodatabase.GetDefinitions<FeatureClassDefinition>())
            {
                Atl.Domain.BusinessModel.MetaData.DataSourceSchema.FeatureClass fc = new Atl.Domain.BusinessModel.MetaData.DataSourceSchema.FeatureClass();
                fc.Name = featureClass.GetName();
                fc.FeatureClassType = (Atl.Domain.SharedKernel.Enum.FeatureClassTypeEnum)featureClass.GetShapeType();
                foreach (var field in featureClass.GetFields())
                {
                    Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Field mappedField = new Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Field();
                    mappedField.Name = field.Name;
                    mappedField.Alias = field.AliasName;
                    mappedField.Length = field.Length;
                    mappedField.Type = field.FieldType.ToString();
                    mappedField.IsNullable = field.IsNullable;
                    fc.Fields.Add(mappedField);
                }

                mappedSchema.FeatureClasses.Add(fc);
            }

            foreach (var table in geodatabase.GetDefinitions<TableDefinition>())
            {
                Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Table mappedTable = new Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Table();
                mappedTable.Name = table.GetName();
                foreach (var field in table.GetFields())
                {
                    Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Field mappedField = new Atl.Domain.BusinessModel.MetaData.DataSourceSchema.Field();
                    mappedField.Name = field.Name;
                    mappedField.Alias = field.AliasName;
                    mappedField.Length = field.Length;
                    mappedField.Type = field.FieldType.ToString();
                    mappedField.IsNullable = field.IsNullable;

                    mappedTable.Fields.Add(mappedField);
                }

                mappedSchema.Tables.Add(mappedTable);
            }


            return mappedSchema;


        }
    }
}