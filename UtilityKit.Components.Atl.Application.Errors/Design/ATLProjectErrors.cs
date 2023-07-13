using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UtilityKit.Components.Atl.Application.Errors.Design
{
    public class ATLProjectErrors
    {
        public const string EMPTY_ID = "Atl Project id is empty or not exist";
        public const string EMPTY_MODEL = "Atl Project model is empty or not exist";
        public const string EMPTY_NAME = "name is required";
        public const string NAME_LENGTH = "name should greater than 1 and less than 100 characters";
        public const string UNIQUE_NAME = "name should be unique";
        public const string DESCRIPTION_LENGTH = "Description should be less than 250 characters";

    }
}
