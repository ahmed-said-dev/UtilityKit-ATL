using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Domain.Exceptions.Broker
{
    public class ATLProjectNotFoundException : BusinessException
    {
        public ATLProjectNotFoundException() :
            base(
                3,
                "ATL Project not found.",
                "",
                HttpStatusCode.BadRequest)
        { }
    }
}
