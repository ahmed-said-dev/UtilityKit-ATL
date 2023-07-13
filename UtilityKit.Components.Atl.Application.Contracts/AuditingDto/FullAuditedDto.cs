using G2Kit.Components.Identity.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Application.Contracts.AuditingDto
{

    public abstract class FullAuditedDto
    {
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime? ModifiedData { get; set; }
        public virtual Guid CreatorUserId { get; set; }
        public virtual Guid? LastModifiedUserId { get; set; }
    }

}
