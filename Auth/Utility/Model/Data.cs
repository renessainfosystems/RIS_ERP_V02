using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Model
{
    public class Data
    {
        public int MenuId { get; set; }
        public int MenuParentId { get; set; }
        public string MenuName { get; set; }
        public Boolean IsActive { get; set; }
        public int SortingPriority { get; set; }
        public string MenuIconPath { get; set; }
        public string MenuRoutingPath { get; set; }
        public string CallingParameterValue { get; set; }
        public string CallingParameterType { get; set; }
        public int PermittedEvents { get; set; }
        public int TotalEvents { get; set; }

    }
    public class Dto
    {
        public Data data { get; set; }
        public IList<Dto> children { get; set; }
    }

    public class Root
    {
     
        public IList<Dto> data { get; set; }
    }
}
