using G2Kit.Components.Identity.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.Auditing

{
    public abstract class FullAuditedEntity<T> : BaseEntity<T>
    {
        public FullAuditedEntity()
        {
            CreationDate = DateTime.Now;
        }
        public virtual DateTime CreationDate { get; set; } 

        public virtual DateTime? ModifiedData { get; set; }

        public virtual Guid CreatorUserId { get; set; }

        [ForeignKey("CreatorUserId")]
        public virtual User CreatedBy { get; set; }

        public virtual Guid? LastModifiedUserId { get; set; }

        [ForeignKey("LastModifiedUserId")]
        public virtual User? LastModifiedBy { get; set; }

    }

}
