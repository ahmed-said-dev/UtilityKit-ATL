namespace UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema
{
    public class Table
    {
        public string Name { get; set; }
        public List<Field>Fields { get; set; }
        public Table()
        {
            Fields = new List<Field>();
        }
    }
}