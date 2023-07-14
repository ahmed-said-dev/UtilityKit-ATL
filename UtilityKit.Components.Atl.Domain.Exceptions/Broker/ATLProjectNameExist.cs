using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Domain.Exceptions.Broker
{
    public class ATLProjectNameExist : BusinessException
    {
        public ATLProjectNameExist() :
            base(
                3,
                "ATL Project name  already Exist.",
                "",
                HttpStatusCode.BadRequest)
        { }
    }
}