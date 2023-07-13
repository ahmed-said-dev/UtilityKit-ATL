using UtilityKit.Components.Atl.Application.Shared.Interfaces;
namespace UtilityKit.Components.Atl.Application.Shared.Models;
public class BadFileDataInfo : HasRowNum
{
    public int RowNum { get; set; }
    public string ColumnName { get; set; }
    public string Value { get; set; }
}