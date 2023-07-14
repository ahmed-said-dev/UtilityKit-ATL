using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;

namespace UtilityKit.Components.Atl.Application.Contracts.Data.Crt_MapRecord.Dtos
{
    public class CompletenessCriteriaDto
    {
        public ActionsEnum ActionName { get; set; }
        public int Value { get; set; }
        public string Comment { get; set; }
    }
}