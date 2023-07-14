namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests
{
    public class CheckDataSourceUniquenessRequestDto
    {
        public Guid? atlProjectId { get; set; }
        public string Name { get; set; }
    }
}