using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace UtilityKit.Components.Atl.Domain.BusinessModel.Auditing
{
    public class BaseEntity<T> 
    {
        public T Id { get; set; }
    }
}
