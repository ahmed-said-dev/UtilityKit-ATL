using UtilityKit.Components.Atl.Application.Shared.Interfaces;

namespace UtilityKit.Components.Atl.Application.Shared.Models
{
    public class FileData<TClass> where TClass : HasRowNum
    {
        public FileData()
        {
            Data = new();
            BadFileDataInfo = new();
            MissingColumns = new();
        }
        public List<TClass> Data { get; set; }
        public List<BadFileDataInfo> BadFileDataInfo { get; set; }
        public List<string> MissingColumns { get; set; }
        public bool HasBadData => BadFileDataInfo.Any();
        public bool HasMissingColumns => MissingColumns.Any();
    }
}
