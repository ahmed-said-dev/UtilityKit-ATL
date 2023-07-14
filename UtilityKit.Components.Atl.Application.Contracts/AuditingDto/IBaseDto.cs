using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Application.Contracts.AuditingDto
{
    public interface IBaseDto<T> 
    {
        public T? Id { get; set; }
    }
}
