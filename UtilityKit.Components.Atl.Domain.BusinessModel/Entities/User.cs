using G2Kit.Components.Identity.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Domain.BusinessModel.Entities
{
    [Table("Users")]
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        #region --- Navigation Properties
        public List<ATLProject> ATLProjects { get; set; }
        #endregion
    }
}

